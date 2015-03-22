angular.module('meterQuest', ['ui.bootstrap'])
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
