import { Directive, HostListener, Renderer2, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[app-event-blocker]'
})
export class EventBlockerDirective {
  // constructor(private renderer: Renderer2, private el: ElementRef) { }

  // ngOnInit() {
  //   this.renderer.listen(this.el.nativeElement, 'dragstart', (event) => {
  //     event.preventDefault();
  //   });
  //   this.renderer.listen(this.el.nativeElement, 'dragover', (event) => {
  //     event.preventDefault();
  //   });
  //   this.renderer.listen(this.el.nativeElement, 'drop', (event) => {
  //     event.preventDefault();
  //   });

  @HostListener('drop', ['$event'])
  @HostListener('dragover', ['$event'])
  public handleEvent(event: Event) {
    console.log(event);
    event.preventDefault();
    event.stopPropagation();
  }

}
