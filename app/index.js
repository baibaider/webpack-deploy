var str=require('./app.js');
document.body.innerHTML="<div>"+str+"</div>";
// define([./app.js],function(str){
//     document.body.innerHTML="<div>"+str+"</div>";
// })//有错误

// require('style-loader!css-loader!./css/style.css')
require('./css/style.css')