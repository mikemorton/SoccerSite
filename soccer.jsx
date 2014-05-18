/** @jsx React.DOM */

var Match = React.createClass({
  render: function() {

    return (<div>{this.props.away} vs. {this.props.home}</div>);
  }
});

var GroupResultsTable = React.createClass({
  render: function() {
    var teams = [];

    _.each(this.props.orderedTeams, function(oTeam){
      teams.push(<tr>
                  <td>{oTeam.sName}</td>
                  <td>{oTeam.nGP}</td>
                  <td>{oTeam.nW}</td>
                  <td>{oTeam.nD}</td>
                  <td>{oTeam.nL}</td>
                  <td>{oTeam.nGF}</td>
                  <td>{oTeam.nGA}</td>
                  <td>{oTeam.nGD}</td>
                  <td>{oTeam.nP}</td>
                 </tr>);
    });

    return (<table>
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
              {teams}
            </table>);
  }
});

var Group = React.createClass({
  render: function() {
    var matches = [];

    _.each(this.props.matches, function(oMatch) {
      matches.push(<Match home={oMatch.home} away={oMatch.away} />);
    });

    return (<div>
              <h1>Group {this.props.name}</h1>
              <GroupResultsTable orderedTeams={GetGroupOrder(this.props.matches)}/>
              {matches}
            </div>);
  }

});

var KnockoutStage = React.createClass({
  render: function() {

    return (<div><h1>this is the knockout tree</h1></div>);
  }
});

var WorldCup = React.createClass({
  render: function() {
    var groups = [];
    var oGroups = _.groupBy(this.props.allMatches, 'group');
    _.map(oGroups, function(matches, groupID) {
      groups.push(<Group name={groupID} matches={matches} />);
    });


    return (<div>
              {groups}
              <KnockoutStage />
            </div>);
  }
});

React.renderComponent(<WorldCup allMatches={aMatches}/>, document.getElementById('soccerroot'));
