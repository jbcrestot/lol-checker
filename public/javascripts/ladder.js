(function() {
    var app = angular.module('teamRanking', []);

    app.controller('ladderController', function($scope) {
        $scope.teams = teams;
        //this.teams;
        //this.tier = teams.tier;
        //
        //this.getTeams = function() {
        //    if (_.isUndefined(this.teams)) {
        //        sortedTeams = _.sortBy(teams.entries, function(team) { return team.leaguePoints; });
        //        this.teams = sortedTeams.reverse();
        //    }
        //
        //    return this.teams;
        //};
    });

})();
