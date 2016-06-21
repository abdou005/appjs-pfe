/**
 * Created by abdo on 2016-05-07.
 */

'use strict';
app.directive('priceserviceRating',function(){

	return {
		restrict : 'A',
		template : '<ul class="rating"> <li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">'
		+ '  <i class="fa fa-star"></i>'
		+ ' </li>'
		+ '</ul>',
		scope : {
			ratingValue : '=',
			max : '=',
			onRatingSelected : '&'
		},
		link : function(scope, elem, attrs) {
			var updateStars = function() {
				scope.stars = [];
				for ( var i = 0; i < scope.max; i++) {
					scope.stars.push({
						filled : i < scope.ratingValue
					});
				}
			};

			scope.toggle = function(index) {
				scope.ratingValue = index + 1;
				scope.onRatingSelected({
					ratingPriceServ : index + 1
				});
			};

			scope.$watch('ratingValue',
				function(oldVal, newVal) {
					if (newVal) {
						updateStars();
					}
				}
			);
		}
	};

});

