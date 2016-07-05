// Blog App
var blogApp = angular.module('blogApp', ['ngRoute', 'contentful', 'hc.marked']);
blogApp
   .config(['$routeProvider', 'contentfulProvider',
        function($routeProvider, contentfulProvider) {

            contentfulProvider.setOptions({
                space: 'ehq6zfjbpm3a',
                accessToken: '9e4e287d7ce49034649f06f942f69ba9ff1de81fb51eca303af204430ca79955'
            });

            $routeProvider
            .when('/post/:slug', {
                templateUrl: 'post.html',
                controller: 'PostController'
            })
            .when('/', {
                templateUrl: 'home.html',
                controller: 'HomeController'
            })
            .otherwise({
                redirectTo: '/'
            });

        }
    ])

 .controller('HomeController', ['$scope', 'contentful', 
    function($scope, contentful) {
        contentful
        .entries('content_type=noticias')
        .then(
            function(response){
                $scope.entries = response.data;
            },
            function(response){
                console.log('Algo pasó que no se trajo las entradas :(');
            }
        )
    }
])

.controller('PostController', ['$scope', '$routeParams',  'contentful',  
    function($scope, $routeParams, contentful) {
        contentful
        .entries('content_type=noticias&fields.slug='+$routeParams.slug+'&limit=1')
        .then(
            function(response){
                $scope.entry = response.data.items[0];
            },
            function(response){
                console.log('Algo pasó que no se trajo las entradas :(');
            }
        )
    }
])