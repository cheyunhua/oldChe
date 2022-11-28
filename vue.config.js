module.exports = {
    outputDir: "dist",
    devServer: {
        //proxy:'http://192.168.0.107:2222'
        proxy: {
            '/api': {
                ws: false,
                changeOrigin: true,
                target: 'http://192.168.0.107:2222'
            }

        }
        
    }
};