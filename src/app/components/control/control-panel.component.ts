import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/model/team';
import { User } from 'src/app/model/user';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';
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
        private teamService: TeamService
    ) {}

    ngOnInit(): void {
        this.refreshControlPanel();
    }

    refreshControlPanel() {
        this.userService.getLoggedUser().subscribe((result) => {
            this.loggedUser = result;
            this.users = this.userService.getVisibleUsers();
            this.teams = this.teamService.getVisibleTeams();
        });
    }
}
