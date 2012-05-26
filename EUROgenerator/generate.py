import urllib2
from BeautifulSoup import BeautifulSoup


def OutputTable(teams):
    print """
        <table>
          <thead>
            <tr class="teamhead">
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
          </thead>
          <tbody>
"""

    for team in teams:
        OutputTeamRow(team)

    print """
          </tbody>
        </table>"""

def OutputTeamRow(team):
    print """
            <tr class="teamrow" id="%s">
              <td class="teamname"><img src="images/%s.png" alt="%s" /> %s</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
            </tr>
""" % (team.replace(" ", "_"), team.replace(" ", "_"), team, team)


def OutputMatch(team1, team2):
    print """
        <div class="match">
          <span rel="%s"><img src="images/%s.png" alt="%s" />
          %s <input size="2" maxlength="2" type="text" /></span> vs. <span rel=
          "%s"><img src="images/%s.png" alt="%s" /> %s <input size="2" maxlength="2" type="text" /></span>
        </div>
""" % ( team1.replace(" ", "_"), team1.replace(" ", "_"), team1, team1,
        team2.replace(" ", "_"), team2.replace(" ", "_"), team2, team2)


opener = urllib2.build_opener()
opener.addheaders = [('User-agent', 'CupCalculatorBot/0.1')]
x = opener.open('http://en.wikipedia.org/w/index.php?title=UEFA_Euro_2012_schedule&printable=yes')
s= x.read()

s = s.replace("&#160;", "")
s = s.replace("Republic of ", "")
soup = BeautifulSoup(s)


table = soup.find("table", "wikitable")
curgroup = ""
groupmatches = dict()
for tr in table.findAll('tr')[1:27]:
    cells = tr.findAll('td')
    if len(cells) == 7:
        curgroup = cells[3].text
        if curgroup not in groupmatches:
            groupmatches[curgroup] = list()

        groupmatches[curgroup].append((cells[4].text, cells[6].text))

    elif len(cells) == 6:
        groupmatches[curgroup].append((cells[3].text, cells[5].text))

keys = groupmatches.keys()
keys.sort()
print """<!DOCTYPE html>
<html>
<head>
<title>UEFA Euro Cup 2012 Results Calculator</title>
<script type="text/javascript" src="jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="euro2012.js"></script>
<link rel="stylesheet" href="euro2012.css" type="text/css" />
</head>
<body>"""
for key in keys:
    teams = list()
    teams.extend(groupmatches[key][0])
    teams.extend(groupmatches[key][1])

    print """
      <div class="group" id="%s">""" % (key.replace(" ", "_"))
    OutputTable(teams)
    for match in groupmatches[key]:
        OutputMatch(match[0], match[1])

    print """
      </div>"""




print"""
<div class="tree">
<div class="qf">
  <div>
    <span rel="Group_A" class="first"></span><br />
    <span rel="Group_B" class="second"></span>
  </div>
  <div>
    <span rel="Group_C" class="first"></span><br />
    <span rel="Group_D" class="second"></span>
  </div>
  <div>
    <span rel="Group_B" class="first"></span><br />
    <span rel="Group_A" class="second"></span>
  </div>
  <div>
    <span rel="Group_D" class="first"></span><br />
    <span rel="Group_C" class="second"></span>
  </div>
</div>

<div class="sf">
  <div>
    <span></span><br />
    <span></span>
  </div>
  <div>
    <span></span><br />
    <span></span>
  </div>
</div>

<div class="final">
  <div>
    <span></span><br />
    <span></span>
  </div>
</div>

<div class="champ">
  <span></span>
</div>
</div>
</body>
</html>"""
