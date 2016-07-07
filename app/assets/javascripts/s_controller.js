

SCtrl = function($scope, $location,$routeParams, Post,$http,Auth,flash) {
 
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
            return $location.path("/signin");
        }, function(error) {
            // An error occurred logging out.
        });

        $scope.$on('devise:logout', function(event, oldCurrentUser) {
            // ...
        });
         }
   $scope.current_user=[];
  Auth.currentUser().then(function(user) {
            $scope.current_user.push(user);
            console.log(user); // => {id: 1, ect: '...'}
        }, function(error) {
flash.success = 'You Need to signin first '; 
             return $location.path("/signin");

        });
  
  
     $scope.saveComment = function(a,b,c) {
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
    data: $.param({PostId: b,body: a,custom_rating: c}),
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
   }).success(function(result){
    console.log(result);
      return $location.path("movie/"+b);
});
}


$scope.comments = [];
  $http({
    method: 'GET',
    url: '/comments/'+$routeParams.id+'/',
    
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
   }).success(function(result){
    console.log(result);
    return $scope.comments.push(result);
      
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
 $scope.post = [];
  $http({
    method: 'GET',
    url: '/posts/'+$routeParams.id+'/',
    
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
   }).success(function(result){
    console.log(result);
    return $scope.post.push(result);
      
});

  Post.get({
    id: $routeParams.id
  }, function(post) {
    this.original = post;
   
    return $scope.post = new Post(this.original);
   
  });
  

  // return $scope.destroy = function() {
  //   if (confirm("Are you sure?")) {
  //     return $scope.post.destroy(function() {
  //       return $location.path("/posts");
  //     });
  //   }
  // };
};

SCtrl.$inject = ['$scope','$location','$routeParams', 'Post','$http','Auth','flash'];