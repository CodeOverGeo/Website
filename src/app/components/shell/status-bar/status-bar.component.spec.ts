import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';

import { ShellUiService } from '../../../services/shell-ui.service';
import { StatusBarComponent } from './status-bar.component';

describe('StatusBarComponent', () => {
  let fixture: ComponentFixture<StatusBarComponent>;
  let shellUi: ShellUiService;

  function cmdHint(): HTMLElement | null {
    return fixture.nativeElement.querySelector('.cmd-hint');
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StatusBarComponent],
      providers: [provideRouter([])],
    });

    fixture = TestBed.createComponent(StatusBarComponent);
    // The bar hides itself on the boot route, which is where the test router starts.
    fixture.componentInstance.currentRoute.set('/dashboard');
    fixture.detectChanges();

    shellUi = TestBed.inject(ShellUiService);
  });

  it('renders the ⌘K affordance as a button, so it is reachable by keyboard', () => {
    const hint = cmdHint();

    expect(hint).not.toBeNull();
    expect(hint!.tagName).toBe('BUTTON');
    expect(hint!.getAttribute('type')).toBe('button');
    expect(hint!.tabIndex).toBe(0);
  });

  it('opens the command palette when activated', () => {
    expect(shellUi.isCommandPaletteOpen()).toBe(false);

    cmdHint()!.click();

    expect(shellUi.isCommandPaletteOpen()).toBe(true);
  });
});
