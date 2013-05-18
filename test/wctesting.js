
test("Team Object Initialization", function () {
    var elem = new Team('mike');
    ok(elem.sName == 'mike');
    ok(elem.nGP == 0, elem.sName + " 0 games played");
    ok(elem.nP == 0, elem.sName + " 0 points");
    ok(elem.nW == 0, elem.sName + " 0 wins");
    ok(elem.nD == 0, elem.sName + " 0 draws");
    ok(elem.nL == 0, elem.sName + " 0 losses");
    ok(elem.nGF == 0, elem.sName + " 0 goals scored");
    ok(elem.nGA == 0, elem.sName + " 0 goals against");
    ok(elem.nGD == 0, elem.sName + " 0 goal differential");
});

test("Team.AddResult", function () {
    var elem = new Team('mike');

    elem.AddResult(5,0);
    elem.AddResult(0,0);
    elem.AddResult(0,5);

    ok(elem.nGP == 0, elem.sName + " 3 games played");
    ok(elem.nP == 0, elem.sName + " 4 points");
    ok(elem.nW == 0, elem.sName + " 1 wins");
    ok(elem.nD == 0, elem.sName + " 1 draws");
    ok(elem.nL == 0, elem.sName + " 1 losses");
    ok(elem.nGF == 0, elem.sName + " 5 goals scored");
    ok(elem.nGA == 0, elem.sName + " 5 goals against");
    ok(elem.nGD == 0, elem.sName + " 0 goal differential");

});

test("Basic Group Results Testing", function () {
    var aMatches = [];
    aMatches[aMatches.length] = {homeTeam: 'Serbia', homeScore: 0, awayTeam: 'Ghana', awayScore: 0};
    aMatches[aMatches.length] = {homeTeam: 'Germany', homeScore: 0, awayTeam: 'Australia', awayScore: 0};

    aMatches[aMatches.length] = {homeTeam: 'Germany', homeScore: 0, awayTeam: 'Serbia', awayScore: 0};
    aMatches[aMatches.length] = {homeTeam: 'Ghana', homeScore: 0, awayTeam: 'Australia', awayScore: 0};

    aMatches[aMatches.length] = {homeTeam: 'Ghana', homeScore: 0, awayTeam: 'Germany', awayScore: 0};
    aMatches[aMatches.length] = {homeTeam: 'Australia', homeScore: 0, awayTeam: 'Serbia', awayScore: 0};

    var aRet = GetTeamStats(aMatches);
    ok(aRet.length == 4, "4 teams returned");
    ok(_.uniq(_.pluck(aRet, 'sName')).length == 4, "4 distinct teams returned");
    
    _.each(aRet, function (elem) {
	ok(elem.nGP == 3, elem.sName + " 3 games played");
	ok(elem.nP == 3, elem.sName + " 3 points");
	ok(elem.nW == 0, elem.sName + " 0 wins");
	ok(elem.nD == 3, elem.sName + " 3 draws");
	ok(elem.nL == 0, elem.sName + " 0 losses");
	ok(elem.nGF == 0, elem.sName + " 0 goals scored");
	ok(elem.nGA == 0, elem.sName + " 0 goals against");
	ok(elem.nGD == 0, elem.sName + " 0 goal differential");
    });
});
