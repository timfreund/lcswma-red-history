#!/usr/bin/python3

import re
from urllib.error import URLError, HTTPError
from urllib.request import urlopen

METADATA_URL = 'http://www.lcswma.org/dashboard/js/functions.js'
DATA_URL = 'http://www.lcswma.org/dashboard/getfile.cfm'

def fetch_metadata():
    key_re = re.compile("(?<=span#).*(?='\).html)")
    idx_re = re.compile("[0-9]+")

    functionsjs = urlopen(METADATA_URL)
    for line in functionsjs.readlines():
        line = str(line)
        if line.count('.html(theValues'):
            key = key_re.search(line).group(0).replace("\\", "")
            idx = idx_re.search(line).group(0)
            print("%s :: %s" % (key, idx))

if __name__ == '__main__':
    fetch_metadata()
