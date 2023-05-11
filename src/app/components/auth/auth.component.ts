import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Constants } from 'src/app/utils/constants';

@Component({
    selector: 'auth-component',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
    @Input() buttonMessage: string = 'Sign In';
    @Output() endEvent: EventEmitter<void> = new EventEmitter();
    username: string = '';
    password: string = '';
    passwordVisibility: boolean = false;
    showErrorMessage: boolean = false;
    disableButton: boolean = false;

    constructor(private router: Router, private authService: AuthService) {}

    handleClick(event: any) {
        this.disableButton = true;

        this.authService
            .authUser(this.username, this.password)
            .subscribe((result) => {
                if (result) {
                    this.router.navigateByUrl(Constants.controlPage);
                } else {
                    this.showErrorMessage = true;
                }
                this.disableButton = false;
            });
    }
}
