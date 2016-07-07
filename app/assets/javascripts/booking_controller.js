// BookingsCreateCtrl = function($scope, $location, Post,Auth,FileUploader,Upload,$http) {
    
//   $scope.logout =function(){
//            var config = {
//             headers: {
//                 'X-HTTP-Method-Override': 'DELETE'
//             }
//         };
//         // Log in user...
//         // ...
//         Auth.logout(config).then(function(oldUser) {
//             // alert(oldUser.name + "you're signed out now.");
//             return $location.path("/signin");
//         }, function(error) {
//             // An error occurred logging out.
//         });

//         $scope.$on('devise:logout', function(event, oldCurrentUser) {
//             // ...
//         });
//          }
//    $scope.current_user=[];
//   Auth.currentUser().then(function(user) {
//             $scope.current_user.push(user);
//             console.log(user); // => {id: 1, ect: '...'}
//         }, function(error) {
//              return $location.path("/signin");
//         });
//   return $scope.save = function(title,desc,rating,date,availability,files) {


// //data = $scope.post;

//     if (files && files.length) {
//          for (var i = 0; i < files.length; i++) {
//              var file = files[i];
//              var data=$scope.post;
//                Upload.upload({
//                    method: 'POST',
//                    url: '/posts',
//                   fields: {'title': $scope.post.title,'description':$scope.post.description,'rating':$scope.post.rating,'date':$scope.post.date,'availability':$scope.post.availability},
//                   file: file,
//                 })
//              .success(function (data, status, headers, config) {
//                     console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
//                       return $location.path("/home");
         
//                 }).error(function (data, status, headers, config) {
//                     console.log('error status: ' + status);
//                 })
//          }
//      }

  
//   };
// };

// BookingsCreateCtrl.$inject = ['$scope', '$location', 'Post','Auth','FileUploader','Upload','$http'];



BookingsCreateCtrl = function($scope, $location, $routeParams, Post,$http,Auth,flash) {
  
  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 2);
  $scope.events =
    [
      {
        date: tomorrow,
        status: 'full'
      },
      {
        date: afterTomorrow,
        status: 'partially'
      }
    ];

  $scope.getDayClass = function(date, mode) {
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i=0;i<$scope.events.length;i++){
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  };



  $scope.user={};
  $scope.current_user=[];
  Auth.currentUser().then(function(user) {

            $scope.current_user.push(user);
            console.log(user); // => {id: 1, ect: '...'}
        });

$scope.logout =function(){
           var config = {
            headers: {
                'X-HTTP-Method-Override': 'DELETE'
            }
        };
       
        // Log in user...
        // ...
        Auth.logout(config).then(function(oldUser) {
            // alert(oldUser.name + "you're signed out now.");
            return $location.path("/");
        }, function(error) {
            // An error occurred logging out.
        });

        $scope.$on('devise:logout', function(event, oldCurrentUser) {
            // ...
        });
        
}

  Post.get({
    id: $routeParams.id
  }, function(post) {
    this.original = post;
    return $scope.post = new Post(this.original); 
  });

    $scope.reviews = [];
  $http({
    method: 'GET',
    url: '/reviews/'+$routeParams.id+'/',
    
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
   }).success(function(result){
    console.log(result);
    return $scope.reviews.push(result);
      
});

$scope.saveBooking = function(a,b,c,d) {
         Auth.currentUser().then(function(user) {
            $scope.current_user.push(user);
            console.log(user); // => {id: 1, ect: '...'}
        }, function(error) {
          flash.success = 'You Need to signin first '; 

             return $location.path("/signin");
        });
 
   $http({
    method: 'POST',
    url: '/bookings',
    data: $.param({PostId: b,date: a,ticket: c,PostAvailability: d}),
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
   }).success(function(result){
    console.log(result);
      return $location.path("conformation/"+b);
});
}


};

BookingsCreateCtrl.$inject = ['$scope', '$location', '$routeParams', 'Post','$http','Auth','flash'];