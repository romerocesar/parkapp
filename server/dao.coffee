loki  = require "lokijs"
db    = new loki "meterQuest.db"
spots = db.addCollection "spots"

Spot = {
  create: (spot) -> spots.insert spot,
  find: (query) -> spots.find query
}

module.exports =
  Spot: Spot
