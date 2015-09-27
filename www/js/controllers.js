angular.module('ola.controllers', ['ola.services', 'ola.utils'])
    .controller('AppCtrl', ['$rootScope', '$scope', '$ionicModal', '$timeout', '$localStorage', 'apiService', 'userService', AppCtrl])
    .controller('PlacesCtrl', ['$rootScope', '$scope', '$ionicLoading', '$ionicPlatform', '$q', '$timeout', '$cordovaGeolocation', 'apiService', 'userService', '$state', PlacesCtrl])
    .controller('TimelineCtrl', ['$rootScope', '$scope', '$q', '$timeout', 'apiService', 'userService', TimelineCtrl]);
