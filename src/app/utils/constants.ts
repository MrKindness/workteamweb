export class Constants {
    static readonly apiPath = 'http://localhost:8080/';

    static readonly userRoot = 'api/user';
    static readonly userDetailsRequest = Constants.userRoot + '/userDetails';
    static readonly colleaguesRequest = Constants.userRoot + '/colleagues';

    static readonly teamRoot = 'api/team';
    static readonly teamsRequest = Constants.teamRoot + '/teams';

    static readonly authPage = 'auth';
    static readonly controlPage = 'control';

    static readonly errorDialogTitle = 'Error';
    static readonly successDialogTitle = 'Success';
}
