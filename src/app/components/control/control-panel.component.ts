import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/common/dialog/dialog.component';
import { Team } from 'src/app/model/team';
import { User } from 'src/app/model/user/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RouterService } from 'src/app/services/router.service';
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
    showContent: boolean = true;
    users: User[] = [];
    teams: Team[] = [];

    constructor(
        private authService: AuthService,
        private userService: UserService,
        private teamService: TeamService,
        private dialog: MatDialog,
        private router: RouterService
    ) {}

    ngOnInit(): void {
        this.refreshControlPanel();
    }

    async refreshControlPanel() {
        this.loggedUser = this.userService.loggedUser;

        if (!this.loggedUser || !this.authService.isLoggedIn()) {
            let result = await this.userService.getLoggedUser().toPromise();
            if (result.error) {
                this.authService.logoutUser();
                return;
            } else {
                this.loggedUser = result.response;
            }
        }

        this.userService.getColleagues().subscribe((result) => {
            this.users = result.response;

            if (result.error) {
                this.dialog.open(DialogComponent, {
                    data: {
                        title: Constants.errorDialogTitle,
                        content: result.response,
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
                        content: result.response,
                    },
                });
            }
        });
    }

    signIn() {
        this.router.navigateUrl(Constants.authPage);
    }
}
