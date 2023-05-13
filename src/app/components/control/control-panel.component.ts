import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/common/dialog/dialog.component';
import { Team } from 'src/app/model/team';
import { User } from 'src/app/model/user';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';
import { Constants } from 'src/app/utils/constants';

@Component({
    selector: 'control-panel-component',
    templateUrl: './control-panel.component.html',
    styleUrls: ['./control-panel.component.scss'],
})
export class ControlPanelComponent implements OnInit {
    loggedUser?: User;
    users: User[] = [];
    teams: Team[] = [];
    showContent: boolean = true;

    constructor(
        private userService: UserService,
        private teamService: TeamService,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.refreshControlPanel();
    }

    refreshControlPanel() {
        this.userService.getLoggedUser().subscribe((result) => {
            if (result.error) {
                return;
            }
            this.loggedUser = result.response;
            this.userService.getColleagues().subscribe((result) => {
                this.users = result.response;
                if (result.error) {
                    this.dialog.open(DialogComponent, {
                        data: {
                            title: Constants.errorDialogTitle,
                            content: 'Error while loading colleagues!',
                        },
                    });
                }
            });

            this.teamService.getTeams().subscribe((result) => {
                this.teams = result.response;
                if (result.error) {
                    this.dialog.open(DialogComponent, {
                        data: {
                            title: Constants.errorDialogTitle,
                            content: 'Error while loading teams!',
                        },
                    });
                }
            });
        });
    }
}
