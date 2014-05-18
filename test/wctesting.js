
test("Team Object Initialization", function () {
    var elem = new Team('mike');
    strictEqual(elem.sName, 'mike');
    strictEqual(elem.nGP, 0, elem.sName + " 0 games played");
    strictEqual(elem.nP, 0, elem.sName + " 0 points");
    strictEqual(elem.nW, 0, elem.sName + " 0 wins");
    strictEqual(elem.nD, 0, elem.sName + " 0 draws");
    strictEqual(elem.nL, 0, elem.sName + " 0 losses");
    strictEqual(elem.nGF, 0, elem.sName + " 0 goals scored");
    strictEqual(elem.nGA, 0, elem.sName + " 0 goals against");
    strictEqual(elem.nGD, 0, elem.sName + " 0 goal differential");
});

test("Team.AddResult", function () {
    var elem = new Team('mike');

    elem.AddResult(5,0);
    elem.AddResult(0,0);
    elem.AddResult(0,5);

    strictEqual(elem.nGP, 3, elem.sName + " 3 games played");
    strictEqual(elem.nP, 4, elem.sName + " 4 points");
    strictEqual(elem.nW, 1, elem.sName + " 1 wins");
    strictEqual(elem.nD, 1, elem.sName + " 1 draws");
    strictEqual(elem.nL, 1, elem.sName + " 1 losses");
    strictEqual(elem.nGF, 5, elem.sName + " 5 goals scored");
    strictEqual(elem.nGA, 5, elem.sName + " 5 goals against");
    strictEqual(elem.nGD, 0, elem.sName + " 0 goal differential");

    elem.AddResult(4,3);
    elem.AddResult(1,1);
    elem.AddResult(0,2);

    strictEqual(elem.nGP, 6, elem.sName + " 6 games played");
    strictEqual(elem.nP, 8, elem.sName + " 8 points");
    strictEqual(elem.nW, 2, elem.sName + " 2 wins");
    strictEqual(elem.nD, 2, elem.sName + " 2 draws");
    strictEqual(elem.nL, 2, elem.sName + " 2 losses");
    strictEqual(elem.nGF, 10, elem.sName + " 10 goals scored");
    strictEqual(elem.nGA, 11, elem.sName + " 11 goals against");
    strictEqual(elem.nGD, -1, elem.sName + " -1 goal differential");
});

test("Team.AddResult correctly handles strings", function () {
    var elem = new Team('mike');

    elem.AddResult('2','2');
    strictEqual(elem.nGP, 1, elem.sName + " 1 game played");
    strictEqual(elem.nP, 1, elem.sName + " 1 point");
    strictEqual(elem.nW, 0, elem.sName + " 0 wins");
    strictEqual(elem.nD, 1, elem.sName + " 1 draw");
    strictEqual(elem.nL, 0, elem.sName + " 0 losses");
    strictEqual(elem.nGF, 2, elem.sName + " 2 goals scored");
    strictEqual(elem.nGA, 2, elem.sName + " 2 goals against");
    strictEqual(elem.nGD, 0, elem.sName + " 0 goal differential");

    throws(function() {
      elem.AddResult('2','');
    });

    throws(function() {
      elem.AddResult('','2');
    });

    throws(function() {
      elem.AddResult('','');
    });

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
    strictEqual(aRet.length, 4, "4 teams returned");
    strictEqual(_.uniq(_.pluck(aRet, 'sName')).length, 4, "4 distinct teams returned");

    _.each(aRet, function (elem) {
      strictEqual(elem.nGP, 3, elem.sName + " 3 games played");
      strictEqual(elem.nP, 3, elem.sName + " 3 points");
      strictEqual(elem.nW, 0, elem.sName + " 0 wins");
      strictEqual(elem.nD, 3, elem.sName + " 3 draws");
      strictEqual(elem.nL, 0, elem.sName + " 0 losses");
      strictEqual(elem.nGF, 0, elem.sName + " 0 goals scored");
      strictEqual(elem.nGA, 0, elem.sName + " 0 goals against");
      strictEqual(elem.nGD, 0, elem.sName + " 0 goal differential");
    });
});

test("Imcomplete Match Testing", function () {

    var aMatches = [];
    aMatches[aMatches.length] = {home: 'Serbia', homeScore: 55, away: 'Ghana'};
    aMatches[aMatches.length] = {home: 'Germany', away: 'Australia', awayScore: 47};

    var aRet = GetTeamStats(aMatches);
    strictEqual(aRet.length, 4, "4 teams returned");
    strictEqual(_.uniq(_.pluck(aRet, 'sName')).length, 4, "4 distinct teams returned");

    _.each(aRet, function (elem) {
      strictEqual(elem.nGP, 0, elem.sName + " 0 games played");
      strictEqual(elem.nP, 0, elem.sName + " 0 points");
      strictEqual(elem.nW, 0, elem.sName + " 0 wins");
      strictEqual(elem.nD, 0, elem.sName + " 0 draws");
      strictEqual(elem.nL, 0, elem.sName + " 0 losses");
      strictEqual(elem.nGF, 0, elem.sName + " 0 goals scored");
      strictEqual(elem.nGA, 0, elem.sName + " 0 goals against");
      strictEqual(elem.nGD, 0, elem.sName + " 0 goal differential");
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
    strictEqual(aRet.length, 4, "4 teams returned");
    strictEqual(_.uniq(_.pluck(aRet, 'sName')).length, 4, "4 distinct teams returned");

    _.each(aRet, function (elem) {
      strictEqual(elem.nGP, 1, elem.sName + " 1 games played");
      strictEqual(elem.nP, 1, elem.sName + " 1 points");
      strictEqual(elem.nW, 0, elem.sName + " 0 wins");
      strictEqual(elem.nD, 1, elem.sName + " 1 draws");
      strictEqual(elem.nL, 0, elem.sName + " 0 losses");
      strictEqual(elem.nGF, 0, elem.sName + " 0 goals scored");
      strictEqual(elem.nGA, 0, elem.sName + " 0 goals against");
      strictEqual(elem.nGD, 0, elem.sName + " 0 goal differential");
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
    strictEqual(aRet[0].sName, "Australia");
    strictEqual(aRet[1].sName, "Germany");
    strictEqual(aRet[2].sName, "Ghana");
    strictEqual(aRet[3].sName, "Serbia");
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
    strictEqual(aRet[0].sName, "Australia");
    strictEqual(aRet[1].sName, "Germany");
    strictEqual(aRet[2].sName, "Ghana");
    strictEqual(aRet[3].sName, "Serbia");
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
    strictEqual(aRet[0].sName, "Australia");
    strictEqual(aRet[1].sName, "Germany");
    strictEqual(aRet[2].sName, "Ghana");
    strictEqual(aRet[3].sName, "Serbia");
});
