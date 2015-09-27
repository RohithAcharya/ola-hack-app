var usr = null;

function UserService($rootScope) {
    var _user = {};
    var _token = "";
    var _geolocation = {};
    var _cabDetails = {}
    var x = {
        user: _user,
        token: _token,
        geolocation: _geolocation,
        cabDetails: _cabDetails
    };
    usr = x;
    return x;

}
