function AppCtrl($rootScope, $scope, $ionicModal, $timeout, $localStorage, apiService, userService) {
    $scope.$on('$ionicView.enter', function(e) {

    });

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
        $scope.modal.show();
    };


    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);
        apiService.facebookLogin()
            .then(function(response) {
                //oauth success
                userService.token = response.access_token;
                return apiService.getUserInfo(userService.token);
            }, function(response) {
                //oauth error
                alert('damn nigga, oauth fail');
            })
            .then(function(response) {
                // user info success                
                userService.user = response.data;
                $rootScope.$emit('user-logged-in');                
            }, function(response) {
                // user info error
                alert('damn nigga, user info fail');
                console.log(response);
            }).finally(function() {
                $timeout(function() {
                    $scope.closeLogin();
                }, 300);
            });
    };

}
