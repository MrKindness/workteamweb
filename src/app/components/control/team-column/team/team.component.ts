import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/common/dialog/dialog.component';
import { Team } from 'src/app/model/team';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'team-component',
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit {
    isEditing: boolean = false;
    newUserInputVisible: boolean = false;
    actualFieldsTeam!: Team;
    candidates: string[] = [];

    @Input() team: Team = new Team();
    @Input() isNewTeam: boolean = false;
    @Input() isAdmin: boolean = false;

    @Output() createTeamEvent: EventEmitter<TeamComponent> = new EventEmitter();
    @Output() updateTeamEvent: EventEmitter<TeamComponent> = new EventEmitter();
    @Output() deleteTeamEvent: EventEmitter<TeamComponent> = new EventEmitter();

    constructor(private userService: UserService, private dialog: MatDialog) {}

    ngOnInit(): void {
        this.actualFieldsTeam = Team.clone(this.team);

        if (this.isNewTeam) {
            this.isEditing = true;
        }
    }

    showNewUserInput() {
        if (this.newUserInputVisible) {
            this.newUserInputVisible = false;
        } else {
            this.updateCandidates();
            this.newUserInputVisible = true;
        }
    }

    addNewUser(username: string) {
        if (this.userService.getUserByUsername(username) != undefined) {
            this.actualFieldsTeam.users.push(username);
            this.newUserInputVisible = false;
        } else {
            this.dialog.open(DialogComponent, {
                data: 'Invalid username!',
            });
        }
    }

    deleteUser(username: string) {
        this.actualFieldsTeam.users = this.actualFieldsTeam.users.filter(
            (user) => user != username
        );
        this.updateCandidates();
    }

    saveTeam() {
        if (this.isNewTeam) this.createTeamEvent.emit(this);
        else this.updateTeamEvent.emit(this);
    }

    deleteTeam() {
        this.deleteTeamEvent.emit(this);
    }

    updateCandidates() {
        this.candidates = this.userService
            .getAllUsers()
            .filter(
                (user) => !this.actualFieldsTeam.users.includes(user.username)
            )
            .map((user) => user.username);
    }
}
