


LogInCtrl = function($scope,Post,$location,Auth,svc,flash) {
  
  $scope.current_user=[];


   Auth.currentUser().then(function(user) {
            $scope.current_user.push(user);
            console.log(user);
          
            return $location.path("/posts");
              
             // => {id: 1, ect: '...'}
        }, function(error) {
             return $location.path("/signin");
        });
   
 $scope.hide=function(){
    $('#a').hide()
 }
 $scope.signin = function() {
 
 


  var credentials = {
            email: $scope.user.email,
            password: $scope.user.password
        };
        var config = {
            headers: {
                'X-HTTP-Method-Override': 'POST'
            }
        };
      
     // Code to use 'angular-devise' component
        Auth.login(credentials,config).then(function(user) {
        $scope.current_user.push(user);
        console.log($scope.current_user);
        
           
             flash.success = 'Your Loggined Succesfully ';   
            return $location.path("/home");
           
        }, function(error) {
               
           $('#a').html("Invalid user details");
             $('#a').show();      
          console.info('Error in authenticating user!');
          
         
        })
         }
         
};

  

  
  
LogInCtrl.$inject = ['$scope', 'Post','$location','Auth','svc','flash'];
