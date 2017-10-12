const app=angular.module('myapp',['ngRoute','ngMessages']);
app.config(function($routeProvider,$locationProvider){
    $routeProvider.when('/add',{
        templateUrl:'views/add.html',
        controller:'AController'
    });
    $routeProvider.when('/',{
        templateUrl:'views/show.html',
        controller:'AController'
	});
	$routeProvider.when('/particular/:id',{
        templateUrl:'views/particular.html',
        controller:'view'
	});
	$routeProvider.when('/deleteContact/:id',{
        templateUrl:'views/show.html',
        controller:'deleteController'
	});
	$routeProvider.when('/update/:id',{
        templateUrl:'views/add.html',
        controller:'updateController'
	});
	$routeProvider.when('/404',{
		templateUrl:'views/404.html'
	});
	$routeProvider.otherwise({
		redirectTo:'views/404.html'
	})
// $locationProvider.html5Mode(true);	
})

// contact parameters
app.constant("MAX_VAL", 'ZENWAYS01AYESHA01');

// my factor
// app.factory('MyMathfactory', function (){

// })
 



app.controller('AController',function($scope,$location,$http, $rootScope,MAX_VAL){
	var refresh=function(){
		$http({
			url:'https://zenways-contact.herokuapp.com/api/contacts',
			headers:{
				key:MAX_VAL
			}
		}
		).then(function(response){
			 console.log(response.data);
			
			$scope.contacts=response.data.contacts},
			function( response){
				console.log(response);
				})
				
	}
	refresh();
	$scope.submitForm=function (contact){	
		$http( {
			url:'https://zenways-contact.herokuapp.com/api/contact',
		    headers:{
				key:'ZENWAYS01AYESHA01',
				'content-type':'application/json'
			},
			data:JSON.stringify($scope.contact),
		 method:'POST'
		}).then(function(response){
            refresh();
            $scope.contact={}
			console.log(response);
			alert('Successfully Added Contact')
			$location.path('/');
        },function(response){
            console.log(response);
            alert('Something went wrong');
		});
	}
	}
)	
	
	
	
app.controller('view',function($scope, $routeParams, $http,MAX_VAL){
	var id=$routeParams.id
	console.log(id)
	$http({
		url:'https://zenways-contact.herokuapp.com/api/contact/'+id,
		headers:{
			key:MAX_VAL
		},
		data:$scope.contact
	}).then(function(response){
		$scope.contact=response.data.contact;
		console.log(response);
	},function(response){
		console.log(response);
		console.log("Error");
	});
	
})
// delete controller
app.controller('deleteController',function($scope,$http,$routeParams,$location,MAX_VAL){
	var id=$routeParams.id;
	if(confirm( 'Are you sure'))
		{
				$http({
					url: 'https://zenways-contact.herokuapp.com/api/contact/'+id,
					headers:{
				key:MAX_VAL
			},
					method:'DELETE'
				 }).then(function(response){
					 $location.path('/');
				refresh();
				console.log(response);
				},function(response){
				console.log(response);
				alert('something went wrong');
				})	
		}	

} )
// edit controller
app.controller('updateController',function($scope,$http,$routeParams,$location,MAX_VAL){
	var id=$routeParams.id;
	
	
	console.log(id);
	$http({
		url:'https://zenways-contact.herokuapp.com/api/contact/'+id,
		headers:{
			key:MAX_VAL
		},
		data:$scope.contact
	}).then(function(response){
		$scope.contact=response.data.contact;
		console.log($scope.contact);
	},function(response){
		console.log(response);
		console.log("Error");
	});//particular  api 

	$scope.submitForm=function (contact){
			$http({
				url:'https://zenways-contact.herokuapp.com/api/contact/'+contact._id ,
				headers:{
					key:MAX_VAL
				},
				method:'PUT',
				data:$scope.contact
		}).then(function(response){
			$scope.contact={};
			console.log(response);
			$location.path('/')
		},function(response){
			console.log(response)
			alert('something went wrong');
		})//edit api
	}
		

})


