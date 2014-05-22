/** @jsx React.DOM */

var TeamWithFlag = React.createClass({
  render: function () {
    if(this.props.country.length==0)
      return <span />

    var sSrc = 'images/';

    switch(this.props.country){
    case 'Algeria':
      sSrc += 'dz.png';
      break;
    case 'Argentina':
      sSrc += 'ar.png';
      break;
    case 'Australia':
      sSrc += 'au.png';
      break;
    case 'Belgium':
      sSrc += 'be.png';
      break;
    case 'Bosnia and Herzegovina':
      sSrc += 'ba.png';
      break;
    case 'Brazil':
      sSrc += 'br.png';
      break;
    case 'Cameroon':
      sSrc += 'cm.png';
      break;
    case 'Chile':
      sSrc += 'cl.png';
      break;
    case 'Colombia':
      sSrc += 'co.png';
      break;
    case 'Costa Rica':
      sSrc += 'cr.png';
      break;
    case 'Côte d\'Ivoire':
      sSrc += 'ci.png';
      break;
    case 'Croatia':
      sSrc += 'hr.png';
      break;
    case 'Ecuador':
      sSrc += 'ec.png';
      break;
    case 'England':
      sSrc += 'england.png';
      break;
    case 'France':
      sSrc += 'fr.png';
      break;
    case 'Germany':
      sSrc += 'de.png';
      break;
    case 'Ghana':
      sSrc += 'gh.png';
      break;
    case 'Greece':
      sSrc += 'gr.png';
      break;
    case 'Honduras':
      sSrc += 'hn.png';
      break;
    case 'Iran':
      sSrc += 'it.png';
      break;
    case 'Italy':
      sSrc += 'it.png';
      break;
    case 'Japan':
      sSrc += 'jp.png';
      break;
    case 'Korea Republic':
      sSrc += 'kr.png';
      break;
    case 'Mexico':
      sSrc += 'mx.png';
      break;
    case 'Netherlands':
      sSrc += 'nl.png';
      break;
    case 'Nigeria':
      sSrc += 'ng.png';
      break;
    case 'Portugal':
      sSrc += 'pt.png';
      break;
    case 'Russia':
      sSrc += 'ru.png';
      break;
    case 'Spain':
      sSrc += 'es.png';
      break;
    case 'Switzerland':
      sSrc += 'ch.png';
      break;
    case 'USA':
      sSrc += 'us.png';
      break;
    case 'Uruguay':
      sSrc += 'uy.png';
      break;
    default:
      break;
    }

    return (<span>
              <img src={sSrc} alt={this.props.country} title={this.props.country} />
              {this.props.country}
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
  render: function() {

    return (<div className="row">
              <div className="col-xs-3"><TeamWithFlag country={this.props.away} /></div>
              <div className="col-xs-3">
                <input
                  type="text"
                  size="2"
                  value={this.props.awayScore}
                  ref="awayScore"
                  onChange={this.scoreUpdated}
                  className="form-control"
                />
              </div>

              <div className="col-xs-3"><TeamWithFlag country={this.props.home} /></div>
              <div className="col-xs-3">
                <input
                  type="text"
                  size="2"
                  value={this.props.homeScore}
                  ref="homeScore"
                  onChange={this.scoreUpdated}
                  className="form-control"
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
                <div className="container matchcontainer">
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
    return (<ul>
              <li onClick={this.topClicked} ref="topTeam" ><TeamWithFlag country={this.props.top} /></li>
              <li onClick={this.bottomClicked} ref="bottomTeam"><TeamWithFlag country={this.props.bottom} /></li>
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
    return (<div>
            {this.props.aMatches.map(function (oPair) {
              return (<KnockoutMatch
                        top={oPair[0]}
                        bottom={oPair[1]}
                        key={nCount++}
                        winnerClicked={that.winnerClicked}
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

    aRound[key%2] = sWinner;

    var oUpdate = {};
    oUpdate[sUpdateRound] = aRound;
    
    this.setState(oUpdate);
  },
  getInitialState: function () {
    return {
      qf:['','','','','','','',''],
      sf:['','','',''],
      f:['',''],
      tp:['','']
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

    return (<div className="panel panel-default groupcontainer">
              <div className="panel-heading">Knockout Stage</div>
              <div className="panel-body">
                <KnockoutRound aMatches={ar16Matches} round="16" winnerClicked={this.winnerClicked} />
                <KnockoutRound aMatches={aqfMatches} round="qf" winnerClicked={this.winnerClicked} />
                <KnockoutRound aMatches={asfMatches} round="sf" winnerClicked={this.winnerClicked} />
                <KnockoutRound aMatches={afMatches} round="f" />
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
              <KnockoutStage firstPlace={aGroupWinners} secondPlace={aGroupRunnersUp}/>
            </div>);
  }
});

React.renderComponent(<WorldCup/>, document.getElementById('soccerroot'));
