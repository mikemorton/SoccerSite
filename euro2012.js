var dt = {};
$(document).ready(function() {
  $(".match input").change(function() {
	UpdateGroup($(this).closest('.group').attr('id'));
    })
    .keyup(function () { 
	this.value = this.value.replace(/[^0-9\.]/g,'').substring(0,2);
      });
  
  $('.group').each(function () {
      UpdateGroup(this.id);
    });
    
  $('.qf span').click(function () {
      var $elem = $(this);
      if($elem.html().length == 0)
	return;

      var index = $('.qf div').index($elem.parent());

      $('.sf span').eq(index).html($elem.html());
    });

  $('.sf span').click(function () {
      var $elem = $(this);
      if($elem.html().length == 0)
	return;

      var index = $('.sf div').index($elem.parent());

      $('.final span').eq(index).html($elem.html());
    });  

  $('.final span').click(function () {
      var $elem = $(this);
      if($elem.html().length == 0)
	return;
    });  
});

function UpdateGroup(sGroupID) { 
  var bHasEmptyMatch = false;
  var aIds = new Array(); 

  $('#' + sGroupID + ' .teamrow').each(function (i){
      aIds[i] = this.id;
      dt[this.id] = [0, 0, 0, 0, 0, 0, 0, 0];
    });

  $('#' + sGroupID + ' .match').each(function (i){
      var hScore = $(this).find('input:eq(1)').val();
      var vScore = $(this).find('input:eq(0)').val();

      if(hScore.length == 0 || vScore.length==0){
	bHasEmptyMatch = true;
      }
      else {
	hScore = parseInt(hScore);
	vScore = parseInt(vScore);

	var hId = $(this).find('span:eq(1)').attr('rel');
	var vId = $(this).find('span:eq(0)').attr('rel');
	
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
      $(this).find('td:eq(1)').text(dt[this.id][0]);
      $(this).find('td:eq(2)').text(dt[this.id][1]);
      $(this).find('td:eq(3)').text(dt[this.id][2]);
      $(this).find('td:eq(4)').text(dt[this.id][3]);
      $(this).find('td:eq(5)').text(dt[this.id][4]);
      $(this).find('td:eq(6)').text(dt[this.id][5]);
      $(this).find('td:eq(7)').text(dt[this.id][6]);
      $(this).find('td:eq(8)').text(dt[this.id][7]);
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

  /*
  if(bHasEmptyMatch) {
    return;
  }
  */
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
  
  if(aTied[3] && aTied[2] && aTied[1]){ // can't break!
  }
  else if(aTied[3] && aTied[2]) // bottom three
    BreakThreeWay(aIds, 1, 2, 3);
  else if(aTied[2] && aTied[1]) // top three
    BreakThreeWay(aIds, 0, 1, 2);
  else {

    if(aTied[3]) // bottom 2
      BreakTwoWay(aIds, 2, 3);

    if(aTied[2]) // middle 2
      BreakTwoWay(aIds, 1, 2);

    if(aTied[1]) // top 2
      BreakTwoWay(aIds, 0, 1);
  }

  // Update Tree
  $('.first[rel="' + sGroupID + '"]').html($('#' + sGroupID + ' .teamname:eq(0)').html());
  $('.second[rel="' + sGroupID + '"]').html($('#' + sGroupID + ' .teamname:eq(1)').html());
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

function TeamNameToID(sName) {
  return sName.replace(' ', '_');
}

function TeamIDToName(sID) {
  return sID.replace('_', ' ');
}

