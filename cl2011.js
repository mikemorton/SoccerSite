function Record ()
{
  this.Played = 0;
  this.Wins = 0;
  this.Draws = 0;
  this.Losses = 0;
  this.Goals = 0;
  this.Against = 0;
  this.Points = 0;
}

function Team (sID)
{
  this.ID = sID;
  this.Away = new Record();
  this.Home = new Record();

  this.Played = function() {
    return this.Home.Played + this.Away.Played;
  };

  this.Wins = function () {
    return this.Home.Wins + this.Away.Wins;
  };

  this.Draws = function () {
    return this.Home.Draws + this.Away.Draws;
  };

  this.Losses = function () {
    return this.Home.Losses + this.Away.Losses;
  };

  this.Goals = function () {
    return this.Home.Goals + this.Away.Goals;
  };

  this.Against = function () {
    return this.Home.Against + this.Away.Against;
  };

  this.GoalDifference = function () {
    return this.Goals() - this.Against();
  };

  this.Points = function () {
    return this.Home.Points + this.Away.Points;
  };
}

function UpdateGroup(sGroupID)
{ 
  var aIds = new Array(); 
  var dt = new Object();

  $('#' + sGroupID + ' .teamrow').each(function (i){
      aIds[i] = this.id;
      dt[this.id] = new Team(this.id);
    });

  var bHasEmptyMatch = GetAllMatches(dt, '#' + sGroupID + ' .match')
   
  $('#' + sGroupID + ' .teamrow').each(function (i){
      this.childNodes[1].innerHTML = dt[this.id].Played();
      this.childNodes[2].innerHTML = dt[this.id].Wins();
      this.childNodes[3].innerHTML = dt[this.id].Draws();
      this.childNodes[4].innerHTML = dt[this.id].Losses();
      this.childNodes[5].innerHTML = dt[this.id].Goals();
      this.childNodes[6].innerHTML = dt[this.id].Against();
      this.childNodes[7].innerHTML = dt[this.id].GoalDifference();
      this.childNodes[8].innerHTML = dt[this.id].Points();
    });
  
  // Sort all teams by points
  var i;
  for(i=1; i<4; i++){
    var iStart = i;
    var j;
    for(j=i-1; j >=0; j--){
      if(dt[aIds[iStart]].Points() > dt[aIds[j]].Points()) {
	
	$("#" + aIds[iStart]).insertBefore($('#' + aIds[j]));
	
	Swap(aIds, iStart, j);
	
	iStart--;
      }
      else
	break;
    }
  }
  
  var aTied = new Array();

  // Get tied teams
  for(i=3; i>=1; i--){
    if(dt[aIds[i]].Points() == dt[aIds[i-1]].Points()){
      aTied[i] = true;
    }
    else{
      aTied[i] = false;
    }
  }
  
  if(aTied[3] && aTied[2] && aTied[1]){
    // all four

    // Sort all teams, properly this time
    var i;
    for(i=1; i<4; i++){
      var iStart = i;
      var j;
      for(j=i-1; j >=0; j--){
	var res = TeamCompare(dt, aIds[iStart], aIds[j], true)
	if(res > 0) {
	  
	  $("#" + aIds[iStart]).insertBefore($('#' + aIds[j]));
	  
	  Swap(aIds, iStart, j);
	  
	  iStart--;
	}
	else
	  break;
      }
    }
    
    // Get tied teams
    for(i=3; i>=1; i--){
      var res = TeamCompare(dt, aIds[i], aIds[i-1], true)
      if(res == 0){
	aTied[i] = true;
      }
      else{
	aTied[i] = false;
      }
    }

    // All are still tied.  Nothing can be done.
    if(aTied[3] && aTied[2] && aTied[1])
      return;
  }

  if(aTied[3] && aTied[2]) {
    // bottom three
    BreakThreeWay(dt, aIds, 1, 2, 3);
  }
  else if(aTied[2] && aTied[1]) {
    // top three
    BreakThreeWay(dt, aIds, 0, 1, 2);
  }
  else {
    if(aTied[3]){
      // bottom 2
      BreakTwoWay(dt, aIds, 2, 3);
    }
    if(aTied[2]){
      // middle 2
      BreakTwoWay(dt, aIds, 1, 2);
    }
    if(aTied[1]){
      // top 2
      BreakTwoWay(dt, aIds, 0, 1);
    }
  }
}

function GetMatchData(table, hId, vId, hScore, vScore)
{
  table[hId].Home.Played += 1;
  table[vId].Away.Played += 1;
  
  if(hScore > vScore) {
    // home won
    table[hId].Home.Wins += 1;
    table[vId].Away.Losses += 1;	  
    
    table[hId].Home.Points += 3;
    
  }
  else if(vScore > hScore) {
    // visitor won
    table[hId].Home.Losses += 1;
    table[vId].Away.Wins +=1;
    
    table[vId].Away.Points += 3;
  }
  else {
    // draw
    table[hId].Home.Draws += 1;
    table[vId].Away.Draws += 1;
    
    table[hId].Home.Points += 1;
    table[vId].Away.Points += 1;
  }
  
  table[hId].Home.Goals += hScore;
  table[vId].Away.Goals += vScore;
  
  table[hId].Home.Against += vScore;
  table[vId].Away.Against += hScore;
}

