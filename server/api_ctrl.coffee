logger = require "./logger.js"
Spot = require("./dao.js").Spot

module.exports = api = {
  createSpot: ->*
    newSpot = @request.body
    newSpot.timestamp = Date.now()
    logger.info("Creating spot " + newSpot + " for request: " + logger.stringifyJson(@request))
    @body = yield Spot.create(newSpot)

  findSpot: ->*
    params = @request.url.split("?")[1]
    logger.info("Finding spot for query " + params + " for request: " + logger.stringifyJson(@request))
    # Completely ignore query string because hackathon
    @body = yield Spot.find({ "lat": { "$eq": 47.606516 }})

  mockSpot:  ->* @body = yield { "lat": 47.606516, "lon": -122.335915, "timestamp": Date.now() - 60000 }
}
