import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Team } from 'src/app/model/team';
import { TeamService } from 'src/app/services/team.service';
import { TeamComponent } from './team/team.component';
import { DialogComponent } from 'src/app/common/dialog/dialog.component';

@Component({
    selector: 'team-column-component',
    templateUrl: './team-column.component.html',
    styleUrls: ['./team-column.component.scss'],
})
export class TeamColumnComponent {
    @Input() entities!: Team[];
    @Input() isAdmin!: boolean;
    @Output() dataOnChange: EventEmitter<void> = new EventEmitter();
    showNewTeam: boolean = false;

    constructor(private teamService: TeamService, private dialog: MatDialog) {}

    createTeam(invoker: TeamComponent) {
        if (
            this.teamService.getTeamByName(invoker.actualFieldsTeam.name) !=
            undefined
        ) {
            this.dialog.open(DialogComponent, {
                data: 'Name you have entered is already used fuck!',
            });
        } else {
            this.teamService.saveTeam(invoker.actualFieldsTeam);
            this.showNewTeam = false;
            this.dataOnChange.emit();
        }
    }

    updateTeam(invoker: TeamComponent) {
        if (
            invoker.team.name != invoker.actualFieldsTeam.name &&
            this.teamService.getTeamByName(invoker.actualFieldsTeam.name)
        ) {
            this.dialog.open(DialogComponent, {
                data: 'Name you have entered is already used!',
            });
        } else {
            this.teamService.updateTeam(
                invoker.team.name,
                invoker.actualFieldsTeam
            );
            this.dataOnChange.emit();
            invoker.isEditing = false;
        }
    }

    deleteTeam(invoker: TeamComponent) {
        if (invoker.isNewTeam) {
            this.showNewTeam = false;
        } else {
            this.teamService.deleteTeam(invoker.team.name);
            this.dataOnChange.emit();
        }
    }
}
