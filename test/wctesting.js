
test("Team Object Initialization", function () {
    var elem = new Team('mike');
    equal(elem.sName, 'mike');
    equal(elem.nGP, 0, elem.sName + " 0 games played");
    equal(elem.nP, 0, elem.sName + " 0 points");
    equal(elem.nW, 0, elem.sName + " 0 wins");
    equal(elem.nD, 0, elem.sName + " 0 draws");
    equal(elem.nL, 0, elem.sName + " 0 losses");
    equal(elem.nGF, 0, elem.sName + " 0 goals scored");
    equal(elem.nGA, 0, elem.sName + " 0 goals against");
    equal(elem.nGD, 0, elem.sName + " 0 goal differential");
});

test("Team.AddResult", function () {
    var elem = new Team('mike');

    elem.AddResult(5,0);
    elem.AddResult(0,0);
    elem.AddResult(0,5);

    equal(elem.nGP, 3, elem.sName + " 3 games played");
    equal(elem.nP, 4, elem.sName + " 4 points");
    equal(elem.nW, 1, elem.sName + " 1 wins");
    equal(elem.nD, 1, elem.sName + " 1 draws");
    equal(elem.nL, 1, elem.sName + " 1 losses");
    equal(elem.nGF, 5, elem.sName + " 5 goals scored");
    equal(elem.nGA, 5, elem.sName + " 5 goals against");
    equal(elem.nGD, 0, elem.sName + " 0 goal differential");

    elem.AddResult(4,3);
    elem.AddResult(1,1);
    elem.AddResult(0,2);

    equal(elem.nGP, 6, elem.sName + " 6 games played");
    equal(elem.nP, 8, elem.sName + " 8 points");
    equal(elem.nW, 2, elem.sName + " 2 wins");
    equal(elem.nD, 2, elem.sName + " 2 draws");
    equal(elem.nL, 2, elem.sName + " 2 losses");
    equal(elem.nGF, 10, elem.sName + " 10 goals scored");
    equal(elem.nGA, 11, elem.sName + " 11 goals against");
    equal(elem.nGD, -1, elem.sName + " -1 goal differential");
});

test("Basic Team Results Testing", function () {
    var aMatches = [];
    aMatches[aMatches.length] = {home: 'Serbia', homeScore: 0, away: 'Ghana', awayScore: 0};
    aMatches[aMatches.length] = {home: 'Germany', homeScore: 0, away: 'Australia', awayScore: 0};

    aMatches[aMatches.length] = {home: 'Germany', homeScore: 0, away: 'Serbia', awayScore: 0};
    aMatches[aMatches.length] = {home: 'Ghana', homeScore: 0, away: 'Australia', awayScore: 0};

    aMatches[aMatches.length] = {home: 'Ghana', homeScore: 0, away: 'Germany', awayScore: 0};
    aMatches[aMatches.length] = {home: 'Australia', homeScore: 0, away: 'Serbia', awayScore: 0};

    var aRet = GetTeamStats(aMatches);
    equal(aRet.length, 4, "4 teams returned");
    equal(_.uniq(_.pluck(aRet, 'sName')).length, 4, "4 distinct teams returned");

    _.each(aRet, function (elem) {
      equal(elem.nGP, 3, elem.sName + " 3 games played");
      equal(elem.nP, 3, elem.sName + " 3 points");
      equal(elem.nW, 0, elem.sName + " 0 wins");
      equal(elem.nD, 3, elem.sName + " 3 draws");
      equal(elem.nL, 0, elem.sName + " 0 losses");
      equal(elem.nGF, 0, elem.sName + " 0 goals scored");
      equal(elem.nGA, 0, elem.sName + " 0 goals against");
      equal(elem.nGD, 0, elem.sName + " 0 goal differential");
    });
});

test("Imcomplete Match Testing", function () {

    var aMatches = [];
    aMatches[aMatches.length] = {home: 'Serbia', homeScore: 55, away: 'Ghana'};
    aMatches[aMatches.length] = {home: 'Germany', away: 'Australia', awayScore: 47};

    var aRet = GetTeamStats(aMatches);
    equal(aRet.length, 4, "4 teams returned");
    equal(_.uniq(_.pluck(aRet, 'sName')).length, 4, "4 distinct teams returned");

    _.each(aRet, function (elem) {
	equal(elem.nGP, 0, elem.sName + " 0 games played");
	equal(elem.nP, 0, elem.sName + " 0 points");
	equal(elem.nW, 0, elem.sName + " 0 wins");
	equal(elem.nD, 0, elem.sName + " 0 draws");
	equal(elem.nL, 0, elem.sName + " 0 losses");
	equal(elem.nGF, 0, elem.sName + " 0 goals scored");
	equal(elem.nGA, 0, elem.sName + " 0 goals against");
	equal(elem.nGD, 0, elem.sName + " 0 goal differential");
    });
});

