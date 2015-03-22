angular.module('meterQuest')
.service('parkingSpotSvc', function($log, $http) {

    // Converts latitude and longitude to X and Y coordinates
    function convertLatLonToXY(lat, lon) {

      var result = ESRI.WebMercatorUtils.lngLatToXY(lon, lat);

      return {
        x: result[0],
        y: result[1]
      };

    }

    // Returns a bounding box based on the specified X, Y coordinate
    function getBoundingBox(x, y) {

      var spatialReference = new ESRI.SpatialReference();
      spatialReference.wkid = "102100";

      var point = new ESRI.Point();
      point.spatialReference = spatialReference;
      point.x = x;
      point.y = y;

      var circle = new ESRI.Circle({
        center: point,
        geodesic: true,
        radius: 20,
        radiusUnit: "esriFeet"
      });

      var bound = circle.getExtent();

      return {
        xmin: bound.xmin,
        xmax: bound.xmax,
        ymin: bound.ymin,
        ymax: bound.ymax
      };
    }

    // Generates a URL that can be used to request parking category data
    function getParkingUrl(xmin, ymin, xmax, ymax, callback) {

      var baseUrl = "//gisrevprxy.seattle.gov/ArcGIS/rest/services/SDOT_EXT/sdot_parking/MapServer/7/query?";

      var params = 'f=json'
      + '&returnGeometry=true'
      + '&spatialRel=esriSpatialRelIntersects'
      + '&maxAllowableOffset=19'
      + '&geometry=' + encodeURIComponent('{'
      + '"xmin":' + xmin + ','
      + '"ymin":' + ymin + ','
      + '"xmax":' + xmax + ','
      + '"ymax":' + ymax + ','
      + '"spatialReference":{"wkid":102100,"latestWkid":3857}}')
      + '&geometryType=esriGeometryEnvelope'
      + '&inSR=102100'
      + '&outFields=OBJECTID,PARKING_CATEGORY'
      + '&outSR=102100'
      + '&callback=JSON_CALLBACK';

      return baseUrl + params;

    }

    return {
        foo: function(lat, lng) {

            // Retrieve the X and Y coordinates
            var coords = convertLatLonToXY(lat, lng);

            // Get the bounding box
            var bound = getBoundingBox(coords.x, coords.y);

            // Construct the request URL
            var url = getParkingUrl(bound.xmin, bound.ymin, bound.xmax, bound.ymax);

            $http.jsonp(url)
              .success(function(data, status, headers, config) {
                $log.debug(data);
              })
              .error(function(data, status, headers, config) {
                $log.debug("Error retrieving results")
              });

              /*

              // Clear parking lines
              parkingLinePaths.forEach(function(parkingLine) {
              parkingLine.setMap(null);
            });
            parkingLinePaths = [];

            // Add the parking lines
            response.features.forEach(function(parkingLine) {

            // Attributes
            var category = parkingLine.attributes.PARKING_CATEGORY;

            var color = "black";

            switch(category)
            {
            case "Carpool Parking":
            color = "blue";
            break;

            case "Restricted Parking Zone":
            color = "orange";
            break;

            case "Paid Parking":
            color = "green";
            break;

            case "No Parking Allowed":
            color = "red";
            break;

            case "Time Limited Parking":
            color = "yellow";
            break;

            case "Unrestricted Parking":
            color = "gray";
            break;
          }

          // Geometry
          var linePoint1 = parkingLine.geometry.paths[0][0];
          var x1 = linePoint1[0];
          var y1 = linePoint1[1];
          var coord1 = convertXYToLatLon(x1, y1);

          var linePoint2 = parkingLine.geometry.paths[0][1];
          var x2 = linePoint2[0];
          var y2 = linePoint2[1];
          var coord2 = convertXYToLatLon(x2, y2);

          var coords = [
          new google.maps.LatLng(coord1.lat, coord1.lon),
          new google.maps.LatLng(coord2.lat, coord2.lon)
          ];

          var path = new google.maps.Polyline({
          path: coords,
          geodesic: true,
          strokeColor: color,
          srokeOpacity: 1.0,
          strokeWeight: 2
        });

        path.setMap(map);

        parkingLinePaths.push(path);
        */
        }
    }
});
