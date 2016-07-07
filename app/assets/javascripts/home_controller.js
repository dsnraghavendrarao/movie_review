HomeCtrl = function($scope,Post,Reviews,$location,Auth,$routeParams,$http,flash) {
  

  $scope.myInterval = 3000;
$scope.currentPage = 0;
$scope.pageSize = 4;
$scope.user={};
  $scope.current_user=[];
   $scope.posts = Post.query();
   $scope.theaters = Reviews.query();

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


  
  
    
      $scope.saveComment = function(a,b) {
         Auth.currentUser().then(function(user) {
            $scope.current_user.push(user);
            console.log(user); // => {id: 1, ect: '...'}
        }, function(error) {
          flash.success = 'You Need to signin first '; 

             return $location.path("/signin");
        });
    
   $http({
    method: 'POST',
    url: '/comments',
    data: $.param({PostId: b,body: a}),
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
   }).success(function(result){
    console.log(result);
      return $location.path("home/"+b);
});
}
   
  
   $scope.saveReview = function(cont,postid) {
    Auth.currentUser().then(function(user) {
            $scope.current_user.push(user);
            console.log(user); // => {id: 1, ect: '...'}
        }, function(error) {
          flash.success = 'You Need to signin first '; 
             alert(b);
             return $location.path("/signin");
        });
     
   
   $http({
    method: 'POST',
    url: '/reviews',
    data: $.param({PostId: postid,content: cont}),
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
   }).success(function(result){
    console.log(result);
      return $location.path("home/"+postid);
});

    
  };

 
 };
  


HomeCtrl.$inject = ['$scope', 'Post','Reviews','$location','Auth','$routeParams','$http','flash'];




  

  
  
