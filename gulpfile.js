

var gulp = require('gulp');//告知node去node_modules中查找gulp包，找到后就会赋值给gulp变量
var app={
    srcPath:'src/',  //开发目录
     devPath:'build/', //生产目录
     prdPath:'dist/'//发布目录（用于发布）
};

gulp.task('image',function(){  //为事件命名
  return gulp.src('images/**/*').pipe(pulp.dest('dist/images'));
  // gulp.src(['xml/*.xml','json/*.json']).pipe(pulp.dest('dist/data'));
  //同时操作xml下所有的.xml和json文件夹下所有的.json文件
  // gulp.src(['xml/*.xml','json/*.json','!json/secret-*.json']).pipe(pulp.dest('dist/data'));
  //叹号表示复制是忽略此类文件，即以secret-开头的所有文件
});//将images下的所有东西都复制到dist文件下的images里

//创建人任务依赖三个任务
gulp.task('build',['copy-index','images','data'],function(){
  console.log('编译成功');
});
//执行build时会先执行后三个任务，执行完成后再执行build本身的任务

gulp.task('watch',function(){
  return gulp.watch('index.html',['copy-index']).pipe(connect.reload());//index.html发生变化后执行copy-index任务
  //.pipe(connect.reload()是为了配合实时刷新
});

//使用插件  npm install gulp-sass --save-dev ，less同理
var sass = require('gulp-sass');
gulp.task('sass',function(){
  return gulp.src('stylesheets/**/*.scss').pipe(sass()).pipe(gulp.dest('dist/css'));
  //将sass编译成css文件
});

//创建本地服务器运行代码
// npm install gulp-connect --save-dev livereload为自动刷新插件
var connect = require('gulp-connect'); // gulp-connect是开源的，它是一个静态web的服务
gulp.task('server',function(){
  connect.server({
    root : 'dist',
    port: 8000,
    livereload : ture  //启用实时刷新
  })
});
