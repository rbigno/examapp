'use strict';

// Declare app level module which depends on views, and components
angular
  .module('myApp', [
    'ngAnimate',
    'ngResource',
    'ngTouch',
    'ngMessages',
    'dndLists',
    'LocalStorageModule'
  ])

.config(['localStorageServiceProvider', function(localStorageServiceProvider){
  localStorageServiceProvider.setPrefix('ls');
}])

.controller('ViewCtrl', function ($scope, $window, localStorageService) {

    $scope.hgt = $window.innerHeight - 150;

    var listInStore = localStorageService.get('models');

    $scope.models = listInStore || [
      
      {
        label :"Backlogs", 
        content : [
              {text:'Story #1', imgfile:'', bgcolor:'apply-white', coltype:0}, 
              {text:'Cards do many cool things. Click on this card to open it and learn more...', imgfile:'assets/images/taco.png', bgcolor:'apply-white', coltype:0}
        ]
      },
      {
        label :"In Progress", 
        content : [
              {text:'Story #1', imgfile:'', bgcolor:'apply-white', coltype:1}
        ]
      },
      {
        label :"Done", 
        content : [
              {text:'Story #1', imgfile:'', bgcolor:'apply-white', coltype:2}
        ]
      },
      {
        label :"Trash", 
        content : []
      }      
    ];

    console.log(listInStore);

    $scope.$watch('models', function (models) {
      localStorageService.set('models', $scope.models);
    }, true);    

    $scope.addList = function (listval) {
        $scope.models[listval].content.push({text:'Story #1', imgfile:'', bgcolor:'apply-white', coltype:listval});     
    };

    $scope.title = '';

    $scope.saveListItem = function (index, text, coltype) {
        if (angular.isDefined(text)) {
          $scope.models[coltype].content[index]['text'] = text;
        }           
    };                  

    $scope.updateListItem = function(index, val, coltype) {
        $scope.models[coltype].content[index]['bgcolor'] = val;
    };

    $scope.removeListItem = function (index, coltype) {
        $scope.models[3].content.push($scope.models[coltype].content[index]);
        $scope.models[coltype].content.splice(index, 1);
    };

    $scope.deleteListItem = function (index) {
        $scope.models[3].content.splice(index, 1);
    };

    $scope.clearAllItem = function(coltype) {
      angular.forEach($scope.models[coltype].content, function(value, key) {
        if(typeof $scope.models[coltype].content[key] !== 'undefined') {
          $scope.models[3].content.push($scope.models[coltype].content[key]);
        }
      });   
        $scope.models[coltype].content = [];
    };   

    $scope.clearAll = function () {
      $scope.models[3].content = [];
    };   
    
    var isshow = localStorageService.get('status');
    if (isshow == null) {

        angular.element('#myModalShower').trigger('click');       
        localStorageService.set('status', 1);

    }    

});