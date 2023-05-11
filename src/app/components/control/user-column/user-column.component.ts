import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { UserComponent } from './user/user.component';
import { DialogComponent } from 'src/app/common/dialog/dialog.component';

@Component({
    selector: 'user-column-component',
    templateUrl: './user-column.component.html',
    styleUrls: ['./user-column.component.scss'],
})
export class UserColumnComponent {
    @Input() entities!: User[];
    @Input() isAdmin!: boolean;
    @Output() dataOnChange: EventEmitter<void> = new EventEmitter();
    showNewUser: boolean = false;

    constructor(private userService: UserService, private dialog: MatDialog) {}

    createUser(invoker: UserComponent) {
        if (
            this.userService.getUserByUsername(
                invoker.actualFieldsUser.username
            )
        ) {
            this.dialog.open(DialogComponent, {
                data: 'Username you have entered is already used!',
            });
        } else {
            this.userService.saveUser(invoker.actualFieldsUser, '1111');
            this.showNewUser = false;
            this.dataOnChange.emit();
        }
    }

    updateUser(invoker: UserComponent) {
        if (
            invoker.user.username != invoker.actualFieldsUser.username &&
            this.userService.getUserByUsername(
                invoker.actualFieldsUser.username
            )
        ) {
            this.dialog.open(DialogComponent, {
                data: 'Username you have entered is already used!',
            });
        } else {
            this.userService.updateUser(
                invoker.user.username,
                invoker.actualFieldsUser
            );
            this.dataOnChange.emit();
            invoker.isEditing = false;
        }
    }

    deleteUser(invoker: UserComponent) {
        if (invoker.isNewUser) {
            this.showNewUser = false;
        } else {
            this.userService.deleteUser(invoker.user.username);
            this.dataOnChange.emit();
        }
    }
}
