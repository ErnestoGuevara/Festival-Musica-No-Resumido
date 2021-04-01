const {series,src,dest,watch}= require("gulp");
//COMO COMPILAR SASS
const sass=require("gulp-dart-sass");
const imagemin=require("gulp-imagemin");
const notify=require("gulp-notify")
const webp=require("gulp-webp")
const concat=require("gulp-concat");

//Utilidades CSS
const autoprefixer=require("autoprefixer");
const postcss=require("gulp-postcss");
const cssnano=require("cssnano");
const sourcemap=require("gulp-sourcemaps");

//Utilidades JS
const terser=require("gulp-terser-js");
const rename=require("gulp-rename");

//Funcion que compila SAAS
const paths={
    imagenes: "src/img/**/*",
    scss: "src/scss/**/*.scss",
    js:"src/js/**/*.js"

}
function css(){
    return src(paths.scss)
    .pipe(sourcemap.init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemap.write("."))
    .pipe(dest("./build/css"))
}

function javascript(){
    return src(paths.js)
    .pipe(sourcemap.init())
    .pipe( concat("bundle.js"))
    .pipe(terser())
    .pipe(sourcemap.write("."))
    .pipe(rename({suffix:".min"}))
    .pipe(dest("./build/js"))
}


function imagenes(){
    return src(paths.imagenes)
    .pipe(imagemin())
    .pipe(dest("./build/img"))
    .pipe(notify({message: "Imagen Minificada"}));
}

function versionWebp(){
    return src(paths.imagenes)
    .pipe(webp())
    .pipe(dest("./build/img"))
    .pipe(notify({message:"Version webpp lista"}));
}

function watchArchivos(){
    watch(paths.scss,css);// * =a la carpeta actual -> **=Todos los archivos con esa extension
    watch(paths.js, javascript);

}

exports.css=css;
exports.imagenes=imagenes;
exports.watchArchivos=watchArchivos;

exports.default=series(css,imagenes,javascript,versionWebp,watchArchivos)






//COMO FUNCIONA GULP

// function css(done){
//     console.log("compilando...sass");
//     done()
// }

// function javascript(done){
//     console.log("compilando...javascript");
//     done()
// }
// function minificarHTML(done){
//     console.log("Minificando");
//     done()
// }

// exports.css=css;
// exports.javascript=javascript;
// exports.default=series(css,javascript,minificarHTML);
