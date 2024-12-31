import { Directive, ElementRef, Renderer2, OnInit, OnDestroy, inject } from '@angular/core';

@Directive({
  selector: '[appAppearOnScroll]',
  standalone: true
})
export class AppearOnScrollDirective implements OnInit, OnDestroy {
  private observer!: IntersectionObserver;
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnInit() {
    if (typeof window !== "undefined") {
      this.observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.renderer.addClass(this.el.nativeElement, 'in-view');
          }
        });
      }, { threshold: 0.1 });

      this.observer.observe(this.el.nativeElement);
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}