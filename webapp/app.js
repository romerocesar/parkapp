angular.module('meterQuest', [ 'meterQuest.partials', 'ui.bootstrap', 'ui-notification' ])
.config(function(){
  require(
    ["esri/geometry/webMercatorUtils", "esri/SpatialReference", "esri/geometry/Point", "esri/geometry/Circle"],
    function(WebMercatorUtils, SpatialReference, Point, Circle) {
      ESRI = {
        WebMercatorUtils: WebMercatorUtils,
        SpatialReference: SpatialReference,
        Point: Point,
        Circle: Circle
      }
    })
});
