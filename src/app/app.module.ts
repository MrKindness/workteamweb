import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import {
    MatDialogModule,
    MAT_DIALOG_DEFAULT_OPTIONS,
} from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DialogComponent } from './common/dialog/dialog.component';
import { ToolbarComponent } from './components/control/toolbar/toolbar.component';
import { ControlPanelComponent } from './components/control/control-panel.component';
import { UserColumnComponent } from './components/control/user-column/user-column.component';
import { UserComponent } from './components/control/user-column/user/user.component';
import { TeamColumnComponent } from './components/control/team-column/team-column.component';
import { TeamComponent } from './components/control/team-column/team/team.component';
import { InnerTeamUserComponent } from './components/control/team-column/team/inner-team-user/inner-team-user.component';
import { NewTeamUserComponent } from './components/control/team-column/team/new-team-user/new-team-user.component';
import { Constants } from './utils/constants';
import { AuthComponent } from './components/auth/auth.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { StartPageComponent } from './components/start-page/start-page.component';
import { httpInterceptorProviders } from './services/auth/auth.interceptor';
import { UserEditComponent } from './components/control/user-edit/user-edit.component';

const appRoutes: Routes = [
    { path: '', component: StartPageComponent },
    { path: Constants.authPage, component: AuthComponent },
    { path: Constants.controlPage, component: ControlPanelComponent },
    { path: '**', component: NotFoundComponent },
];

@NgModule({
    declarations: [
        AppComponent,
        DialogComponent,
        AuthComponent,
        ControlPanelComponent,
        ToolbarComponent,
        UserColumnComponent,
        UserComponent,
        TeamColumnComponent,
        TeamComponent,
        InnerTeamUserComponent,
        NewTeamUserComponent,
        UserEditComponent,
        NotFoundComponent,
        StartPageComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatExpansionModule,
        MatSelectModule,
        MatDialogModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes),
    ],
    providers: [
        {
            provide: MAT_DIALOG_DEFAULT_OPTIONS,
            useValue: { data: String },
        },
        httpInterceptorProviders,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
