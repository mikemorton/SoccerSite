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
    var aTeams = _.map(_.uniq(_.pluck(aMatches, 'homeTeam')), function (name) {
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

    return aTeams;
}

function UpdateGroup(sGroupID)
{ 
  var bHasEmptyMatch = false;
  var aIds = new Array(); 

  $('#' + sGroupID + ' .teamrow').each(function (i){
      aIds[i] = this.id;
      dt[this.id] = [0, 0, 0, 0, 0, 0, 0, 0];
    });

  $('#' + sGroupID + ' .match').each(function (i){
      var hScore = this.childNodes[1].childNodes[2].value;
      var vScore = this.childNodes[3].childNodes[2].value;

      if(hScore.length == 0 || vScore.length==0){
	bHasEmptyMatch = true;
      }
      else {
	hScore = parseInt(hScore);
	vScore = parseInt(vScore);

	var hId = this.childNodes[1].className;
	var vId = this.childNodes[3].className;
	
	// [nPlayed, nWins, nDraws, nLosses, nGF, nGA, nGD, nPoints];

	dt[hId][0]+=1;
	dt[vId][0]+=1;

	if(hScore > vScore) {
	  // home won
	  dt[hId][1]+=1;
	  dt[vId][3]+=1;	  

	  dt[hId][7] += 3;
	  
	}
	else if(vScore > hScore) {
	  // visitor won
	  dt[hId][3]+=1;
	  dt[vId][1]+=1;

	  dt[vId][7] += 3;
	}
	else {
	  // draw
	  dt[hId][2]+=1;
	  dt[vId][2]+=1;

	  dt[hId][7] += 1;
	  dt[vId][7] += 1;
	}
	
	dt[hId][4] += hScore;
	dt[vId][4] += vScore;
	
	dt[hId][5] += vScore;
	dt[vId][5] += hScore;

	dt[hId][6] += hScore - vScore;
	dt[vId][6] += vScore - hScore;
	
      }

    });

  $('#' + sGroupID + ' .teamrow').each(function (i){
      this.childNodes[1].innerHTML = dt[this.id][0];
      this.childNodes[2].innerHTML = dt[this.id][1];
      this.childNodes[3].innerHTML = dt[this.id][2];
      this.childNodes[4].innerHTML = dt[this.id][3];
      this.childNodes[5].innerHTML = dt[this.id][4];
      this.childNodes[6].innerHTML = dt[this.id][5];
      this.childNodes[7].innerHTML = dt[this.id][6];
      this.childNodes[8].innerHTML = dt[this.id][7];
    });
  
  var i;
  for(i=1; i<4; i++){

    var iStart = i;
    var j;
    for(j=i-1; j >=0; j--){
      if(TeamCompare(aIds[iStart], aIds[j]) > 0) {
	
	$("#" + aIds[iStart]).insertBefore($('#' + aIds[j]));
	
	Swap(aIds, iStart, j);
	
	iStart--;
      }
      else
	break;
    }
  }

  $('#'+sGroupID+' .lots').hide();
  $('#'+sGroupID+' td:has(select)').hide();
  $('#'+sGroupID+' select').hide();  

  if(bHasEmptyMatch) {
    UpdateTree(sGroupID + 'w', aIds[0]);
    UpdateTree(sGroupID + 'r', aIds[1]);
    return;
  }

  var aTied = new Array();

  // Get tied teams
  for(i=3; i>=1; i--){
    if(TeamCompare(aIds[i], aIds[i-1]) == 0){
      aTied[i] = true;
    }
    else{
      aTied[i] = false;
    }
  }
  
  if(aTied[3] && aTied[2] && aTied[1]){
    // can't break!
    $('#'+sGroupID+' .lots').show();
    $('#'+sGroupID+' td:has(select)').show();
    $('#'+sGroupID+' select').show();
  }
  else if(aTied[3] && aTied[2]) {
    // bottom three
    if(!BreakThreeWay(aIds, 1, 2, 3)) {
      $('#'+sGroupID+' .lots').show();
      $('#'+sGroupID+' td:has(select)').show();
      $('#'+aIds[3]+' select').show();
      $('#'+aIds[2]+' select').show();
      $('#'+aIds[1]+' select').show();
    }
  }
  else if(aTied[2] && aTied[1]) {
    // top three
    if(!BreakThreeWay(aIds, 0, 1, 2)) {
      $('#'+sGroupID+' .lots').show();
      $('#'+sGroupID+' td:has(select)').show();
      $('#'+aIds[0]+' select').show();
      $('#'+aIds[2]+' select').show();
      $('#'+aIds[1]+' select').show();
    }
  }
  else {
    // bottom 2
    if(aTied[3]){
      if(!BreakTwoWay(aIds, 2, 3)) {
	$('#'+sGroupID+' .lots').show();
	$('#'+sGroupID+' td:has(select)').show();
	$('#'+aIds[3]+' select').show();
	$('#'+aIds[2]+' select').show();
      }
    }
    if(aTied[2]){
      // middle 2
      if(!BreakTwoWay(aIds, 1, 2)){
	$('#'+sGroupID+' .lots').show();
	$('#'+sGroupID+' td:has(select)').show();
	$('#'+aIds[2]+' select').show();
	$('#'+aIds[1]+' select').show();
      }
    }
    if(aTied[1]){
      // top 2
      if(!BreakTwoWay(aIds, 0, 1)) {
	$('#'+sGroupID+' .lots').show();
	$('#'+sGroupID+' td:has(select)').show();
	$('#'+aIds[0]+' select').show();
	$('#'+aIds[1]+' select').show();
      }
    }
  }
  
  for(i=1; i<4; i++){

    var iStart = i;
    var j;
    for(j=i-1; j >=0; j--){
      if(TeamCompare(aIds[iStart], aIds[j]) == 0 &&
	 LotsCompare(aIds[iStart], aIds[j]) > 0){
	
	$("#" + aIds[iStart]).insertBefore($('#' + aIds[j]));
	
	Swap(aIds, iStart, j);
	
	iStart--;
      }
      else
	break;
    }
  }

  UpdateTree(sGroupID + 'w', aIds[0]);
  UpdateTree(sGroupID + 'r', aIds[1]);
}

function BreakTwoWay(aIds, i1, i2)
{
  var ret = false
  $('.match:has(.' + aIds[i1] + '):has(.' + aIds[i2]+ ')').each(function (i){
      var hScore = parseInt(this.childNodes[1].childNodes[2].value);
      var vScore = parseInt(this.childNodes[3].childNodes[2].value);
      
      if (hScore == vScore)
	// draw
	ret = false;
      else {
	if(this.childNodes[1].className == aIds[i1]) {
	  // i1 is home
	  if (hScore < vScore) {
	    // need to move i2 above
	    $("#" + aIds[i2]).insertBefore($('#' + aIds[i1]));
	    
	    Swap(aIds, i1, i2);	    
	  }
	    
	}
	else {
	  // i2 is home
	  if(hScore > vScore) {
	    // need to move i2 above
	    $("#" + aIds[i2]).insertBefore($('#' + aIds[i1]));
	    
	    Swap(aIds, i1, i2);		    
	  }

	}
	ret = true;
      }
    });
  return ret;
}

function BreakThreeWay(aIds, i1, i2, i3)
{
  dt[aIds[i1]] = [0, 0, 0, 0, 0, 0, 0, 0];
  dt[aIds[i2]] = [0, 0, 0, 0, 0, 0, 0, 0];
  dt[aIds[i3]] = [0, 0, 0, 0, 0, 0, 0, 0];

  var ret = true;
  $('.match:has(.' + aIds[i1] + '):has(.' + aIds[i2]+ '), ' +
    '.match:has(.' + aIds[i2] + '):has(.' + aIds[i3]+ '), ' +
    '.match:has(.' + aIds[i1] + '):has(.' + aIds[i3]+ ')').each(function (i){

      var hScore = parseInt(this.childNodes[1].childNodes[2].value);
      var vScore = parseInt(this.childNodes[3].childNodes[2].value);

      var hId = this.childNodes[1].className;
      var vId = this.childNodes[3].className;

      if(hScore > vScore) {
	// home won
	dt[hId][7] += 3;
	
      }
      else if(vScore > hScore) {
	// visitor won
	dt[vId][7] += 3;
      }
      else {
	// draw
	dt[hId][7] += 1;
	dt[vId][7] += 1;
      }

      dt[hId][4] += hScore;
      dt[vId][4] += vScore;

      dt[hId][6] += hScore - vScore;
      dt[vId][6] += vScore - hScore;
    });

  // sort the teams
  var i;
  for(i=i2; i<i3+1; i++){

    var iStart = i;
    var j;
    for(j=i-1; j >=0; j--){
      var res = TeamCompare(aIds[iStart], aIds[j]);
      if(res > 0) {
	
	$("#" + aIds[iStart]).insertBefore($('#' + aIds[j]));
	
	Swap(aIds, iStart, j);
	
	iStart--;
      }
      else if(res == 0) {
	ret = false;
      }
      else
	break;
    }
  }

  return ret;
}

function LotsCompare(a, b)
{
  var va;
  var vb;
  
  $('#' + a + ' select').each(function (i){
      va = this.value;
    });
  $('#' + b + ' select').each(function (i){
      vb = this.value;
    });
  
  return va - vb;
}

function TeamCompare(a, b)
{
  if(dt[b][7] > dt[a][7])
    return -1;
  else if (dt[b][7] < dt[a][7])
    return 1;
  else {
    if(dt[b][6] > dt[a][6])
      return -1;
    else if (dt[b][6] < dt[a][6])
      return 1;
    else{
      if(dt[b][4] > dt[a][4])
	return -1;
      else if (dt[b][4] < dt[a][4])
	return 1;
      else
	return 0;
    }
  }
}

function Swap(aArray, i1, i2)
{
  var e1 = aArray[i1];
  aArray[i1] = aArray[i2];
  aArray[i2] = e1;
}

function TeamNameToID(sName)
{
  if(sName=="Côte d'Ivoire")
    return 'Ivory_Coast';
  else
    return sName.replace(' ', '_');
}

function TeamIDToName(sID)
{
  return sID.replace('_', ' ');
}

function AddHandlers() {
  $('td:has(select)').hide();
  $('.lots').hide();  

  $("input").change(function() {
      UpdateGroup(this.parentNode.parentNode.parentNode.id);
    }).keyup(function () { 
	this.value = this.value.replace(/[^0-9\.]/g,'').substring(0,2);
      });
  
  $("select").change(function() {
      UpdateGroup(this.parentNode.parentNode.parentNode.parentNode.parentNode.id);
    });

  $('.tipable img').qtip({content:'Change the numbers below to re-rank the teams that are still tied.',show: 'mouseover',
	hide: 'mouseout'});
}

function UpdateTree(sID, sTeamID)
{
  var elem = document.getElementById(sID);
  var sName = TeamIDToName(sTeamID);

  var sNew = '<img src="images/' + sTeamID + '.png" alt="' + sName + '" /> ' + sName;

  if (elem.innerHTML.length != 0) {
    
    if(sNew != elem.innerHTML) {
      // Remove the html from the tree
      RemoveFromStage(elem.innerHTML, 'qf');
      RemoveFromStage(elem.innerHTML, 'sf');
      RemoveFromStage(elem.innerHTML, 'f');

      // Set it to sNew
      elem.innerHTML = sNew;
    }
  }
  else
    elem.innerHTML = sNew;
}

function TreeClick(elem, sDest)
{
  var dest = document.getElementById(sDest);

  dest.innerHTML = elem.innerHTML;
}

function EndClick(wId, wDest, lId, lDest)
{
  document.getElementById(wDest).innerHTML = document.getElementById(wId).innerHTML;
  document.getElementById(lDest).innerHTML = document.getElementById(lId).innerHTML;
}

function RemoveById(sId, sStage)
{
  var elem = document.getElementById(sId);

  RemoveFromStage(elem.innerHTML, sStage);
}

function RemoveFromStage(sHTML, sStage)
{
  $('.' + sStage + ' div').each(function(i) {
      if(this.innerHTML == sHTML)
	this.innerHTML = '';

    });

  if(sStage == 'f') {
    $('#first, #second, #third, #fourth').each (function(i) {
	if(this.innerHTML == sHTML)
	  this.innerHTML = '';
      });
  }

  if(sStage == 'qf') {
    RemoveFromStage(sHTML, 'sf');
  }
  else if (sStage == 'sf') {
    RemoveFromStage(sHTML, 'f');
  }
}

function UpdateAllGroups(){

  UpdateGroup('groupA');
  UpdateGroup('groupB');
  UpdateGroup('groupC');
  UpdateGroup('groupD');
  UpdateGroup('groupE');
  UpdateGroup('groupF');
  UpdateGroup('groupG');
  UpdateGroup('groupH');
  
  $('.komatch div').hover(
    function () {
      if(this.innerHTML.length > 0)
	$(this).addClass("hoveredmatch");
    },
    function () {
      $(this).removeClass("hoveredmatch");
    }); 
}
