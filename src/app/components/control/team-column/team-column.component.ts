import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Team } from 'src/app/model/team';
import { TeamService } from 'src/app/services/team.service';
import { TeamComponent } from './team/team.component';
import { DialogComponent } from 'src/app/common/dialog/dialog.component';
import { Constants } from 'src/app/utils/constants';

@Component({
    selector: 'team-column-component',
    templateUrl: './team-column.component.html',
    styleUrls: ['./team-column.component.scss'],
})
export class TeamColumnComponent {
    showNewTeam: boolean = false;

    @Input() entities!: Team[];
    @Input() isAdmin!: boolean;

    @Output() dataOnChange: EventEmitter<void> = new EventEmitter();

    constructor(private teamService: TeamService, private dialog: MatDialog) {}

    createTeam(invoker: TeamComponent) {
        invoker.disableSaveButton = true;
        if (!invoker.actualFieldsTeam.name) {
            this.dialog.open(DialogComponent, {
                data: {
                    title: Constants.errorDialogTitle,
                    content: Constants.teamFieldsError,
                },
            });
            invoker.disableSaveButton = false;
            return;
        }

        this.teamService
            .createTeam(invoker.actualFieldsTeam)
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
                    this.showNewTeam = false;
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

    updateTeam(invoker: TeamComponent) {
        invoker.disableSaveButton = true;

        if (!invoker.actualFieldsTeam.name) {
            this.dialog.open(DialogComponent, {
                data: {
                    title: Constants.errorDialogTitle,
                    content: Constants.teamFieldsError,
                },
            });
            invoker.disableSaveButton = false;
            return;
        }

        if (
            invoker.actualFieldsTeam.name == invoker.team.name &&
            Team.teamsHaveSameUsers(
                invoker.actualFieldsTeam.users,
                invoker.team.users
            )
        ) {
            invoker.isEditing = false;
            invoker.disableSaveButton = false;
            return;
        }

        this.teamService
            .updateTeam(invoker.actualFieldsTeam)
            .subscribe((result) => {
                if (result.error) {
                    console.log(result);
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

    deleteTeam(invoker: TeamComponent) {
        invoker.disableDeleteButton = true;

        if (invoker.isNewTeam) {
            this.showNewTeam = false;
            invoker.disableDeleteButton = false;
            return;
        }

        this.teamService.deleteTeam(invoker.team.id).subscribe((result) => {
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
