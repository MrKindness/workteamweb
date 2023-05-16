export class Constants {
    static readonly apiPath = 'http://localhost:8080/';

    static readonly userRoot = 'api/user';
    static readonly userDetailsRequest = Constants.userRoot + '/userDetails';
    static readonly colleaguesRequest = Constants.userRoot + '/colleagues';
    static readonly updateSelfRequest = Constants.userRoot + '/self';

    static readonly teamRoot = 'api/team';
    static readonly teamsRequest = Constants.teamRoot + '/teams';
    static readonly candidatesRequest = Constants.teamRoot + '/candidates';

    static readonly authPage = 'auth';
    static readonly controlPage = 'control';

    static readonly errorDialogTitle = 'Error';
    static readonly successDialogTitle = 'Success';

    static readonly userFieldsError =
        'Username, name and email fields are required!';

    static readonly teamFieldsError = 'Name field is required!';
}
