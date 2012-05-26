var result = [];
getElements({ class: function (value) { return(value == "odd" || value =="even"); }
 }, data[0]).forEach(function (item) {

    var sHome = item.children[4].children[0].children[0].data;
    var sVis = item.children[6].children[0].children[0].data;

    var sScore = item.children[5].children[0].children[0].children[0].data;
    var aScore = sScore.split(':');
    if(aScore.length > 1) {
      var hScore = aScore[0][0];
      var vScore = aScore[1][0];
  
      result.push({homeTeam: sHome, homeScore: hScore, visScore : vScore, visTeam: sVis });
      
    }
  });
saveResult(result);
