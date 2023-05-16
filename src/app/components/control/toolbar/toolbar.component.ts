import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/model/user/user';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
    selector: 'toolbar-component',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
    @Input() user?: User;
    @Input() message: string = 'Settings';

    @Output() editUserEvent: EventEmitter<void> = new EventEmitter();

    constructor(private authService: AuthService) {}

    logoutUser() {
        this.authService.logoutUser();
    }

    editAccount() {
        this.editUserEvent.emit();
    }
}
