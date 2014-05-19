# coding=utf-8
#needs python2.7 to run!!

import urllib2
import re
import json
from bs4 import BeautifulSoup

opener = urllib2.build_opener()
opener.addheaders = [('User-agent', 'CupCalculatorBot/0.1')]
x = opener.open('http://www.fifa.com/worldcup/matches/index.html')
s= x.read()

#s = s.replace("&#160;", "")

soup = BeautifulSoup(s)

allmatchesdiv = soup.find("div", "matches")

matches = []

for fixturediv in allmatchesdiv.find_all('div', class_='fixture'):
    date = fixturediv.find_all('div', class_='mu-i-date')[0].get_text()
    matchtext = fixturediv.find_all('div', class_='mu-i-matchnum')[0].get_text()
    grouptext = fixturediv.find_all('div', class_='mu-i-group')[0].get_text()

    matchnum = re.search('Match (\d+)', matchtext).groups()[0]

    if int(matchnum) > 48:
      break

    groupid = re.search('Group (\w+)', grouptext).groups()[0]

    homediv = fixturediv.find_all('div', class_='home')[0]
    awaydiv = fixturediv.find_all('div', class_='away')[0]

    home = homediv.find_all('span', class_='t-nText')[0].get_text()
    away = awaydiv.find_all('span', class_='t-nText')[0].get_text()

    matches.append({
      'date': date,
      'group': groupid,
      'matchnum': matchnum,
      'away': away,
      'home': home
    })

    #print date, matchnum, groupid, home, away

print json.dumps(matches)
