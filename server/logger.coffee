bunyan = require("bunyan")

bunyanOptions =
  name: "meterQuest"
  streams: [{
      level: "info",
      stream: process.stdout
    }, {
      level: "debug",
      path: "build/logger.out"
    }
  ]
  serializers: bunyan.stdSerializers
  src: true

separator = " "

logger = bunyan.createLogger(bunyanOptions)

logger.stringifyJson = (json) ->
  JSON.stringify(json)

logger.stringifyJsonArray = (jsonArray) ->
  jsonArray.reduce(((x, y) -> x + separator + JSON.stringify(y)), "")

module.exports = logger
