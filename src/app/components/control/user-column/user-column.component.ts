import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { UserComponent } from './user/user.component';
import { DialogComponent } from 'src/app/common/dialog/dialog.component';
import { Constants } from 'src/app/utils/constants';

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
        invoker.disableSaveButton = true;
        if (
            invoker.actualFieldsUser.username &&
            invoker.actualFieldsUser.name &&
            invoker.actualFieldsUser.email
        ) {
            this.userService
                .createUser(invoker.actualFieldsUser)
                .subscribe((result) => {
                    if (result.error) {
                        this.dialog.open(DialogComponent, {
                            data: {
                                title: Constants.errorDialogTitle,
                                content: result.response,
                            },
                        });
                        invoker.disableSaveButton = false;
                    } else {
                        this.dataOnChange.emit();
                        this.dialog.open(DialogComponent, {
                            data: {
                                title: Constants.successDialogTitle,
                                content: result.response,
                            },
                        });
                    }
                });
        } else {
            this.dialog.open(DialogComponent, {
                data: {
                    title: Constants.errorDialogTitle,
                    content:
                        'The username, name and email fields are required!',
                },
            });
            invoker.disableSaveButton = false;
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
                data: {
                    title: Constants.errorDialogTitle,
                    content: 'Username you have entered is already used!',
                },
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
        invoker.disableDeleteButton = true;
        if (invoker.isNewUser) {
            this.showNewUser = false;
            invoker.disableDeleteButton = false;
            return;
        }
        this.userService
            .deleteUser(invoker.user.username)
            .subscribe((result) => {
                if (result.error) {
                    this.dialog.open(DialogComponent, {
                        data: {
                            title: Constants.errorDialogTitle,
                            content: result.response,
                        },
                    });
                    invoker.disableDeleteButton = false;
                } else {
                    this.dataOnChange.emit();
                    this.dialog.open(DialogComponent, {
                        data: {
                            title: Constants.successDialogTitle,
                            content: result.response,
                        },
                    });
                }
            });
    }
}
