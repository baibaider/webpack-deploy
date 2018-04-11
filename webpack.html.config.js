var htmlWebpackPlugin=require('html-webpack-plugin');//自动生成html文件

//对外暴露一个对象
module.exports={
    // entry:__dirname +"/app/index.js",//打包的入口文件 对象或字符串
    entry:{//打包多个入口文件
        build:__dirname+"/app/app.js",
        abc:__dirname+"/app/abc.js"
    },
    output:{//配置打包结果 对象
        path:__dirname +"/build/",//定义输出文件路径
        // filename:"build.js",//指定打包文件名称
        filename:"[name].js"//指定多个打包文件名称
    },
    module:{//对文件的处理逻辑 数组
        loaders:[//加载器是数组,数组中的每一项是一个对象
            {
                test:/.css$/,//是一个正则,处理后缀名为css的文件,匹配到的文件名后缀
                loaders:["style-loader","css-loader"],//放加载器,一个是字符串,两个就写成数组
                exclude:"/node_modules"//要排除的文件夹
            }
        ]
    },
    devServer:{//配置服务
        hot:true,
        inline:true
    },
    resolve:{
        extensions:[' ','.js','.css','.jsx'] //自动补全识别后缀名
    },
    plugins:[
        new htmlWebpackPlugin({//自动生成html文件
            title:"欢迎",
            chunks:["build"]//引用的模块(build.js)
        }),
        new htmlWebpackPlugin({//自动生成html文件
            title:"欢迎",//title标签
            filename:"class.html",//文件名,不规定的话文件名默认index.html
            chunks:["abc"] //引用的模块(abc.js)
        })
    ]
}