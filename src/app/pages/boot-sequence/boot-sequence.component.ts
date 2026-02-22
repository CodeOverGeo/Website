import { ChangeDetectionStrategy, Component, inject, OnDestroy, signal } from '@angular/core';
import { Router } from '@angular/router';
import { concatMap, delay, from, interval, of, Subscription, take } from 'rxjs';
import { PortfolioDataService } from '../../services/portfolio-data.service';
import { TerminalLine } from '../../models/portfolio.models';

type Phase = 'typing-init' | 'waiting' | 'correcting' | 'booting' | 'testing';

const VALID_COMMANDS = ['dotnet run', 'dotnet test'] as const;
const MAX_LEN = 12;
const CHAR_DELAY_MS = 80;
const CORRECT_CHAR_MS = 65;
const BOOT_LINE_BASE_MS = 500;
const BOOT_LINE_STEP_MS = 280;

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
export class BootSequenceComponent implements OnDestroy {
  private readonly router = inject(Router);
  private readonly dataService = inject(PortfolioDataService);

  readonly typedCommand = signal('');
  readonly lines = signal<TerminalLine[]>([]);
  readonly showCursor = signal(true);
  /** True only while waiting for the user to press Enter. */
  readonly awaitingInput = signal(false);

  private phase: Phase = 'typing-init';
  private sequenceSubscription?: Subscription;
  private correctionTimers: ReturnType<typeof setTimeout>[] = [];

  constructor() {
    this.playInitialTyping();
  }

  ngOnDestroy(): void {
    this.sequenceSubscription?.unsubscribe();
    this.clearCorrectionTimers();
  }

  onDocumentKeydown(event: KeyboardEvent): void {
    if (this.phase !== 'waiting') return;

    if (event.key === 'Enter') {
      const cmd = this.typedCommand();
      if (cmd === 'dotnet run') {
        this.startBoot();
      } else if (cmd === 'dotnet test') {
        this.startTestSimulation();
      } else {
        this.correctAndBoot();
      }
      return;
    }

    if (event.key === 'Backspace') {
      event.preventDefault();
      this.typedCommand.update(c => c.slice(0, -1));
      return;
    }

    if (event.key.length !== 1) return;

    const next = this.typedCommand() + event.key;
    if (next.length > MAX_LEN) return;

    this.typedCommand.set(next);

    // If no longer a prefix of any valid command, immediately correct
    const stillValid = VALID_COMMANDS.some(cmd => cmd.startsWith(next));
    if (!stillValid) {
      this.correctAndBoot();
    }
  }

  // ─── Private ────────────────────────────────────────────────────────────────

  private playInitialTyping(): void {
    const command = 'dotnet run';
    this.typedCommand.set('');
    interval(CHAR_DELAY_MS)
      .pipe(take(command.length))
      .subscribe({
        next: (i) => this.typedCommand.set(command.slice(0, i + 1)),
        complete: () => {
          this.phase = 'waiting';
          this.awaitingInput.set(true);
        }
      });
  }

  private correctAndBoot(): void {
    this.phase = 'correcting';
    this.awaitingInput.set(false);
    this.clearCorrectionTimers();

    const current = this.typedCommand();
    const target = 'dotnet run';
    const steps: Array<() => void> = [];

    // Backspace all current chars
    for (let i = current.length; i > 0; i--) {
      const len = i - 1;
      steps.push(() => this.typedCommand.set(current.slice(0, len)));
    }

    // Retype target
    for (let i = 1; i <= target.length; i++) {
      const slice = target.slice(0, i);
      steps.push(() => this.typedCommand.set(slice));
    }

    steps.forEach((fn, i) => {
      const t = setTimeout(fn, i * CORRECT_CHAR_MS);
      this.correctionTimers.push(t);
    });

    // Small pause after last char, then boot
    const bootAt = steps.length * CORRECT_CHAR_MS + 400;
    const bootTimer = setTimeout(() => this.startBoot(), bootAt);
    this.correctionTimers.push(bootTimer);
  }

  private startBoot(): void {
    this.phase = 'booting';
    this.awaitingInput.set(false);
    this.showCursor.set(false);
    this.lines.set([]);

    this.dataService.getTerminalSequence().subscribe((sequence) => {
      this.sequenceSubscription?.unsubscribe();
      this.sequenceSubscription = from(sequence)
        .pipe(concatMap((line, index) => of(line).pipe(delay(BOOT_LINE_BASE_MS + index * BOOT_LINE_STEP_MS))))
        .subscribe((line) => {
          this.lines.update((existing) => [...existing, line]);
          if (line.type === 'exec') {
            setTimeout(() => this.router.navigate(['/dashboard']), 800);
          }
        });
    });
  }

  private startTestSimulation(): void {
    this.phase = 'testing';
    this.awaitingInput.set(false);
    this.showCursor.set(false);
    this.lines.set([]);

    const testLines: TerminalLine[] = [
      { prefix: '[exec]', text: 'Running tests...', type: 'exec' },
      { prefix: '[pass]', text: '✓ skills.verified (3ms)', type: 'pass' },
      { prefix: '[pass]', text: '✓ experience.loaded (1ms)', type: 'pass' },
      { prefix: '[pass]', text: '✓ projects.rendered (2ms)', type: 'pass' },
      { prefix: '[ok]', text: '3 passed, 0 failed', type: 'ok' }
    ];

    this.sequenceSubscription?.unsubscribe();
    this.sequenceSubscription = from(testLines)
      .pipe(concatMap((line, index) => of(line).pipe(delay(BOOT_LINE_BASE_MS + index * BOOT_LINE_STEP_MS))))
      .subscribe({
        next: (line) => this.lines.update((existing) => [...existing, line]),
        complete: () => {
          setTimeout(() => {
            this.lines.set([]);
            this.showCursor.set(true);
            this.typedCommand.set('dotnet run');
            this.startBoot();
          }, 1000);
        }
      });
  }

  private clearCorrectionTimers(): void {
    this.correctionTimers.forEach(clearTimeout);
    this.correctionTimers = [];
  }
}
