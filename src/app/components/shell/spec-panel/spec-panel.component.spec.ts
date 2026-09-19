import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { ShellUiService } from '../../../services/shell-ui.service';
import { SpecPanelComponent } from './spec-panel.component';

describe('SpecPanelComponent', () => {
  let fixture: ComponentFixture<SpecPanelComponent>;
  let shellUi: ShellUiService;
  let trigger: HTMLButtonElement;

  function settle(): void {
    TestBed.tick();
  }

  function closeButton(): HTMLButtonElement | null {
    return fixture.nativeElement.querySelector('.close-btn');
  }

  function pressEscape(): void {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    settle();
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SpecPanelComponent],
      providers: [provideRouter([])],
    });

    fixture = TestBed.createComponent(SpecPanelComponent);
    shellUi = TestBed.inject(ShellUiService);
    settle();

    // Stands in for whatever opened the panel — the palette, or the status bar.
    trigger = document.createElement('button');
    document.body.appendChild(trigger);
    trigger.focus();
  });

  afterEach(() => {
    trigger.remove();
  });

  it('moves focus into the panel when it opens', () => {
    shellUi.openSpecPanel();
    settle();

    expect(closeButton()).not.toBeNull();
    expect(document.activeElement).toBe(closeButton());
  });

  it('closes on Escape', () => {
    shellUi.openSpecPanel();
    settle();

    pressEscape();

    expect(shellUi.isSpecPanelOpen()).toBe(false);
    expect(closeButton()).toBeNull();
  });

  it('restores focus to whatever opened it', () => {
    shellUi.openSpecPanel();
    settle();
    expect(document.activeElement).not.toBe(trigger);

    pressEscape();

    expect(document.activeElement).toBe(trigger);
  });

  it('ignores Escape when it is already closed', () => {
    pressEscape();

    expect(shellUi.isSpecPanelOpen()).toBe(false);
    expect(document.activeElement).toBe(trigger);
  });
});
