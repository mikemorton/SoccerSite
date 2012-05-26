import HTMLParser
import datetime

class CupHTML(HTMLParser.HTMLParser):

      def __init__(self, *args, **kwargs):
            HTMLParser.HTMLParser.__init__(self) 
            self.stack = []
            self.inMatch = False
            self.row = 0
            self.cell = 0
            self.match = dict()
            self.matches = list()
            self.groups = list()
            
      def handle_starttag(self, tag, attrs):
            self.stack.append(tag)
            
            if tag == "table" and (self.attr_val(attrs, 'class') == 'vevent'):
                  #print "STARTING MATCH"
                  self.inMatch = True
                  self.row = 0
                  self.cell = 0

            if self.inMatch:
                  if tag == "tr":
                        self.row += 1
                        self.cell = 0
                  elif tag == "td" or tag == "th":
                        self.cell += 1
                        

            #print "Encountered the beginning of a %s tag" % tag

      def handle_endtag(self, tag):
            self.stack.pop()

            #print tag
            if tag == "table" and self.inMatch:
                  self.matches.append(self.match)
                  #print "LEAVING MATCH"
                  self.match = dict()
                  self.inMatch = False

            #print "Encountered the end of a %s tag" % tag

      def handle_data(self, data):
            if len(self.stack) == 0:
                  return
            if self.stack[-1] == "span" and self.stack[-2] == "h3":
                  self.groups.append( data )
            elif self.inMatch and self.row==1:
                  #print " in match"
                  #print self.cell, len(data), data
                  if len(data.strip()) == 0:
                        return
                  
                  if self.cell == 1 and 'date' not in self.match:
                        self.match['date'] = datetime.datetime.strptime(data,'%d %B %Y')
                  elif self.cell == 2 and 'home' not in self.match:
                        self.match['home'] = data
                  elif self.cell == 3 and 'score' not in self.match:
                        self.match['score'] = data
                  elif self.cell == 4 and 'away' not in self.match:
                        self.match['away'] = data
                        

      def handle_startendtag(self, data, attrs):
            if self.inMatch and self.row==1:
                  if self.cell == 2:
                        self.match['hflag'] = self.attr_val(attrs, 'alt')
                  elif self.cell == 4:
                        self.match['vflag'] = self.attr_val(attrs, 'alt')


      def attr_val(self, attrs, at):
            for (x,y) in attrs:
                  if x == at:
                        return y
            return ''
            
      def getHTML(self):
            
            groups = list()

            html = ''
            for i,g in enumerate(self.groups):
                  group = dict()
                  group['name'] = g
                  group['matches'] = self.matches[i*12:i*12 +12]
                  group['teams'] = list()

                  for match in group['matches'][:2]:
                        team = dict()
                        team['name'] = match['home']
                        team['flag'] = match['hflag']
                        group['teams'].append( team)

                        team = dict()
                        team['name'] = match['away']
                        team['flag'] = match['vflag']
                        group['teams'].append(team)

                  groups.append(group)
                  

            for group in groups:
                  groupname = group['name'].replace(' ', '').lower()
                  groupid = 'group' + group['name'].split()[1]
                  html += """
<div class="group">
  <a name="%s"></a>
  <h1 class="groupheader">%s</h1>
<div id="%s">
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
""" % (groupname, group['name'], groupid)
                  
                  for team in group['teams']:
                        safename = team['name'].replace(' ', '_').replace('.','_')
                        safeflag = team['flag'].replace(' ', '_').replace('.','_')
                        html += """
        <tr class="teamrow" id="%s"><td class="teamname">
	    <img src="images/%s.png" alt="%s" /> %s</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td>
        </tr>""" % (safename, safeflag, team['flag'], team['name'])

                  html += """    </tbody>\n    </table>"""

                  for match in group['matches']:
                        
                        safehomeflag = match['hflag'].replace(' ', '_').replace('.','_')
                        safeawayflag = match['vflag'].replace(' ', '_').replace('.','_')
                        
                        safehome = match['home'].replace(' ', '_').replace('.','_')
                        safeaway = match['away'].replace(' ', '_').replace('.','_')

                        date = datetime.datetime.strftime(match['date'],'%Y-%m-%d')

                        html += """
    <div class="match">%s <span class="%s"><img src="images/%s.png" alt="%s" /> %s <input size="2" type="text" /></span> vs. <span class="%s"><img src="images/%s.png" alt="%s" /> %s <input size="2" type="text" /></span>
    </div>""" % (date, safehome, safehomeflag, match['hflag'], match['home'], safeaway, safeawayflag, match['vflag'], match['away'])

                  html += """</div>\n</div>"""

            return html
                  
                  

                  
                  
                         
