# MeterQuest

**MeterQuest** provides an easy interface to search for open parking spots
using a combination of open parking spot data as well as available parking
spots reported by users.

This application was developed on the weekend of 3/20 - 3/22 as part of the
[Hack the Commute](http://hackthecommute.seattle.gov/) hackathon.

![Screenshot of MeterQuest](screenshot.jpg)

## Challenge and Approach

Our submission was intended to reduce congestion by simplifying the process
of finding parking spots.

We approached this problem in a number of ways:

* Provide a simple interface for finding parking spots
* Gamify the process of identifying available parking spots for other users
* Use open data to filter available parking spots

## Team Members

Our team:

* [Cesar Romero](https://github.com/cromero)
* [Deirdre Allison](https://github.com/DeirdreAllison)
* [Logan Franken](https://github.com/loganfranken)
* [Piera Damote](https://github.com/Piera)
* [Utah Newman](https://github.com/theutahkate)
* [Peter Shaw]()
* [Doug Wade](https://github.com/prekolna)

## Technologies, APIs, and Datasets Utilized

We used the following **technologies**:

* [AngularJS](https://angularjs.org/)
* [ArcGIS JavaScript API](http://www.arcgis.com/)
* [Bower](http://bower.io/)
* [CoffeeScript (server-side)](http://coffeescript.org/)
* CSS
* [Jade](http://jade-lang.com/)
* JavaScript
* [Koa](http://koajs.com/)
* [LokiJS](http://lokijs.org/)
* [Twitter Bootstrap](http://getbootstrap.com/)

We used the following **APIs**:

* [SDOT ArcGIS Street Parking](http://gisrevprxy.seattle.gov/ArcGIS/rest/services/SDOT_EXT/sdot_parking/MapServer/7/)

## Contributing

In order to build and run our app:

* Install node >= 0.11.0
* `npm install`
* `gulp`
* View on `localhost:3000`

Our code is licensed under the [MIT License](LICENSE.md). Pull requests will
be accepted to this repo, pending review and approval.

### Git Etiquette

* Commits must have only one parent (rebase instead of merging)
* Write descriptive commit messages
* Don't push broken or incomplete code to master
* Use feature branches locally
* Don't rewrite history on origin
