import { Directive, ViewContainerRef, TemplateRef, Input } from '@angular/core';

@Directive({
  selector: '[appHideMovie]'
})
export class HideMovieDirective {

  @Input('appHideMovie')
  set status(value: boolean | undefined) {
    this.showOrHideTemplate(value);
  }

  constructor(
    protected viewContainer: ViewContainerRef,
    protected templateRef: TemplateRef<any>
  ) { }

  showOrHideTemplate(hide: boolean | undefined): void {
    if (this.viewContainer) {
      this.viewContainer.clear();
      if (!hide) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    }
  }

}
