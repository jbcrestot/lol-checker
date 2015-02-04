(function() {
    var app = angular.module('teamRanking', []);

    app.controller('ladderController', function() {
        this.teams = teams.entries;
        this.tier = teams.tier;
        console.log(this.teams);
    });

})();
