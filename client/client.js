var app = angular.module('ClassDemo', []);

app.controller('appController', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {

  $scope.attendee = {};
  $scope.attendees = [];
  $scope.notification = 'sample notif';
  $scope.success = true;



  $scope.addStudent = function(attendee) {
    // validate attendee data
    // make API call
    attendee.sessionid = 'NS-c772a285-b308-11e5-8b90-00155d140c03';
    attendee.outputtype = 'Json';
    console.log('sending data', attendee);
    $http.post('/api/attendee', attendee)
      .then(function(data){
        $scope.attendees.unshift(data.data.Done.Attendee);
        console.log('attendee addes successfully', data.data.Done.Attendee);
        showNotification(true, 'You have successfully registered');
        $scope.attendee = {};
        }, function(error){
          console.log('registration error', error);
          showNotification(false, 'There was an error saving your registration. ' + error);
      });
    // Ensure attendee has registered
    // Show little notification that registration was successful
    // add attendee to all attendees
    // Erase attendee info from form

  };

  var getAllStudents = function() {
    // get all attendees from server
    // ensure order is correct
    // add to allattendees list
    $http.get('/api/attendee')
      .then(function(data){
        $scope.attendees = data.data.Done.atendees;
        console.log('attendees', $scope.attendees);
        showNotification(true, 'Results retreived');
      }, function(error){
        console.log('returned data error', error);
        showNotification(true, 'Error retreiving results. ' + error);
      });
  };

  function validateFields(attendee) {
    var errors = false;

    if(!attendee.firstName || !attendee.lastName ||
       !attendee.attendeeId || !attendee.email) {
      errors = true;
    }

    return errors;
  }

  function showNotification(isSuccess, msg) {
    $scope.success = isSuccess;
    $scope.notification = msg;
    // clear notification after timeout
    $timeout(function(){
      $scope.notification = '';
    }, 5000);

  }

getAllStudents();


}]);
