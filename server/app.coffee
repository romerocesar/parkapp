apiCtrl = require "./api_ctrl.js"
logger       = require "./logger.js"

bodyParser   = require "koa-bodyparser"
bunyan       = require "koa-bunyan"
json         = require "koa-json"
koa          = require "koa"
livereload   = require "koa-livereload"
parse        = require "co-body"
router       = require "koa-router"
serve        = require "koa-static"
session      = require "koa-session"
views        = require "co-views"

app = module.exports = koa()

app.use bunyan(logger,
    level: "info"
    timeLimit: 250
  )
app.use json()
app.use session()
app.use livereload()
app.use bodyParser()
app.use router app
render = views "views/"
app.use serve "public/"
app.use serve "bower_components/"
require("koa-qs")(app)

app.get "/", ->*
  @body = yield render "index.jade"

# App routes
# TODO: put this in a separate file
app.get "/api/spots/:q", apiCtrl.getSpots

app.listen 3000
