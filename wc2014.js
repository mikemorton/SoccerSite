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
    }
}

function GetTeamStats(aMatches) {
    // Get list of teams
    var aTeams = _.map(_.uniq(_.union(_.pluck(aMatches, 'homeTeam'), _.pluck(aMatches, 'awayTeam'))), function (name) {
	return new Team(name);
    });

    var mTeams = _.object(_.map(aTeams, function(oTeam) {
	return [oTeam.sName, oTeam]
    }));

    _.each(aMatches, function(oMatch) {
	if(typeof oMatch.homeScore !== 'undefined' && typeof oMatch.awayScore !== 'undefined') {
	    mTeams[oMatch.homeTeam].AddResult(oMatch.homeScore, oMatch.awayScore);
	    mTeams[oMatch.awayTeam].AddResult(oMatch.awayScore, oMatch.homeScore);
	}
    });
    
    return aTeams.sort(TeamCompare);
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