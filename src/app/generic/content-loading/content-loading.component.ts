import { Component, OnInit, ChangeDetectionStrategy, Input, ElementRef } from '@angular/core';
import { textChangeRangeIsUnchanged } from 'typescript';

@Component({
  selector: 'app-content-loading',
  templateUrl: './content-loading.component.html',
  styleUrls: ['./content-loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentLoadingComponent implements OnInit {

  @Input()
  animate: true;

  @Input()
  set loading(loading) {
    (this.elRef.nativeElement as HTMLElement).classList.toggle('loaded', !loading)
  }

  constructor(private elRef: ElementRef) { }

  ngOnInit(): void {
  }

}