function GetAllMatches(dt, sSelector)
{
  var bHasEmptyMatch = false;
  $(sSelector).each(function (i){
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
	
	GetMatchData(dt, hId, vId, hScore, vScore);
      }

    });

  return bHasEmptyMatch;
}


function BreakTwoWay(allmatches, aIds, i1, i2)
{
  var smalltable = new Object();
  smalltable[aIds[i1]] = new Team(aIds[i1]);
  smalltable[aIds[i2]] = new Team(aIds[i2]);

  var ret = false;

  GetAllMatches(smalltable, '.match:has(.' + aIds[i1] + '):has(.' + aIds[i2]+ ')');

  var res = TeamCompare(smalltable, aIds[i1], aIds[i2], true);

  if(res == 0)
    res = TeamCompare(allmatches, aIds[i1], aIds[i2], false);

  if(res > 0){
    // need to move i2 above
    $("#" + aIds[i1]).insertBefore($('#' + aIds[i2]));
    
    Swap(aIds, i1, i2);
    return true;
  }
  else if (res < 0) {
    // need to move i2 above
    $("#" + aIds[i2]).insertBefore($('#' + aIds[i1]));
    
    Swap(aIds, i1, i2);	
    return true;
  }
  
  return false;
}

function BreakThreeWay(allmatches, aIds, i1, i2, i3)
{
  var smalltable = new Object();
  smalltable[aIds[i1]] = new Team(aIds[i1]);
  smalltable[aIds[i2]] = new Team(aIds[i2]);
  smalltable[aIds[i3]] = new Team(aIds[i3]);

  var ret = true;

  GetAllMatches(smalltable, '.match:has(.' + aIds[i1] + '):has(.' + aIds[i2]+ '), ' +
    '.match:has(.' + aIds[i2] + '):has(.' + aIds[i3]+ '), ' +
    '.match:has(.' + aIds[i3] + '):has(.' + aIds[i1]+ ') ');

  // sort the teams
  var i;
  for(i=i2; i<i3+1; i++){

    var iStart = i;
    var j;
    for(j=i-1; j >0; j--){
      var res = TeamCompare(smalltable, aIds[iStart], aIds[j], true);
      if(res > 0) {
	
	$("#" + aIds[iStart]).insertBefore($('#' + aIds[j]));
	
	Swap(aIds, iStart, j);
	
	iStart--;
      }
      else if(res < 0) {
	break;
      }
    }
  }
  
  // see if two teams are still tied
  var tied1 = (TeamCompare(smalltable, aIds[i1], aIds[i2], true) == 0);
  var tied2 = (TeamCompare(smalltable, aIds[i2], aIds[i3], true) == 0);

  if(tied1 && tied2){
    
    // sort the teams using ALL match data
    var i;
    for(i=i2; i<i3+1; i++){
      
      var iStart = i;
      var j;
      for(j=i-1; j >=0; j--){
	var res = TeamCompare(allmatches, aIds[iStart], aIds[j], false);
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
    
  }
  else if(tied1) {
    BreakTwoWay(aIds, i1, i2);
  }
  else if(tied2) {
    BreakTwoWay(aIds, i2, i3);
  }
}

function TeamCompare(table, a, b, bUseAwayGoals)
{
  if(table[b].Points() > table[a].Points())
    return -1;
  else if (table[b].Points() < table[a].Points())
    return 1;
  else {
    if(table[b].GoalDifference() > table[a].GoalDifference())
      return -1;
    else if (table[b].GoalDifference() < table[a].GoalDifference())
      return 1;
    else{
      if(table[b].Goals() > table[a].Goals())
	return -1;
      else if (table[b].Goals() < table[a].Goals())
	return 1;
      else if (!bUseAwayGoals)
	return 0;
      else {
	if(table[b].Away.Goals > table[a].Away.Goals)
	  return -1;
	else if (table[b].Away.Goals < table[a].Away.Goals)
	  return 1;
	else
	  return 0;
      }
    }
  }
}

function Swap(aArray, i1, i2)
{
  var e1 = aArray[i1];
  aArray[i1] = aArray[i2];
  aArray[i2] = e1;
}

function AddHandlers() {
  $('td:has(select)').hide();
  $('.lots').hide();  

  $("input").change(function() {
      UpdateGroup(this.parentNode.parentNode.parentNode.id);
    }).keyup(function () { 
	this.value = this.value.replace(/[^0-9\.]/g,'').substring(0,2);
      });
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
}
