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
  scripts     : "webapp/**/*.js"
  server      : "server/*.coffee"
  styles      : "./stylesheets/**/*.css"
  images      : "./images/**/*.png"
  views       : "views/*.jade"

gulp.task "angular-views", ->
  gulp.src paths.partials
    .pipe jade()
    .pipe ngHtml2Js(moduleName: "meterQuest.partials", prefix: "/partials/")
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
      "./images/**"
    ]

gulp.task "server-scripts", ->
  gulp.src paths.server
    .pipe coffeeES6 bare: yes
    .pipe gulp.dest paths.build

gulp.task "scripts", ->
  gulp.src paths.scripts
    .pipe concat "all.js"
    .pipe gulp.dest paths.dest + "/scripts"
    .pipe livereload()

gulp.task "styles", ->
  gulp.src paths.styles
    .pipe gulp.dest paths.dest + "/stylesheets"
    .pipe livereload()

gulp.task "images", ->
  gulp.src paths.images
    .pipe gulp.dest paths.dest + "/images"
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

gulp.task "default", [ "bower", "views", "angular-views", "styles", "scripts", "images", "server-scripts", "watch", "server"]
gulp.task "deps", ["npm", "bower"]
