import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RouterService } from 'src/app/services/router.service';
import { UserService } from 'src/app/services/user.service';
import { Constants } from 'src/app/utils/constants';

@Component({
    selector: 'auth-component',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
    @Input() buttonMessage: string = 'Sign In';
    @Output() endEvent: EventEmitter<void> = new EventEmitter();

    passwordVisibility: boolean = false;
    showErrorMessage: boolean = false;
    disableButton: boolean = false;
    username: string = '';
    password: string = '';

    constructor(
        private routerService: RouterService,
        private authService: AuthService,
        private userService: UserService
    ) {}

    async handleClick() {
        this.disableButton = true;

        let authResult = await this.authService
            .authUser(this.username, this.password)
            .toPromise();

        if (authResult) {
            let userResult = await this.userService.getLoggedUser().toPromise();

            if (userResult.error) {
                this.showErrorMessage = true;
                this.disableButton = false;
            } else {
                this.routerService.navigateUrl(Constants.controlPage);
            }
        } else {
            this.showErrorMessage = true;
            this.disableButton = false;
        }
    }
}
