/** @jsx React.DOM */

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
              <div className="col-xs-3">{this.props.away}</div>
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

              <div className="col-xs-3">{this.props.home}</div>
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

    return (<table className="table">
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
                          <td>{oTeam.sName}</td>
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

    return (<div className="container groupcontainer">
              <h2>Group {this.props.name}</h2>
              <GroupResultsTable orderedTeams={this.props.orderedTeams}/>
              <div className="container matchcontainer">
                {this.props.matches.map(function(oMatch) {
                  return <Match
                          key={oMatch.hash}
                          home={oMatch.home}
                          away={oMatch.away}
                          onScoreUpdate={that.handleScoreChange}
                         />
                })}
              </div>
            </div>);
  }
});

var KnockoutStage = React.createClass({
  render: function() {

    return (<div><h1>this is the knockout tree</h1></div>);
  }
});

var WorldCup = React.createClass({
  getInitialState: function () {
    // aMatches is a global from matchdata.js
    return {allMatches:aMatches};
  },
  onScoreUpdate: function(matchkey, awayScore, homeScore) {
    var newArray = this.state.allMatches.slice();
    var oMatch = _.findWhere(newArray, {hash: matchkey});

    oMatch.awayScore = awayScore;
    oMatch.homeScore = homeScore;

    this.setState({allMatches:newArray});
  },
  render: function() {
    var that = this;
    var groups = [];
    var oGroups = _.groupBy(this.state.allMatches, 'group');

    _.map(oGroups, function(matches, groupID) {
      var aOrderedTeams = GetGroupOrder(matches);
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
              <KnockoutStage />
            </div>);
  }
});

React.renderComponent(<WorldCup/>, document.getElementById('soccerroot'));
