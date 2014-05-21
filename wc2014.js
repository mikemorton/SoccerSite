function Team(name) {

  this.sName = name;
  this.nGP = 0;
  this.nP = 0;
  this.nW = 0;
  this.nD = 0;
  this.nL = 0;
  this.nGF = 0;
  this.nGA = 0;
  this.nGD = 0;

  this.AddResult = function (nScored, nAgainst) {
    nScored = parseInt(nScored);
    nAgainst = parseInt(nAgainst);

    if(isNaN(nScored))
      throw "nScored must be a number";

    if(isNaN(nAgainst))
      throw "nAgainst must be a number";

    this.nGP++;
    this.nGF = this.nGF + nScored;
    this.nGA = this.nGA + nAgainst;

    this.nGD = this.nGF - this.nGA;

    if(nScored > nAgainst)
      this.nW++;
    else if(nScored == nAgainst)
      this.nD++;
    else
      this.nL++;

    this.nP = this.nW * 3 + this.nD;
  };
}

function GetGroupOrder(aMatches) {
    var aSorted = [];
    var aTeams = GetTeamStats(aMatches).sort(TeamCompare);

    var aTied = [false, false, false];
    aTied[0] = TeamCompare(aTeams[0], aTeams[1]) === 0;
    aTied[1] = TeamCompare(aTeams[1], aTeams[2]) === 0;
    aTied[2] = TeamCompare(aTeams[2], aTeams[3]) === 0;

    if(aTied[0] && aTied[1] && aTied[2]) {
      // Nothing can be done, sort alphabetically
      aTeams = aTeams.sort(AlphaCompare);
    }
    else if (aTied[0] && aTied[1]) {
      // Top 3 tied
      aSorted = GetTeamStats(FilterMatchesForTeams(aMatches,
        [aTeams[0].sName, aTeams[1].sName, aTeams[2].sName])).sort(TeamCompare);

      aSorted[3] = aTeams[3];

      aTeams = SubTrueStatsForFilteredStats(aSorted, aTeams);
    }
    else if (aTied[1] && aTied[2]) {
      // Bottom 3 tied
      aSorted = GetTeamStats(FilterMatchesForTeams(aMatches,
        [aTeams[1].sName, aTeams[2].sName, aTeams[3].sName])).sort(TeamCompare);

      aSorted.splice(0, 0, aTeams[0]);

      aTeams = SubTrueStatsForFilteredStats(aSorted, aTeams);
    }
    else {
      if(aTied[0]) {
        // First Two
        aSorted = GetTeamStats(FilterMatchesForTeams(aMatches,
          [aTeams[0].sName, aTeams[1].sName])).sort(TeamCompare);

        aSorted[2] = aTeams[2];
        aSorted[3] = aTeams[3];

        aTeams = SubTrueStatsForFilteredStats(aSorted, aTeams);
      }
      if(aTied[1]) {
        // Second Two
        aSorted = GetTeamStats(FilterMatchesForTeams(aMatches,
          [aTeams[1].sName, aTeams[2].sName])).sort(TeamCompare);

        aSorted.splice(0, 0, aTeams[0]);
        aSorted[3] = aTeams[3];

        aTeams = SubTrueStatsForFilteredStats(aSorted, aTeams);
      }
      if(aTied[2]) {
        // Last Two
        aSorted = GetTeamStats(FilterMatchesForTeams(aMatches,
          [aTeams[2].sName, aTeams[3].sName])).sort(TeamCompare);

        aSorted.splice(0, 0, aTeams[0], aTeams[1]);

        aTeams = SubTrueStatsForFilteredStats(aSorted, aTeams);
      }
    }

    return aTeams;
}

function GetTeamStats(aMatches) {
  // Get list of teams
  var aTeams = _.map(_.uniq(_.union(_.pluck(aMatches, 'home'), _.pluck(aMatches, 'away'))), function (name) {
    return new Team(name);
  });

  var mTeams = _.object(_.map(aTeams, function(oTeam) {
    return [oTeam.sName, oTeam];
  }));

  _.each(aMatches, function(oMatch) {
    if(typeof oMatch.homeScore !== 'undefined' && typeof oMatch.awayScore !== 'undefined' &&
        !isNaN(parseInt(oMatch.homeScore)) && !isNaN(parseInt(oMatch.awayScore))) {
      mTeams[oMatch.home].AddResult(oMatch.homeScore, oMatch.awayScore);
      mTeams[oMatch.away].AddResult(oMatch.awayScore, oMatch.homeScore);
    }
  });

  return aTeams;
}

function FilterMatchesForTeams(aMatches, aTeams) {
  return _.filter(aMatches, function (oMatch) {
    return _.contains(aTeams, oMatch.home) && _.contains(aTeams, oMatch.away);
  });
}

function SubTrueStatsForFilteredStats(aFilteredStats, aTrueStats) {

  return [_.findWhere(aTrueStats, {sName: aFilteredStats[0].sName}),
          _.findWhere(aTrueStats, {sName: aFilteredStats[1].sName}),
          _.findWhere(aTrueStats, {sName: aFilteredStats[2].sName}),
          _.findWhere(aTrueStats, {sName: aFilteredStats[3].sName})];
}

function TeamCompare(oTeam1, oTeam2) {
  if(oTeam1.nP == oTeam2.nP) {
    if(oTeam1.nGF == oTeam2.nGF) {
      return oTeam2.nGD - oTeam1.nGD;
    }
    else return oTeam2.nGF - oTeam1.nGF;
  }
  else return oTeam2.nP - oTeam1.nP;
}

function AlphaCompare(oTeam1, oTeam2) {
  return oTeam1.sName.localeCompare(oTeam2.sName);
}
