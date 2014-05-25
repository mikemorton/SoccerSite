/** @jsx React.DOM */

var TeamWithFlag = React.createClass({
  render: function () {
    if(this.props.country.length==0)
      return <span />

    var sSrc = 'images/';
    var sShort = '';

    switch(this.props.country){
    case 'Algeria':
      sSrc += 'dz.png';
      sShort = 'DZA';
      break;
    case 'Argentina':
      sSrc += 'ar.png';
      sShort = 'ARG';
      break;
    case 'Australia':
      sSrc += 'au.png';
      sShort = 'AUS';
      break;
    case 'Belgium':
      sSrc += 'be.png';
      sShort = 'BEL';
      break;
    case 'Bosnia and Herzegovina':
      sSrc += 'ba.png';
      sShort = 'BIH';
      break;
    case 'Brazil':
      sSrc += 'br.png';
      sShort = 'BRA';
      break;
    case 'Cameroon':
      sSrc += 'cm.png';
      sShort = 'CMR';
      break;
    case 'Chile':
      sSrc += 'cl.png';
      sShort = 'CHL';
      break;
    case 'Colombia':
      sSrc += 'co.png';
      sShort = 'COL';
      break;
    case 'Costa Rica':
      sSrc += 'cr.png';
      sShort = 'CRI';
      break;
    case 'Côte d\'Ivoire':
      sSrc += 'ci.png';
      sShort = 'CIV'
      break;
    case 'Croatia':
      sSrc += 'hr.png';
      sShort = 'HRV';
      break;
    case 'Ecuador':
      sSrc += 'ec.png';
      sShort = 'ECU';
      break;
    case 'England':
      sSrc += 'england.png';
      sShort = 'ENG';
      break;
    case 'France':
      sSrc += 'fr.png';
      sShort = 'FRA';
      break;
    case 'Germany':
      sSrc += 'de.png';
      sShort = 'DEU';
      break;
    case 'Ghana':
      sSrc += 'gh.png';
      sShort = 'GHA';
      break;
    case 'Greece':
      sSrc += 'gr.png';
      sShort = 'GRC';
      break;
    case 'Honduras':
      sSrc += 'hn.png';
      sShort = 'HND';
      break;
    case 'Iran':
      sSrc += 'ir.png';
      sShort = 'IRN';
      break;
    case 'Italy':
      sSrc += 'it.png';
      sShort = 'ITA';
      break;
    case 'Japan':
      sSrc += 'jp.png';
      sShort = 'JPN';
      break;
    case 'Korea Republic':
      sSrc += 'kr.png';
      sShort = 'KOR';
      break;
    case 'Mexico':
      sSrc += 'mx.png';
      sShort = 'MEX';
      break;
    case 'Netherlands':
      sSrc += 'nl.png';
      sShort = 'NLD';
      break;
    case 'Nigeria':
      sSrc += 'ng.png';
      sShort = 'NGA';
      break;
    case 'Portugal':
      sSrc += 'pt.png';
      sShort = 'PRT';
      break;
    case 'Russia':
      sSrc += 'ru.png';
      sShort = 'RUS';
      break;
    case 'Spain':
      sSrc += 'es.png';
      sShort = 'ESP';
      break;
    case 'Switzerland':
      sSrc += 'ch.png';
      sShort = 'CHE';
      break;
    case 'USA':
      sSrc += 'us.png';
      sShort = 'USA';
      break;
    case 'Uruguay':
      sSrc += 'uy.png';
      sShort = 'URY';
      break;
    default:
      break;
    }

    var sClass = 'countryWithFlag';
    if(typeof this.props.isChamp !== 'undefined' && this.props.isChamp)
      sClass += ' champion';

    return (<span className={sClass}>
              <img src={sSrc} alt={this.props.country} title={this.props.country} />
              <span className="visible-xs">{sShort}</span>
              <span className="hidden-xs">{this.props.country}</span>
            </span>);
  }
});

