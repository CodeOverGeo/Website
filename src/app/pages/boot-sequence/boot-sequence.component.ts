import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { concatMap, delay, from, interval, of, Subscription, take } from 'rxjs';
import { PortfolioDataService } from '../../services/portfolio-data.service';
import { TerminalLine } from '../../models/portfolio.models';

@Component({
  selector: 'app-boot-sequence',
  standalone: true,
  imports: [],
  templateUrl: './boot-sequence.component.html',
  styleUrl: './boot-sequence.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown)': 'onDocumentKeydown($event)'
  }
})
export class BootSequenceComponent {
  private readonly router = inject(Router);
  private readonly dataService = inject(PortfolioDataService);

  readonly typedCommand = signal('');
  readonly lines = signal<TerminalLine[]>([]);
  readonly showCursor = signal(true);

  private keyBuffer = '';
  private started = false;
  private runningTests = false;
  private sequenceSubscription?: Subscription;

  constructor() {
    this.startBoot(false);
  }

  onDocumentKeydown(event: KeyboardEvent): void {
    if (event.key.length === 1) {
      this.keyBuffer = `${this.keyBuffer}${event.key.toLowerCase()}`.slice(-20);
    }

    if (!this.runningTests && this.keyBuffer.includes('dotnet test')) {
      this.runningTests = true;
      this.lines.set([]);
      this.typedCommand.set('dotnet test');
      this.runTestSimulation();
    }
  }

  private startBoot(fromTest: boolean): void {
    if (this.started && !fromTest) {
      return;
    }
    this.started = true;

    const command = 'dotnet run';
    this.typedCommand.set('');
    interval(70)
      .pipe(take(command.length))
      .subscribe((index) => this.typedCommand.set(command.slice(0, index + 1)));

    this.dataService.getTerminalSequence().subscribe((sequence) => {
      this.sequenceSubscription?.unsubscribe();
      this.sequenceSubscription = from(sequence)
        .pipe(concatMap((line, index) => of(line).pipe(delay(240 + index * 140))))
        .subscribe((line) => {
          this.lines.update((existing) => [...existing, line]);
          if (line.type === 'exec') {
            setTimeout(() => this.router.navigate(['/dashboard']), 500);
          }
        });
    });
  }

  private runTestSimulation(): void {
    const testLines: TerminalLine[] = [
      { prefix: '[exec]', text: 'Running tests...', type: 'exec' },
      { prefix: '[pass]', text: '✓ skills.verified (3ms)', type: 'pass' },
      { prefix: '[pass]', text: '✓ experience.loaded (1ms)', type: 'pass' },
      { prefix: '[pass]', text: '✓ projects.rendered (2ms)', type: 'pass' },
      { prefix: '[ok]', text: '3 passed, 0 failed', type: 'ok' }
    ];

    this.sequenceSubscription?.unsubscribe();
    this.sequenceSubscription = from(testLines)
      .pipe(concatMap((line, index) => of(line).pipe(delay(180 + index * 110))))
      .subscribe((line) => {
        this.lines.update((existing) => [...existing, line]);
      });

    setTimeout(() => {
      this.lines.set([]);
      this.startBoot(true);
      this.runningTests = false;
    }, 1900);
  }
}
