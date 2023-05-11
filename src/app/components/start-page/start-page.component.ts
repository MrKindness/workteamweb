import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/app/utils/constants';

@Component({
    selector: 'start-page-component',
    templateUrl: './start-page.component.html',
    styleUrls: ['./start-page.component.scss'],
})
export class StartPageComponent {
    constructor(private router: Router) {}

    handleClick() {
        this.router.navigateByUrl(Constants.controlPage);
    }
}
