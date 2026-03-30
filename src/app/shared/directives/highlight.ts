import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  @Input('appHighlight') appHighlightColor: string = '#f0f0f0';

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.renderer.setStyle(this.elementRef.nativeElement, 'transform', 'scale(1.03)');
    this.renderer.setStyle(this.elementRef.nativeElement, 'box-shadow', '0 10px 25px rgba(0, 0, 0, 0.18)');
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', this.appHighlightColor);
    this.renderer.setStyle(this.elementRef.nativeElement, 'transition', 'all 0.3s ease');
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.renderer.setStyle(this.elementRef.nativeElement, 'transform', 'scale(1)');
    this.renderer.setStyle(this.elementRef.nativeElement, 'box-shadow', 'none');
    this.renderer.removeStyle(this.elementRef.nativeElement, 'background-color');
    this.renderer.setStyle(this.elementRef.nativeElement, 'transition', 'all 0.3s ease');
  }
}