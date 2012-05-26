import urllib2
from xml.dom import minidom

opener = urllib2.build_opener()
opener.addheaders = [('User-agent', 'CupCalculatorBot/0.1')]
x = opener.open('http://en.wikipedia.org/w/index.php?title=UEFA_Euro_2012_schedule&printable=yes')
s= x.read()
"""
from CupHTML import CupHTML

parser = CupHTML()

parser.feed(s)

print parser.getHTML()
"""
print s
