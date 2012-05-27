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
<meta name="google-site-verification" content="RmO7AhigTPyQPH0l3WALbY8uNPAx6zso5jl3qUtrWpw" />
<script type="text/javascript" src="jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="euro2012.js"></script>
<link rel="stylesheet" href="euro2012.css" type="text/css" />
</head>
<body>
<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
</script>

<div class="left">

<h1>2012 UEFA Euro Cup Results Calculator</h1>
<div id="summary">
Enter some scores and the standings will update automatically.  Easily determine what it will take for your team to advance.<br />


<br />
Feedback: <a href="http://www.twitter.com/theycallmemorty">@theycallmemorty</a>
</div>

         <div>
            <div id="tweet">
             <a href="https://twitter.com/share" class="twitter-share-button" data-via="theycallmemorty">Tweet</a>
             <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>  
            </div>
            <div id="facebook" class="fb-like" data-send="false" data-layout="button_count" data-width="75" data-show-faces="true"></div>
         </div>

     <div class="bottom"><div id="adholder">
        <script type="text/javascript"><!--
        google_ad_client = "ca-pub-8524083442417803";
        /* Cup Calculator Bottom Ad */
        google_ad_slot = "8343265370";
        google_ad_width = 200;
        google_ad_height = 200;
        //-->
        </script>
        <script type="text/javascript"
        src="http://pagead2.googlesyndication.com/pagead/show_ads.js">
        </script>
     </div></div>

</div>
<div class="right">
"""
for key in keys:
    teams = list()
    teams.extend(groupmatches[key][0])
    teams.extend(groupmatches[key][1])

    print """
      <div class="group" id="%s">
         <h2>%s</h2>
""" % (key.replace(" ", "_"), key)
    OutputTable(teams)
    for match in groupmatches[key]:
        OutputMatch(match[0], match[1])

    print """
      </div>"""




print"""
<div class="tree">
<h2>Knockout Phase</h2>
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
    <span>&nbsp;</span><br />
    <span>&nbsp;</span>
  </div>
  <div>
    <span>&nbsp;</span><br />
    <span>&nbsp;</span>
  </div>
</div>

<div class="final">
  <div>
    <span>&nbsp;</span><br />
    <span>&nbsp;</span>
  </div>
</div>

</div>

</div>
<script type="text/javascript">
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-16735325-1']);
  _gaq.push(['_trackPageview']);
  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
</script>
</body>
</html>"""
