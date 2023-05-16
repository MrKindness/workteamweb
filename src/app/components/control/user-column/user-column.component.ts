import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/model/user/user';
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
    showNewUser: boolean = false;

    @Input() entities!: User[];
    @Input() isAdmin!: boolean;

    @Output() dataOnChange: EventEmitter<void> = new EventEmitter();

    constructor(private userService: UserService, private dialog: MatDialog) {}

    createUser(invoker: UserComponent) {
        invoker.disableSaveButton = true;

        if (
            !invoker.actualFieldsUser.username ||
            !invoker.actualFieldsUser.name ||
            !invoker.actualFieldsUser.email
        ) {
            this.dialog.open(DialogComponent, {
                data: {
                    title: Constants.errorDialogTitle,
                    content: Constants.userFieldsError,
                },
            });
            invoker.disableSaveButton = false;
            return;
        }

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
                    this.showNewUser = false;
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

    updateUser(invoker: UserComponent) {
        invoker.disableSaveButton = true;

        if (
            !invoker.actualFieldsUser.username ||
            !invoker.actualFieldsUser.name ||
            !invoker.actualFieldsUser.email
        ) {
            this.dialog.open(DialogComponent, {
                data: {
                    title: Constants.errorDialogTitle,
                    content: Constants.userFieldsError,
                },
            });
            invoker.disableSaveButton = false;
            return;
        }

        if (
            invoker.actualFieldsUser.username == invoker.user.username &&
            invoker.actualFieldsUser.name == invoker.user.name &&
            invoker.actualFieldsUser.email == invoker.user.email &&
            invoker.actualFieldsUser.role == invoker.user.role
        ) {
            invoker.isEditing = false;
            invoker.disableSaveButton = false;
            return;
        }

        this.userService
            .updateUser(invoker.actualFieldsUser)
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
