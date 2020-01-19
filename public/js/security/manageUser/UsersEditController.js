/* 
* Generated by
* 
*      _____ _          __  __      _     _
*     / ____| |        / _|/ _|    | |   | |
*    | (___ | | ____ _| |_| |_ ___ | | __| | ___ _ __
*     \___ \| |/ / _` |  _|  _/ _ \| |/ _` |/ _ \ '__|
*     ____) |   < (_| | | | || (_) | | (_| |  __/ |
*    |_____/|_|\_\__,_|_| |_| \___/|_|\__,_|\___|_|
*
* The code generator that works in many programming languages
*
*			https://www.skaffolder.com
*
*
* You can generate the code from the command-line
*       https://npmjs.com/package/skaffolder-cli
*
*       npm install -g skaffodler-cli
*
*   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *
*
* To remove this comment please upgrade your plan here: 
*      https://app.skaffolder.com/#!/upgrade
*
* Or get up to 70% discount sharing your unique link:
*       https://app.skaffolder.com/#!/register?friend=5e2490300cfc6233ae9339a8
*
* You will get 10% discount for each one of your friends
* 
*/

/**
 * Controller edit user for Admin
 */
app.controller('UsersEditController', ['$scope', '$location', '$routeParams', '$q', 'UserService',
    function ($scope, $location, $routeParams, $q, UserService ) {

    	// Get user
    	if ($routeParams.id != 'new')
    	{
        	$scope.id = $routeParams.id;
        	$scope.user = UserService.get({_id: $scope.id});
    	}
    	else{
    		$scope.user = new UserService({
    		    roles: []
    		});
    	}
		
		// Save user
    	$scope.save = function(){
    	    
			if (!$scope.user._id) {
				$scope.user.password = sha3_512($scope.user.password).toString();
			}
			
    		$scope.user.$save().then(function(data){
    			$scope.user=data;
        		$location.path('/manage-users/');
    		});
    	}
		
		// Delete user
    	$scope.remove = function(){
    		UserService.remove({_id: $scope.user._id}).$promise.then(function(){
				$('#removeModal').modal('hide');
				$('.modal-backdrop').remove();
				$('.modal-open').removeClass("modal-open");
        		$location.path('/manage-users/');
    		});
    	}
		
		// Add role
		$scope.addRole = function() {
			$scope.user.roles.push($scope.newRole);
			$scope.newRole = "";
		}

		// Remove role
		$scope.removeRole = function(index) {
			$scope.user.roles.splice(index, 1);
		}

		//Change password
		$scope.changePassword = function() {
			var passwordNew = sha3_512($scope.passwordNew).toString();
			var passwordAdmin = sha3_512($scope.passwordAdmin).toString();

			UserService.changePassword({id: $scope.user._id, passwordNew: passwordNew, passwordAdmin: passwordAdmin })
			.$promise.then(function(data) {
				$('#changePasswordModal').modal('hide');
				$scope.passwordAdmin = null;
				$scope.passwordNew = null;
				$scope.passwordNewConfirm = null;
			}, function(err) {
				$scope.showError = true;
			})
		};

}]);