import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/model/user';

@Component({
    selector: 'user-component',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
    isEditing: boolean = false;
    actualFieldsUser!: User;

    @Input() user: User = new User();
    @Input() isNewUser: boolean = false;
    @Input() isAdmin: boolean = false;

    @Output() createUserEvent: EventEmitter<UserComponent> = new EventEmitter();
    @Output() updateUserEvent: EventEmitter<UserComponent> = new EventEmitter();
    @Output() deleteUserEvent: EventEmitter<UserComponent> = new EventEmitter();

    ngOnInit(): void {
        this.actualFieldsUser = User.clone(this.user);

        if (this.isNewUser) {
            this.isEditing = true;
        }
    }

    saveUser() {
        if (this.isNewUser) this.createUserEvent.emit(this);
        else this.updateUserEvent.emit(this);
    }

    deleteUser() {
        this.deleteUserEvent.emit(this);
    }
}
