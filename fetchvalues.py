#!/usr/bin/python3

import re
from datetime import datetime
from urllib.error import URLError, HTTPError
from urllib.request import urlopen

METADATA_URL = 'http://www.lcswma.org/dashboard/js/functions.js'
DATA_URL = 'http://www.lcswma.org/dashboard/getfile.cfm'

FRIENDLY_KEYS = {
    'gashomes' : 'gas_to_energy.conestoga.homes',
    'gasmethane' : 'gas_to_energy.conestoga.methane_destroyed',
    'gasoutput' : 'gas_to_energy.conestoga.kw',
    'gassteam' : 'gas_to_energy.conestoga.steam_generated',
    'gasytd' : 'gas_to_energy.conestoga.mwh_ytd',
    'hbgco2' : 'waste_to_energy.harrisburg.co2_offset',
    'hbghomes' : 'waste_to_energy.harrisburg.homes',
    'hbgoutput' : 'waste_to_energy.harrisburg.kw',
    'hbgwasteday' : 'waste_to_energy.harrisburg.waste_day',
    'hbgwastehour' : 'waste_to_energy.harrisburg.tons_per_hour',
    'hbgwasteytd' : 'waste_to_energy.harrisburg.waste_ytd',
    'hbgytd' : 'waste_to_energy.harrisburg.mwh_ytd',
    'solarhomes' : 'solar.lancaster.homes',
    'solaroutput' : 'solar.lancaster.kw',
    'solarytd' : 'solar.lancaster.kwh_ytd',
    'windgallons' : 'wind.conestoga.ice_cream_gallons',
    'windhomes' : 'wind.conestoga.homes',
    'windoutput' : 'wind.conestoga.kw',
    'wtehomes' : 'waste_to_energy.bainbridge.homes',
    'wteoutput' : 'waste_to_energy.bainbridge.output',
    'wtewaste' : 'waste_to_energy.bainbridge.output',
    'wteytd' : 'waste_to_energy.bainbridge.mwh_ytd',
}

def fetch_data(metadata):
    response = urlopen(DATA_URL)
    data = response.read().decode("ASCII")

    values = data.split("<br>")
    date = values[0].strip()
    time = values[1].strip()
    timestamp = datetime.strptime("%s %s" % (date, time), "%m/%d/%Y %I:%M:%S %p")
    print(timestamp)

    for idx in metadata.keys():
        print("%s :: %s" % (FRIENDLY_KEYS[metadata[idx]], values[idx].replace(',', '').strip()))

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
