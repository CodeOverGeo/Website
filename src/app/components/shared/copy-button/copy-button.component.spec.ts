import { ComponentFixture, TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { CopyButtonComponent } from './copy-button.component';

describe('CopyButtonComponent', () => {
  let fixture: ComponentFixture<CopyButtonComponent>;
  let el: HTMLElement;
  const writeText = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
    TestBed.configureTestingModule({ imports: [CopyButtonComponent] });
    fixture = TestBed.createComponent(CopyButtonComponent);
    fixture.componentRef.setInput('text', 'Para one.\n\nPara two.');
    fixture.componentRef.setInput('label', 'Copy short bio');
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  afterEach(() => {
    vi.useRealTimers();
    writeText.mockReset();
  });

  const status = () => el.querySelector('[role="status"]')!;
  const click = async () => {
    el.querySelector('button')!.click();
    await vi.waitFor(() => expect(writeText).toHaveBeenCalled());
    await Promise.resolve();
    fixture.detectChanges();
  };

  it('points the button at its status region', () => {
    expect(el.querySelector('button')!.getAttribute('aria-describedby')).toBe(status().id);
    expect(status().textContent).toBe('');
  });

  it('copies the exact text and announces success with an icon swap, then resets', async () => {
    writeText.mockResolvedValue(undefined);
    await click();
    expect(writeText).toHaveBeenCalledWith('Para one.\n\nPara two.');
    expect(status().textContent).toBe('Copied to clipboard');
    expect(el.querySelector('.copy-icon')!.textContent).toBe('✓');

    vi.advanceTimersByTime(3000);
    fixture.detectChanges();
    expect(status().textContent).toBe('');
    expect(el.querySelector('.copy-icon')!.textContent).toBe('⧉');
  });

  it('tells the user to copy by hand when the clipboard refuses', async () => {
    writeText.mockRejectedValue(new Error('denied'));
    await click();
    expect(status().textContent).toContain("Couldn't copy");
    expect(el.querySelector('.copy-icon')!.textContent).toBe('⧉');
  });
});
