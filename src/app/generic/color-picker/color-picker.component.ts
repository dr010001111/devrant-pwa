import { Component, OnInit, ChangeDetectionStrategy, ElementRef, ViewEncapsulation, OnDestroy } from '@angular/core';
import Pickr from '@simonwep/pickr';
import { ConfigService } from '@services/config.service';
import { applyThemeFromHex } from '@utils/color-utils';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ColorPickerComponent implements OnInit, OnDestroy {
  pickr: Pickr;
  currentHex: string;

  constructor(private ref: ElementRef, private config: ConfigService) { }

  ngOnDestroy(): void {
    this.config.scheme = this.currentHex;
  }

  ngOnInit(): void {
    const div = document.createElement('div');
    this.ref.nativeElement.append(div);

    const _default = this.config.scheme.startsWith('#') ? this.config.scheme : '';

    this.pickr = Pickr.create({
      el: div,
      container: this.ref.nativeElement,
      useAsButton: true,

      default: _default,
      theme: 'nano', // or 'monolith', or 'nano'

      swatches: [
        '#a973a2',
        '#7bc8a4',
        '#f99a66',
        '#2a8b9d',
        '#d55161',
        '#6bc9cd',
        '#e6c653',
        '#54556e',
      ],
      showAlways: true,
      inline: true,

      components: {
        preview: true,
        hue: true,
      }
    });

    this.pickr.on('change', (newColor) => {
      const hex = newColor.toHEXA().toString();
      this.currentHex = hex;
      applyThemeFromHex(hex);
    })
  }

}
