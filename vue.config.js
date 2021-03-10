module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        // 配置跨域
        proxy: {
            '/api':{
                target:'http://localhost:8100',
                changeOrigin:true,
                pathRewrite:{
                    '/api':''
                }
            }
        }
    }
}