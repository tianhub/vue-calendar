module.exports = {
    configureWebpack: {
        output: {
            libraryExport: 'default'
        },
       /* externals: {
            vue: 'vue'
        }*/
    },
    css: { extract: false },//强制内联 将css文件写在js文件中
}
