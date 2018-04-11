var htmlWebpackPlugin=require('html-webpack-plugin');//自动生成html文件
var path=require('path');//path是内置的
var WebpackDevServer = require('webpack-dev-server');//自动刷新模块

//对外暴露一个对象
module.exports={
    // entry:__dirname +"/app/index.js",//打包的入口文件 对象或字符串
    entry:{//打包多个入口文件
        build:__dirname+"/es6/index.js"
    },
    output:{//配置打包结果 对象
        path:__dirname +"/es6_build/",//定义输出文件路径
        // filename:"build.js",//指定打包文件名称
        filename:"[name].js"//指定多个打包文件名称
    },
    module:{//对文件的处理逻辑 数组
        loaders:[//加载器是数组,数组中的每一项是一个对象
            {
                test:/.css$/,//是一个正则,处理后缀名为css的文件,匹配到的文件名后缀
                // webpack在打包过程中，遇到后缀为css的文件，就会使用style-loader和css-loader去加载这个文件。
                loaders:["style-loader","css-loader"],//放加载器,一个是字符串,两个就写成数组
                // 最后计算完的css，将会使用style-loader生成一个内容为最终解析完的css代码的style标签，放到head标签里。
                // 需要注意的是，loader是有顺序的，webpack肯定是先将所有css模块依赖解析完得到计算结果再创建style标签。
                // 因此应该把style-loader放在css-loader的前面（webpack loader的执行顺序是从右到左）。
                exclude:"/node_modules"//要排除的文件夹
            },
            {
                test:/.js$/,
                loaders: ["babel-loader"], //将es6代码转换为es5代码
                exclude:"/node_modules",
                include:path.resolve(__dirname,"/es6/")//要包含的文件
            }
        ]
    },
    devServer:{//配置服务
        hot:true, //启用热模块替换
        inline:true //自动刷新页面时使用inline模式(将webpack-dev-sever的客户端入口添加到包(bundle)中)
        //此模式支持热模块替换：热模块替换的好处是只替换更新的部分,而不是页面重载.
    },
    resolve:{
        extensions:[' ','.js','.css','.jsx'] //自动补全识别后缀名
    },
    plugins:[
      // 插件可以完成更多loader不能完成的功能。插件的使用一般是在webpack.config.js中的plugins 选项中指定。
      // Webpack本身内置了一些常用的插件，还可以通过npm安装第三方插件。
        new htmlWebpackPlugin({//自动生成html文件
            title:"欢迎",//title标签为欢迎这个字符串
            chunks:["build"] //引用的模块(abc.js)
        }),
        new webpack.HotModuleReplacementPlugin()  //启用热模块替换
    ]
}
