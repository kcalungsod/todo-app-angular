import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'button[appFilterPhase]'
})
export class FilterPhaseDirective {
  private defaultColor: string =  'green'
  @Input('appFilterPhase')
  selectedPhase!: string;

  @Input()
  phase!: string;

  @Input() 
  highlightColor!: string;

  @HostBinding('class.selected')
  get selected(): boolean {
    return this.selectedPhase === this.phase;
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightColor || this.defaultColor || 'red');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  constructor(private el: ElementRef) { }

  private highlight(color?: string | null) {
    this.el.nativeElement.style.backgroundColor = color;
  }

}
