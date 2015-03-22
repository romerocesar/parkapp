The cool name comes later

We'll hack the commute to make it easier to find available parking spots in seattle.

Parking pay stations
http://gisrevprxy.seattle.gov/ArcGIS/rest/services/ext/WM_CityGISLayers/MapServer/38

street parking signs
http://gisrevprxy.seattle.gov/ArcGIS/rest/services/SDOT_EXT/DSG_datasharing/MapServer/2

public parking lots
http://gisrevprxy.seattle.gov/ArcGIS/rest/services/SDOT_EXT/DSG_datasharing/MapServer/0

other SDOT data
http://gisrevprxy.seattle.gov/ArcGIS/rest/services/SDOT_EXT/DSG_datasharing/MapServer

# Git Etiquette

[![Join the chat at https://gitter.im/cromero/parkapp](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/cromero/parkapp?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
+ Commits must have only one parent (rebase instead of merging)
+ Write descriptive commit messages
+ Don't push broken or incomplete code to master
+ Use feature branches locally
+ Don't rewrite history on origin

# Starting the server
+ Install node >= 0.11.0
+ `npm install`
+ `gulp`
+ View on `localhost:3000`
