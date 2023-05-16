import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/common/dialog/dialog.component';
import { Team } from 'src/app/model/team';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';
import { Constants } from 'src/app/utils/constants';

@Component({
    selector: 'team-component',
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit {
    isEditing: boolean = false;
    newUserInputVisible: boolean = false;
    disableSaveButton: boolean = false;
    disableDeleteButton: boolean = false;
    disableEditButton: boolean = false;
    actualFieldsTeam!: Team;
    candidates: string[] = [];

    @Input() team: Team = new Team();
    @Input() isNewTeam: boolean = false;
    @Input() isAdmin: boolean = false;

    @Output() createTeamEvent: EventEmitter<TeamComponent> = new EventEmitter();
    @Output() updateTeamEvent: EventEmitter<TeamComponent> = new EventEmitter();
    @Output() deleteTeamEvent: EventEmitter<TeamComponent> = new EventEmitter();

    constructor(private dialog: MatDialog, private teamService: TeamService) {}

    ngOnInit(): void {
        this.actualFieldsTeam = Team.clone(this.team);

        if (this.isNewTeam) {
            this.isEditing = true;
            this.disableSaveButton = true;

            this.teamService.getUserCandidates('').subscribe((result) => {
                if (result.error) {
                    this.dialog.open(DialogComponent, {
                        data: {
                            title: Constants.errorDialogTitle,
                            content: result.response,
                        },
                    });
                    this.disableSaveButton = false;
                } else {
                    this.candidates = result.response;
                    this.disableSaveButton = false;
                }
            });
        }
    }

    saveTeam() {
        if (this.isNewTeam) this.createTeamEvent.emit(this);
        else this.updateTeamEvent.emit(this);
    }

    deleteTeam() {
        this.deleteTeamEvent.emit(this);
    }

    enterEditingMode() {
        this.disableEditButton = true;
        this.teamService.getUserCandidates(this.team.id).subscribe((result) => {
            console.log(result);
            if (result.error) {
                this.dialog.open(DialogComponent, {
                    data: {
                        title: Constants.errorDialogTitle,
                        content: result.response,
                    },
                });
                this.disableEditButton = false;
            } else {
                this.candidates = result.response;
                this.isEditing = true;
                this.disableEditButton = false;
            }
        });
    }

    showNewUserInput() {
        if (this.newUserInputVisible) {
            this.newUserInputVisible = false;
        } else {
            this.newUserInputVisible = true;
        }
    }

    addNewUser(username: string) {
        if (this.candidates.indexOf(username) != -1) {
            this.actualFieldsTeam.users.push(username);
            this.candidates = this.candidates.filter(
                (user) => user != username
            );
            this.newUserInputVisible = false;
        } else {
            this.dialog.open(DialogComponent, {
                data: {
                    title: Constants.errorDialogTitle,
                    content: 'Username invalid!',
                },
            });
        }
    }

    deleteUser(username: string) {
        this.actualFieldsTeam.users = this.actualFieldsTeam.users.filter(
            (user) => user != username
        );
        this.candidates.push(username);
    }
}
