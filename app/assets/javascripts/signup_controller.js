SignUpCtrl = function($scope,$location,Auth,flash) {
 $scope.hide=function(){
    $('#a').hide()
 }    
$scope.signup = function() {
 
 var credentials = {
            email: $scope.user.email,
            password: $scope.user.password,
            password_confirmation: $scope.user.confirmpassword
        };
        var config = {
            headers: {
                'X-HTTP-Method-Override': 'POST'
            }
        };

        Auth.register(credentials, config).then(function(registeredUser) {
            flash.success = 'Your Registered Succesfully '; 
            return $location.path("/home");

            console.log(registeredUser);
             // => {id: 1, ect: '...'}
        }, function(error) {
            // Registration failed...
              if(error.data.errors.email){
                 $('#a').html("Please Choose another EMAIL/ EMAIL already register with us..!");
                  $('#a').show();     
            
         
          }else if(error.data.errors.password){

          alert('is too short (minimum is 8 characters)');
           }else if(error.data.errors.password_confirmation){
            $('#a').html("passwords not match");
                  $('#a').show(); 
         // alert(error.data.errors.password_confirmation);
          }       });

        $scope.$on('devise:new-registration', function(event, user) {
            // ...
        });
    }
    };
    SignUpCtrl.$inject = ['$scope','$location','Auth','flash'];
