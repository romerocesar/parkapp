logger = require "./logger.js"
Spot = require("./dao.js").Spot

module.exports = api = {
  createSpot: ->*
    newSpot = @request.body
    newSpot.timestamp = Date.now()
    logger.info("Creating spot " + newSpot + " for request: " + logger.stringifyJson(@request))
    @body = yield Spot.create(newSpot)

  listSpots: ->*
    params = @request.url.split("?")[1]
    logger.info("Finding spot for query " + params + " for request: " + logger.stringifyJson(@request))
    # The maximum latitude is 90, the North Pole, so this *should* return all results.
    @body = yield Spot.find({ "lat": { "$ne": 91 }})

  mockSpot:  ->* @body = yield { "lat": 47.606516, "lon": -122.335915, "timestamp": Date.now() - 60000 }

  upsertSpot: ->*
    query = @request.body
    toUpdate = Spot.find(query)
    if toUpdate.length > 0
      # Update the timestamp to indicate it is currently still open, as that is the only possible update (new
      # coordinates would be a different parking spot).
      @body = yield toUpdate.update((spot) -> spot.timestamp = Date.now())
    else
      query.timestamp = Date.now()
      @body = yield Spot.create(query)

  deleteSpot: ->*
    lat = @request.query.lat
    lon = @request.query.lon
    Spot.delete({ "lat": parseFloat(lat, 10), "lon": parseFloat(lon, 10) })
    @body = yield { 'deleted': true }
}
