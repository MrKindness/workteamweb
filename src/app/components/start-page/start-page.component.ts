import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RouterService } from 'src/app/services/router.service';
import { UserService } from 'src/app/services/user.service';
import { Constants } from 'src/app/utils/constants';

@Component({
    selector: 'start-page-component',
    templateUrl: './start-page.component.html',
    styleUrls: ['./start-page.component.scss'],
})
export class StartPageComponent {
    disableButton: boolean = false;

    constructor(
        private routerService: RouterService,
        private userSerice: UserService,
        private authService: AuthService
    ) {}

    handleClick() {
        this.disableButton = true;

        this.userSerice.getLoggedUser().subscribe((result) => {
            if (result.error) {
                this.authService.logoutUser();
            } else {
                this.routerService.navigateUrl(Constants.controlPage);
            }
            this.disableButton = false;
        });
    }
}
