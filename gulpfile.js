//=============================================================================================
/**
 * 自动化构建
 * 
 * 构建---打包
 */
//=============================================================================================


var gulp = require('gulp');
const zip = require('gulp-zip');
var map = require('map-stream');
var vfs = require('vinyl-fs');
var exec = require("child_process").exec

var clean = require('gulp-clean')
var pump  = require('pump');

// var del = require('del');


copyUrl = "build/web-mobile"

zipUrl = 'dist/'

versionName = "version";

var vConsole = false;
var buildIndex = 0;

gulp.task('default',function(cb){
    cb()
});

gulp.task("copyFile",function(cb) {
    copyFile(cb)
})

gulp.task("zipFile",function(cb) {
    zipFile(cb)
})

gulp.task("readTxt",function(cb) {
    readTxt(cb)
})

gulp.task("cleanCatalog",function(cb) {
    cleanCatalog(cb)
})


//CocosCreator.exe --path  --build "platform=web-mobile;embedWebDebugger=true"

function cocosBuild(cb) {
    vConsole = !vConsole;
    var cmd = `CocosCreator.exe --path F:/variable --build "platform=web-mobile;embedWebDebugger=true;debug=${vConsole}"`;

    console.log(`cmd:${cmd}`);
    exec(cmd, function (error, stdout, stdErr) {
        if (!error) {
            console.log(`build success, error  √√√√√√√√√√√√√√√√√√√√√:${stdout}`)
        }
        else {
            console.log(`build failed, out     XXXXXXXXXXXXXXXXXXXXX:${stdErr}`)
        }
        cb();
    })
}



//拷贝文件
function copyFile(cb) {
    if(buildIndex > 0){
        versionName = versionName + "Vconsole"
    }
    console.log(`${versionName}`);
    
    gulp.src(copyUrl + '/**/*')
    .pipe(gulp.dest(zipUrl + versionName))
    .on("end",cb)
}

//压缩文件zip
function zipFile(cb) {
    console.log("begin zipFile  vConsole:" + vConsole);
    gulp.src(zipUrl + versionName + '**/*.*')
    .pipe(zip(versionName + '.zip'))
    .pipe(gulp.dest("dist"));
    buildIndex = buildIndex + 1;
    versionName = "version";
    cb();
}

var log = function(file, cb) {
    var num = Number(file["_contents"]);
    if(buildIndex < 1){
        num = num + 1;
    }
    file["_contents"] = Buffer.from(String(num));
    versionName = versionName + num;
    console.log(file.path + " file:" + file["_contents"]);
    cb(null, file);
  };

//获取当前版本号
function readTxt(cb){
    vfs.src("versionInfo.txt")
    .pipe(map(log))
    .pipe(vfs.dest('./'))
    .on("end",cb)
}

//创建目录，因为没有目录的情况下删除文件会出错
function createCatalog(cb)
{
    gulp.src("./")
        .pipe(gulp.dest("dist/"))
        .on("end",cb)
}

//删除目录
function cleanCatalog(cb){

    pump([
        gulp.src('dist/'),
        clean(),
    ],cb)
}

gulp.task("build",gulp.series(
    createCatalog,
    cleanCatalog,
    cocosBuild,
    readTxt,
    copyFile,
    zipFile,
    //生成2次 一次加上日志版本
    cocosBuild,
    readTxt,
    copyFile,
    zipFile,
))
