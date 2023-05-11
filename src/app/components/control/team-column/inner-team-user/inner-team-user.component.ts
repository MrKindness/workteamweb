import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'inner-team-user-component',
    templateUrl: './inner-team-user.component.html',
    styleUrls: ['./inner-team-user.component.scss'],
})
export class InnerTeamUserComponent {
    @Input() username!: string;
    @Input() isAdmin: boolean = false;
    @Input() isEditing: boolean = false;
    @Output() deleteUserEvent: EventEmitter<string> = new EventEmitter();
}
