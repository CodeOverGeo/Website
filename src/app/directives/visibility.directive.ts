import { Directive, ElementRef, inject, input, OnDestroy, OnInit, output, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appVisibility]',
  standalone: true
})
export class VisibilityDirective implements OnInit, OnDestroy {
  readonly threshold = input(0.1);
  readonly appeared = output<void>();

  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    if (!this.isBrowser) {
      // No IntersectionObserver while prerendering: mark the element visible so the
      // static HTML is readable without JS.
      this.elementRef.nativeElement.classList.add('visible');
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.elementRef.nativeElement.classList.add('visible');
            this.appeared.emit();
            this.observer?.unobserve(this.elementRef.nativeElement);
          }
        }
      },
      { threshold: this.threshold() }
    );

    this.observer.observe(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
