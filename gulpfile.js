const sass = require("gulp-sass");
const { src,dest, watch } = require("gulp");
const sync = require("browser-sync").create();
const uglify = require("gulp-uglify");


const config = {
    buildDir : "./build/**/*",
    jsSource : "./src/**/*.js",
    sassSource : "./src/scss/**/*.scss",
    cssOutput : "./build",
    jsOutput : "./build/",
    serverDir : "./build",
    htmlSource: "./src/*.html",
    htmlOutput: "./build",
    assetsSource : "./assets/**/*",
    assetsOutput : "./build/assets"
}

const copyJS = () => src(config.jsSource).pipe(dest(config.jsOutput))
const copytHTML = () => src(config.htmlSource).pipe(dest(config.htmlOutput))
const copyAssets = () => src(config.assetsSource).pipe(dest(config.assetsOutput))
const uglifyJS = () => src(config.jsSource).pipe(uglify()).pipe(dest(config.jsOutput))
const transpileSass = () => src(config.sassSource).pipe(sass().on('error',sass.logError)).pipe(dest(config.cssOutput))

const watchJS =() => watch(config.jsSource).on("change",copyJS)
const watchSass = () => watch(config.sassSource).on("change",transpileSass)
const watchHTML = () => watch(config.htmlSource).on("change",copytHTML)
const watchAssets = () => watch(config.assetsSource).on("change",copyAssets)
const watchBuild =() => watch(config.buildDir).on("all", sync.reload) 

const buildDev = () => {
    copyJS()
    copytHTML()
    copyAssets()
    transpileSass()
}

function run(){
    buildDev()
    serve()
    watchSass()
    watchJS()
    watchHTML()
    watchAssets()
    watchBuild()
}

function serve(){
    sync.init({
        server:{
            baseDir: config.serverDir
        }
    })
}


exports.uglify = uglifyJS
exports.run = run
exports.sass = transpileSass