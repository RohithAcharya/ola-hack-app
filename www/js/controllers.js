angular.module('ola.controllers', ['ola.services', 'ola.utils'])
    .controller('AppCtrl', ['$rootScope', '$scope', '$ionicModal', '$timeout', '$localStorage', 'apiService', 'userService', AppCtrl])
    .controller('PlacesCtrl', ['$rootScope', '$scope', '$ionicLoading', '$ionicPlatform', '$q', '$timeout', '$cordovaGeolocation', 'apiService', 'userService', '$state', PlacesCtrl])
    .controller('TimelineCtrl', ['$rootScope', '$scope', '$q', '$timeout', '$ionicPlatform', '$cordovaCamera', 'apiService', 'userService', '$ionicScrollDelegate', TimelineCtrl])
    .controller('ExploreCtrl', ['$rootScope', '$scope', 'apiService', 'userService', '$state', '$ionicLoading', ExploreCtrl])
    .controller('ProfileCtrl', ['$rootScope', '$scope', '$timeout', ProfileCtrl])
    .controller('ExploreTimelineCtrl', ['$scope', 'userService', 'apiService', '$timeout', '$ionicScrollDelegate', '$ionicPlatform', '$cordovaCamera', '$ionicLoading', ExploreTimelineCtrl]);
