/** @jsx React.DOM */

var TeamWithFlag = React.createClass({
  render: function () {
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

var KnockoutStage = React.createClass({
  render: function() {
    var aPairs = [
      [this.props.firstPlace[0], this.props.secondPlace[1]],
      [this.props.firstPlace[2], this.props.secondPlace[3]],
      [this.props.firstPlace[4], this.props.secondPlace[5]],
      [this.props.firstPlace[6], this.props.secondPlace[7]],

      [this.props.firstPlace[1], this.props.secondPlace[0]],
      [this.props.firstPlace[3], this.props.secondPlace[2]],
      [this.props.firstPlace[5], this.props.secondPlace[4]],
      [this.props.firstPlace[7], this.props.secondPlace[6]]
    ];

    return (<div className="panel panel-default groupcontainer">
              <div className="panel-heading">Knockout Stage</div>
              <div className="panel-body">
                {aPairs.map(function(oPair){
                  return (<ul>
                          <li><TeamWithFlag country={oPair[0]} /></li>
                          <li><TeamWithFlag country={oPair[1]} /></li>
                         </ul>)
                })}
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
