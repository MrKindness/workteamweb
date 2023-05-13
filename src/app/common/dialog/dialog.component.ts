import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'dialog-component',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
    content!: string;
    title!: string;

    constructor(
        @Inject(MAT_DIALOG_DATA) data: { content: string; title: string }
    ) {
        this.content = data.content;
        this.title = data.title;
    }
}