var Match = React.createClass({
  scoreUpdated: function () {
    this.props.onScoreUpdate(
      this.props.key,
      this.refs.awayScore.getDOMNode().value,
      this.refs.homeScore.getDOMNode().value
    );
  },
  keyDown: function (e) {
    // Don't allow negatives.  Everything else that's invalid will be correctly ignored
    if(e.keyCode == 189)
      e.preventDefault();
  },
  render: function() {

    return (<div className="row">
              <div className="col-xs-4"><TeamWithFlag country={this.props.away} /></div>
              <div className="col-xs-2">
                <input
                  type="number"
                  min="0"
                  max="99"
                  maxLength="2"
                  value={this.props.awayScore}
                  ref="awayScore"
                  onChange={this.scoreUpdated}
                  className="form-control"
                  onKeyDown={this.keyDown}
                />
              </div>

              <div className="col-xs-4"><TeamWithFlag country={this.props.home} /></div>
              <div className="col-xs-2">
                <input
                  type="number"
                  min="0"
                  max="99"
                  maxLength="2"
                  value={this.props.homeScore}
                  ref="homeScore"
                  onChange={this.scoreUpdated}
                  className="form-control"
                  onKeyDown={this.keyDown}
                 />
              </div>
      </div>);
  }
});

var GroupResultsTable = React.createClass({
  render: function() {

    return (<table className="table table-bordered">
              <tr>
                <th>Team</th>
                <th>GP</th>
                <th>W</th>
                <th>D</th>
                <th>L</th>
                <th>GF</th>
                <th>GA</th>
                <th>GD</th>
                <th>Pts</th>
              </tr>
              <tbody>
                {this.props.orderedTeams.map(function(oTeam) {
                  return <tr key={oTeam.sName}>
                          <td><TeamWithFlag country={oTeam.sName} /></td>
                          <td>{oTeam.nGP}</td>
                          <td>{oTeam.nW}</td>
                          <td>{oTeam.nD}</td>
                          <td>{oTeam.nL}</td>
                          <td>{oTeam.nGF}</td>
                          <td>{oTeam.nGA}</td>
                          <td>{oTeam.nGD}</td>
                          <td>{oTeam.nP}</td>
                         </tr>
                })}
            </tbody>
            </table>);
  }
});

var Group = React.createClass({
  handleScoreChange: function (key, awayScore, homeScore) {
    this.props.onScoreUpdate(key, awayScore, homeScore);
  },
  render: function() {
    var that = this;

    return (<div className="panel panel-default groupcontainer">
              <div className="panel-heading">Group {this.props.name}</div>
              <div className="panel-body">
                <GroupResultsTable orderedTeams={this.props.orderedTeams}/>
                <div className="container-fluid matchcontainer">
                  {this.props.matches.map(function(oMatch) {
                    return <Match
                            key={oMatch.matchnum}
                            home={oMatch.home}
                            away={oMatch.away}
                            onScoreUpdate={that.handleScoreChange}
                           />
                  })}
                </div>
              </div>
            </div>);
  }
});

var KnockoutMatch = React.createClass({
  topClicked: function() {
    this.props.winnerClicked(this.props.top, this.props.bottom, this.props.key);
  },
  bottomClicked: function() {
    this.props.winnerClicked(this.props.bottom, this.props.top, this.props.key);
  },
  render: function() {
    var aChamp = [false, false];
    if(typeof this.props.champ !== 'undefined') {
      if(this.props.top == this.props.champ)
        aChamp[0] = true;
      else if(this.props.bottom == this.props.champ)
        aChamp[1] = true;
    }

    return (<ul className="list-unstyled knockoutMatch">
              <li onClick={this.topClicked} ref="topTeam" ><TeamWithFlag country={this.props.top} isChamp={aChamp[0]} /></li>
              <li onClick={this.bottomClicked} ref="bottomTeam"><TeamWithFlag country={this.props.bottom} isChamp={aChamp[1]} /></li>
            </ul>)

  }
});

var KnockoutRound = React.createClass({
  winnerClicked: function(sWinner, sLoser, key){
    this.props.winnerClicked(sWinner, sLoser, key, this.props.round);
  },
  render: function() {
    var nCount = 0;
    var that = this;
    return (<div className="col-xs-3">
            <strong>{this.props.title}</strong>
            {this.props.aMatches.map(function (oPair) {
              return (<KnockoutMatch
                        top={oPair[0]}
                        bottom={oPair[1]}
                        key={nCount++}
                        winnerClicked={that.winnerClicked}
                        champ={that.props.champ}
                        />);
            })}
            </div>);
  }
});

