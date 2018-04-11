
// webpack在执行时，除在命令行传入参数，还可以通过指定的配置文件来执行。默认会搜索当前目录下webpack.config.js。
// 这个文件是一个node.js模块，返回一个json格式的配置对象，或者通过--config选项来指定配置文件。
var webpack = require('webpack');
module.exports = {
  entry:'./entry.js',  //入口文件
  // entry可以是个字符串或数组或者是对象。
// 当entry是个字符串的时候，用来定义入口文件：
// 当entry是个数组的时候，里面同样包含入口js文件，另外一个参数可以是用来配置webpack提供的一个静态资源服务器
// ，webpack-dev-server。webpack-dev-server会监控项目中每一个文件的变化，实时的进行构建，并且自动刷新页面：
// entry: [
//      'webpack/hot/only-dev-server',
//      './js/app.js'
// ]
  output:{
    //node.js中__dirname变量获取当前模块文件所在目录的完整绝对路径
    path:__dirname, //输出位置
    filename:'build.js' //输入文件
  },
  // output参数是个对象，用于定义构建后的文件的输出。其中包含path和filename


  module:{  //关于模块的加载相关，我们就定义在module.loaders中。这里通过正则表达式去匹配不同后缀的文件名
    // ，然后给它们定义不同的加载器。比如说给less文件定义串联的三个加载器（！用来定义级联关系）：
    // loaders: [
    //     { test: /\.js?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
    //     { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
    //     { test: /\.css$/, loader: "style!css" },
    //     { test: /\.less/, loader: 'style-loader!css-loader!less-loader'}
    // ]
    loaders:[
      {
        test:/\.css$/,      //支持正则
        loader:'style-loader!css-loader'
      }
    ]
  },
  //其他解决方案配置
  resolve:{ //webpack在构建包的时候会按目录的进行文件的查找，
    // resolve属性中的extensions数组中用于配置程序可以自行补全哪些文件后缀
    extensions:['','.js','.json','.css','.scss']   //添加在此的后缀所对应的文件可省略后缀,
    // 然后我们想要加载一个js文件时，只要require(‘common’)就可以加载common.js文件了。
  },
  //插件
  plugins:[
    new webpack.BannerPlugin('This file is create by baibai')
  ]

//   当我们想在项目中require一些其他的类库或者API，而又不想让这些类库的源码被构建到运行时文件中，
// 这在实际开发中很有必要。此时我们就可以通过配置externals参数来解决这个问题：
//
//  externals: {
//      "jquery": "jQuery"
//  }
//
//
// 这样我们就可以放心的在项目中使用这些API了：var jQuery = require(“jquery”);
}
