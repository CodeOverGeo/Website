import { Directive, ElementRef, inject, input, OnDestroy, OnInit, output } from '@angular/core';

@Directive({
  selector: '[appVisibility]',
  standalone: true
})
export class VisibilityDirective implements OnInit, OnDestroy {
  readonly threshold = input(0.1);
  readonly appeared = output<void>();

  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;

  ngOnInit(): void {
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
