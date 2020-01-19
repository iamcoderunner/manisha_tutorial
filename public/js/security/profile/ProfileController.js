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

/*
 * ProfileController  
 */
app.controller('ProfileController', ['$scope', '$location', 'AuthenticationService', 'UserService',
    function ($scope, $location, AuthenticationService, UserService) {

		// Get current user
		AuthenticationService.getUser().then(function(user) {
			$scope.user =  user;
		});
		
		// Save user
    	$scope.save = function() {
    		$scope.user.$save().then(function(data){
    			$scope.user = data;
        		$location.path('/home');
    		});
		}
		
		// Change password
		$scope.changePassword = function() {
			var passwordNew = sha3_512($scope.passwordNew).toString();
			var passwordOld = sha3_512($scope.passwordOld).toString();

			UserService.changePasswordProfile({passwordNew: passwordNew, passwordOld:passwordOld })
			.$promise.then(function(data) {
				$('#changePasswordModal').modal('hide');
				$scope.passwordOld = null;
				$scope.passwordNew = null;
				$scope.passwordNewConfirm = null;
			}, function(err) {
				$scope.showError = true;
			})
		}
    	
}]);