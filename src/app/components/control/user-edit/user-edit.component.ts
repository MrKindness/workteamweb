import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/common/dialog/dialog.component';
import { User } from 'src/app/model/user/user';
import { UserEdit } from 'src/app/model/user/user-edit';
import { UserService } from 'src/app/services/user.service';
import { Constants } from 'src/app/utils/constants';

@Component({
    selector: 'user-edit-component',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
    userEdit: UserEdit = new UserEdit();
    errorMessage: string = '';
    showErrorMessage: boolean = false;
    passwordVisibility: boolean = false;
    newPasswordVisibility: boolean = false;
    disableSaveButton: boolean = false;

    @Input() user?: User = undefined;

    @Output() dataOnChange: EventEmitter<void> = new EventEmitter();

    constructor(private userService: UserService, private dialog: MatDialog) {}

    ngOnInit() {
        if (this.user) {
            this.userEdit.id = this.user.id;
            this.userEdit.username = this.user.username;
            this.userEdit.name = this.user.name;
            this.userEdit.email = this.user.email;
        }
    }

    handleClick() {
        this.disableSaveButton = true;
        if (
            !this.userEdit.username ||
            !this.userEdit.name ||
            !this.userEdit.email ||
            !this.userEdit.password
        ) {
            this.errorMessage =
                'The username, name, email and password fields are required!';
            this.showErrorMessage = true;
            this.disableSaveButton = false;
            return;
        }

        if (
            this.userEdit.username === this.user!.username &&
            this.userEdit.name === this.user!.name &&
            this.userEdit.email === this.user!.email &&
            !this.userEdit.newPassword
        ) {
            this.disableSaveButton = false;
            return;
        }

        this.userService.updateUserSelf(this.userEdit).subscribe((result) => {
            if (result.error) {
                this.errorMessage = result.response;
                this.showErrorMessage = true;
                this.disableSaveButton = false;
            } else {
                this.showErrorMessage = false;
                this.dialog.open(DialogComponent, {
                    data: {
                        title: Constants.successDialogTitle,
                        content: result.response,
                    },
                });
                this.dialog.afterAllClosed.subscribe(() => {
                    console.log('hello');
                    this.dataOnChange.emit();
                });
            }
        });
    }
}
