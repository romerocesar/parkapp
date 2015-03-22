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
}
