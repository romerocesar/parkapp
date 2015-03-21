bower      = require "gulp-bower"
clean      = require "gulp-clean"
coffee     = require "gulp-coffee"
coffeeES6  = require "gulp-coffee-es6"
concat     = require "gulp-concat"
gulp       = require "gulp"
imagemin   = require "gulp-imagemin"
install    = require "gulp-install"
jade       = require "gulp-jade"
livereload = require "gulp-livereload"
ngHtml2Js  = require "gulp-ng-html2js"
nodemon    = require "gulp-nodemon"
stylus     = require "gulp-stylus"
uglify     = require "gulp-uglify"

paths =
  bower       : "public/lib"
  bowerjson   : "./bower.json"
  build       : "build"
  dest        : "public"
  packagejson : "./package.json"
  partials    : "partials/*.jade"
  scripts     : "webapp/**/*.coffee"
  server      : "server/*.coffee"
  styles      : "webapp/stylesheets/**/*.styl"
  views       : "views/*.jade"

gulp.task "angular-views", ->
  gulp.src paths.views
    .pipe jade()
    .pipe ngHtml2Js(
        moduleName: "meterQuest.partials"
        prefix: "/partials/"
        stripPrefix: "views/")
    .pipe uglify()
    .pipe concat "angular-views.min.js"
    .pipe gulp.dest paths.dest + "/scripts"
    .pipe livereload()

gulp.task "bower", ->
  gulp.src [paths.bowerjson]
    .pipe install()

gulp.task "clean", ->
  gulp.src [paths.build, paths.dest, "bower_components", "app.js"]
    .pipe clean()

gulp.task "npm", ->
  gulp.src [paths.packagejson]
    .pipe install()

gulp.task "server", ->
  nodemon
    script: paths.build + "/app.js"
    nodeArgs: ["--harmony"]
    ignore: [
      "./bower_components/**"
      "./node_modules/**"
      "./public/**"
      "./src/**"
      "./test/**"
      "./views/**"
    ]

gulp.task "server-scripts", ->
  gulp.src paths.server
    .pipe coffeeES6 bare: yes
    .pipe gulp.dest paths.build

gulp.task "scripts", ->
  gulp.src paths.scripts
    .pipe coffee()
    .pipe uglify()
    .pipe concat "all.min.js"
    .pipe gulp.dest paths.dest + "/scripts"
    .pipe livereload()

gulp.task "styles", ->
  gulp.src paths.styles
    .pipe stylus()
    .pipe gulp.dest paths.dest + "/stylesheets"
    .pipe livereload()

gulp.task "views", ->
  gulp.src paths.views
    .pipe jade()
    .pipe gulp.dest paths.dest
    .pipe livereload()

gulp.task "watch", ->
  gulp.watch paths.packagejson , ["npm"]
  gulp.watch paths.views       , ["views"]
  gulp.watch paths.styles      , ["styles"]
  gulp.watch paths.scripts     , ["scripts"]
  gulp.watch paths.server      , ["server-scripts"]
  gulp.watch paths.bowerjson   , ["bower"]
  gulp.watch paths.partials    , ["angular-views"]

gulp.task "default", ["views", "angular-views", "styles", "scripts", "server-scripts", "watch", "server"]
gulp.task "deps", ["npm", "bower"]
