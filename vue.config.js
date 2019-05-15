let path = require('path');
let webpack = require('webpack');

module.exports = {
    configureWebpack: {
        entry: './src/lib/index.js',
        output: {
            path: path.resolve(__dirname, './dist'),
            //publicPath: '/dist/',
            // filename: 'build.js' // 打包后输出的文件名
            filename: 'vue-calendar.js', // 我们可不想打包后叫build.js 多low啊 起一个与项目相对应的
            library: 'VueCalendar', // library指定的就是你使用require时的模块名，这里便是require("VueCalendar")
            libraryTarget: 'umd', //libraryTarget会生成不同umd的代码,可以只是commonjs标准的，也可以是指amd标准的，也可以只是通过script标签引入的。
            umdNamedDefine: true // 会对 UMD 的构建过程中的 AMD 模块进行命名。否则就使用匿名的 define。
        },
    },
    // 基本路径
    //baseUrl: '/',
    publicPath: './',
    // 输出文件目录
    outputDir: './dist',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: true,
    // webpack配置
    chainWebpack: () => {
    },
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: true,
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {},
        // 启用 CSS modules for all css / pre-processor files.
        modules: false
    },
    parallel: require('os').cpus().length > 1,
    pwa: {},
    // webpack-dev-server 相关配置
    devServer: {
        open: true,                                 //配置自动启动浏览器
        host: 'localhost',
        port: 8200,                                 // 端口号
        https: false,
        hotOnly: false,                             // https:{type:Boolean}
        /*proxy: {                                        // 配置跨域
            '/api':{
                target:'http://xxx.xx.xxx.xxx:8080', //源地址
                changeOrigin:true,                  //改变源
                ws:true,                            //是否代理websockets
                pathRewrite:{
                    '^/api':''
                }
            }
        },                                           // 配置跨域处理,只有一个代理*/
        proxy: null,
        before: app => {
        }
    },
    // 第三方插件配置
    pluginOptions: {}
}
