PostsEditCtrl = function($scope, $location, $routeParams, Post,$http,Auth,Upload) {
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
             return $location.path("/signin");
        });


  Post.get({
    id: $routeParams.id
  }, function(post) {
    this.original = post;
    return $scope.post = new Post(this.original);
  });
  $scope.isClean = function() {
    return angular.equals(this.original, $scope.post);
  };
  $scope.destroy = function() {
    if (confirm("Are you sure?")) {
      return $scope.post.destroy(function() {
        return $location.path("/posts");
      });
    }
  };
   return $scope.save = function(title,desc,files) {


//data = $scope.post;

    if (files && files.length) {
         for (var i = 0; i < files.length; i++) {
             var file = files[i];
             var data=$scope.post;
               Upload.upload({
                   method: 'PUT',
                   url: '/posts/1/edit',
                  fields: {'title': $scope.post.title,'description':$scope.post.description},
                  file: file,
                  fileFormDataName: 'post[avatar]'
                })
  }
}
}
};
















return $scope.save = function() {
    return Post.update($scope.post, function(post) {
      return $location.path("/posts");
    });
  };
};