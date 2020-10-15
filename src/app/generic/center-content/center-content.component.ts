import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-center-content',
    templateUrl: './center-content.component.html',
    styleUrls: ['./center-content.component.scss'],
})
export class CenterContentComponent implements OnInit {
    @Input()
    failed: boolean;

    constructor() {}

    ngOnInit(): void {}
}
