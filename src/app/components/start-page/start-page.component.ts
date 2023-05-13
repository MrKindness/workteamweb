import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterService } from 'src/app/services/router.service';
import { Constants } from 'src/app/utils/constants';

@Component({
    selector: 'start-page-component',
    templateUrl: './start-page.component.html',
    styleUrls: ['./start-page.component.scss'],
})
export class StartPageComponent {
    constructor(private routerService: RouterService) {}

    handleClick() {
        this.routerService.navigateUrl(Constants.controlPage);
    }
}