var KnockoutStage = React.createClass({
  winnerClicked: function(sWinner, sLoser, key, sRound) {
    var sUpdateRound = '';
    if(sRound == '16')
      sUpdateRound = 'qf';
    else if(sRound == 'qf')
      sUpdateRound = 'sf';
    else if(sRound == 'sf')
      sUpdateRound = 'f';

    var aRound = this.state[sUpdateRound].slice();

    aRound[key] = sWinner;

    var oUpdate = {};
    oUpdate[sUpdateRound] = aRound;

    this.setState(oUpdate);
  },
  champClicked: function(sWinner, sLoser, key, sRound) {
    this.setState({
      champ: [sWinner]
    });
  },
  getInitialState: function () {
    return {
      qf:['','','','','','','',''],
      sf:['','','',''],
      f:['',''],
      champ: ['']
    };
  },
  render: function() {
    var ar16Matches = [
      [this.props.firstPlace[0], this.props.secondPlace[1]],
      [this.props.firstPlace[2], this.props.secondPlace[3]],
      [this.props.firstPlace[4], this.props.secondPlace[5]],
      [this.props.firstPlace[6], this.props.secondPlace[7]],

      [this.props.firstPlace[1], this.props.secondPlace[0]],
      [this.props.firstPlace[3], this.props.secondPlace[2]],
      [this.props.firstPlace[5], this.props.secondPlace[4]],
      [this.props.firstPlace[7], this.props.secondPlace[6]]
    ];

    var aqfMatches = [
      [this.state.qf[0],this.state.qf[1]],
      [this.state.qf[2],this.state.qf[3]],
      [this.state.qf[4],this.state.qf[5]],
      [this.state.qf[6],this.state.qf[7]]
    ];

    var asfMatches = [
      [this.state.sf[0],this.state.sf[1]],
      [this.state.sf[2],this.state.sf[3]]
    ];

    var afMatches = [
      [this.state.f[0],this.state.f[1]]
    ];

    var sChamp = this.state.champ[0];

    return (<div className="panel panel-default groupcontainer">
              <div className="panel-heading">Knockout Stage</div>
              <div className="panel-body">
                <div className="container-fluid">
                  <KnockoutRound
                    title="Round of 16"
                    aMatches={ar16Matches}
                    round="16"
                    winnerClicked={this.winnerClicked} />
                  <KnockoutRound
                    title="Quarter-finals"
                    aMatches={aqfMatches}
                    round="qf"
                    winnerClicked={this.winnerClicked} />
                  <KnockoutRound
                    title="Semi-finals"
                    aMatches={asfMatches}
                    round="sf"
                    winnerClicked={this.winnerClicked} />
                  <KnockoutRound
                    title="Final"
                    aMatches={afMatches}
                    round="f"
                    winnerClicked={this.champClicked}
                    champ={sChamp}/>
                </div>
              </div>
            </div>);
  }
});

var WorldCup = React.createClass({
  getInitialState: function () {
    // aMatches is a global from matchdata.js
    return {allMatches:aMatches};
  },
  onScoreUpdate: function(matchkey, awayScore, homeScore) {
    var newArray = this.state.allMatches.slice();
    var oMatch = _.findWhere(newArray, {matchnum: matchkey});

    oMatch.awayScore = awayScore;
    oMatch.homeScore = homeScore;

    this.setState({allMatches:newArray});
  },
  render: function() {
    var that = this;
    var groups = [];
    var oGroups = _.groupBy(this.state.allMatches, 'group');

    var aGroupWinners = [];
    var aGroupRunnersUp = [];

    _.map(oGroups, function(matches, groupID) {
      var aOrderedTeams = GetGroupOrder(matches);

      aGroupWinners.push(aOrderedTeams[0].sName);
      aGroupRunnersUp.push(aOrderedTeams[1].sName);

      groups.push(<a name={'group' + groupID.toLowerCase()} key={'anchor' + groupID}/>)
      groups.push(<Group
                    key={groupID}
                    name={groupID}
                    matches={matches}
                    orderedTeams={aOrderedTeams}
                    onScoreUpdate={that.onScoreUpdate}
                  />);
    });


    return (<div>
              {groups}
              <a name="knockoutstage" />
              <KnockoutStage firstPlace={aGroupWinners} secondPlace={aGroupRunnersUp}/>
            </div>);
  }
});

React.renderComponent(<WorldCup/>, document.getElementById('soccerroot'));
