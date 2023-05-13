import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RouterService } from 'src/app/services/router.service';
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
        private authService: AuthService
    ) {}

    handleClick() {
        this.disableButton = true;

        this.authService
            .authUser(this.username, this.password)
            .subscribe((result) => {
                if (result) {
                    this.routerService.navigateUrl(Constants.controlPage);
                } else {
                    this.showErrorMessage = true;
                }
                this.disableButton = false;
            });
    }
}