test("Incomplete Group Results Testing", function () {

    var aMatches = [];
    aMatches[aMatches.length] = {home: 'Serbia', homeScore: 0, away: 'Ghana', awayScore: 0};
    aMatches[aMatches.length] = {home: 'Germany', homeScore: 0, away: 'Australia', awayScore: 0};

    aMatches[aMatches.length] = {home: 'Germany', away: 'Serbia'};
    aMatches[aMatches.length] = {home: 'Ghana', away: 'Australia'};

    aMatches[aMatches.length] = {home: 'Ghana', away: 'Germany' };
    aMatches[aMatches.length] = {home: 'Australia', away: 'Serbia' };

    var aRet = GetTeamStats(aMatches);
    equal(aRet.length, 4, "4 teams returned");
    equal(_.uniq(_.pluck(aRet, 'sName')).length, 4, "4 distinct teams returned");

    _.each(aRet, function (elem) {
	equal(elem.nGP, 1, elem.sName + " 1 games played");
	equal(elem.nP, 1, elem.sName + " 1 points");
	equal(elem.nW, 0, elem.sName + " 0 wins");
	equal(elem.nD, 1, elem.sName + " 1 draws");
	equal(elem.nL, 0, elem.sName + " 0 losses");
	equal(elem.nGF, 0, elem.sName + " 0 goals scored");
	equal(elem.nGA, 0, elem.sName + " 0 goals against");
	equal(elem.nGD, 0, elem.sName + " 0 goal differential");
    });
});

test("Points Ordering", function() {
    var aMatches = [];
    aMatches[aMatches.length] = {home: 'Serbia', homeScore: 0, away: 'Ghana', awayScore: 1};
    aMatches[aMatches.length] = {home: 'Germany', homeScore: 0, away: 'Australia', awayScore: 1};

    aMatches[aMatches.length] = {home: 'Germany', homeScore: 1, away: 'Serbia', awayScore: 0};
    aMatches[aMatches.length] = {home: 'Ghana', homeScore: 0, away: 'Australia', awayScore: 1};

    aMatches[aMatches.length] = {home: 'Ghana', homeScore: 0, away: 'Germany', awayScore: 1};
    aMatches[aMatches.length] = {home: 'Australia', homeScore: 1, away: 'Serbia', awayScore: 0};

    var aRet = GetGroupOrder(aMatches);
    equal(aRet[0].sName, "Australia");
    equal(aRet[1].sName, "Germany");
    equal(aRet[2].sName, "Ghana");
    equal(aRet[3].sName, "Serbia");
});

test("Goals Ordering", function() {
    var aMatches = [];
    aMatches[aMatches.length] = {home: 'Serbia', homeScore: 0, away: 'Ghana', awayScore: 0};
    aMatches[aMatches.length] = {home: 'Germany', homeScore: 4, away: 'Australia', awayScore: 4};

    aMatches[aMatches.length] = {home: 'Germany', homeScore: 2, away: 'Serbia', awayScore: 2};
    aMatches[aMatches.length] = {home: 'Ghana', homeScore: 4, away: 'Australia', awayScore: 4};

    aMatches[aMatches.length] = {home: 'Ghana', homeScore: 3, away: 'Germany', awayScore: 3};
    aMatches[aMatches.length] = {home: 'Australia', homeScore: 4, away: 'Serbia', awayScore: 4};

    var aRet = GetGroupOrder(aMatches);
    equal(aRet[0].sName, "Australia");
    equal(aRet[1].sName, "Germany");
    equal(aRet[2].sName, "Ghana");
    equal(aRet[3].sName, "Serbia");
});

test("Goal Differential Ordering", function() {
    var aMatches = [];
    aMatches[aMatches.length] = {home: 'Serbia', homeScore: 0, away: 'Ghana', awayScore: 0};
    aMatches[aMatches.length] = {home: 'Germany', homeScore: 0, away: 'Australia', awayScore: 0};

    aMatches[aMatches.length] = {home: 'Germany', homeScore: 2, away: 'Serbia', awayScore: 0};
    aMatches[aMatches.length] = {home: 'Ghana', homeScore: 0, away: 'Australia', awayScore: 2};

    aMatches[aMatches.length] = {home: 'Ghana', homeScore: 0, away: 'Germany', awayScore: 1};
    aMatches[aMatches.length] = {home: 'Australia', homeScore: 2, away: 'Serbia', awayScore: 0};

    var aRet = GetGroupOrder(aMatches);
    equal(aRet[0].sName, "Australia");
    equal(aRet[1].sName, "Germany");
    equal(aRet[2].sName, "Ghana");
    equal(aRet[3].sName, "Serbia");
});
