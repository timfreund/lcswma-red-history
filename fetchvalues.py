#!/usr/bin/python3

import re
from urllib.error import URLError, HTTPError
from urllib.request import urlopen

METADATA_URL = 'http://www.lcswma.org/dashboard/js/functions.js'
DATA_URL = 'http://www.lcswma.org/dashboard/getfile.cfm'

def fetch_data(metadata):
    data = urlopen(DATA_URL)
    data = str(data.read())

    values = data.split("<br>")
    date = values[0]
    time = values[1]
    print("at %s on %s" % (time, date))

    for idx in metadata.keys():
        print("%s :: %s" % (metadata[idx], values[idx]))

def fetch_metadata():
    metadata = {}

    key_re = re.compile("(?<=span#).*(?='\).html)")
    idx_re = re.compile("[0-9]+")

    functionsjs = urlopen(METADATA_URL)
    for line in functionsjs.readlines():
        line = str(line)
        if line.count('.html(theValues'):
            key = key_re.search(line).group(0).replace("\\", "")
            idx = int(idx_re.search(line).group(0))
            metadata[idx] = key
    return metadata

if __name__ == '__main__':
    metadata = fetch_metadata()
    fetch_data(metadata)
