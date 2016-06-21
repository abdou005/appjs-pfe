/**
 * Created by abdo on 2016-02-12.
 */
'use strict';
app.config(
    function($routeProvider, $locationProvider){
        $routeProvider
            .when('/users',{
                controller:'homeCtrl',
                templateUrl:'views/home/home.html'
            })
            .when('/contents',{
                controller:'contentCtrl',
                templateUrl:'views/content/list.html'
            })
            .when('/domaine',{
                controller:'domianeListCtrl',
                templateUrl:'views/domaine/list.html'
            })
            .when('/createSpec',{
                controller:'domaineCreateCtrl',
                templateUrl:'views/domaine/create.html'
            })
            .when('/login',{
                controller:'loginCtrl',
                templateUrl:'views/login/login.html'
            })
            .when('/register',{
                controller:'loginCtrl',
                templateUrl:'views/login/register.html'
            })
            .when('/profilClient',{
                controller:'profilClientCtrl',
                templateUrl:'views/profil/profilClient.html'
            })
            .when('/profilArtisan',{
                controller:'profilArtisanCtrl',
                templateUrl:'views/profil/profilArtisan.html'
            })
            .when('/profilAdmin',{
                controller:'profilAdminCtrl',
                templateUrl:'views/profil/profilAdmin.html'
            })
            .when('/profilSuperAdmin',{
                controller:'profilSuperAdminCtrl',
                templateUrl:'views/profil/profilSuperAdmin.html'
            })
            .when('/demandeDevis',{
                controller : 'demandeDevisCtrl',
                templateUrl : 'views/devis/create.html'
            })
            .when('/devisExpress',{
                  controller : 'devisExpressCtrl',
                  templateUrl : 'views/devis/createExpress.html'
            })
            .when('/recueExpress',{
                controller : 'recueExpressCtrl',
                templateUrl : 'views/devis/recuExpress.html'
            })
            .when('/createAdresse',{
                controller : 'adresseCtrl',
                templateUrl : 'views/adresse/create.html'
            })
            .when('/listMissions',{
                controller : 'missionCtrl',
                templateUrl : 'views/mission/list.html'
            })
            .when('/evaluerArtisan',{
                controller : 'evaluerMissionCtrl',
                templateUrl : 'views/evaluation/list.html'
            })
            .when('/devisAuto',{
                controller : 'listDevisAutoCtrl',
                templateUrl : 'views/devis/listDevisAuto.html'
            })
            .when('/confirmUser',{
                controller : 'confirmUserCtrl',
                templateUrl : 'views/home/confirmUser.html'
            })
            .when('/:idDevis',{
                controller : 'getDevisCtrl',
                templateUrl : 'views/devis/getDevis.html'
            })

            .otherwise({redirectTo:'/'});
        $locationProvider.html5Mode({enabled : true, requireBase:false });
    }
);
