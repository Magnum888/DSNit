const ExtractTextPlugin = require("extract-text-webpack-plugin");
// Create multiple instances
const extractCSS = new ExtractTextPlugin({filename: 'css/[name]-custom.css', allChunks: true});
const extractSASS = new ExtractTextPlugin({filename: 'css/[name]-includes.css', allChunks: true});
 
module.exports = function(paths){
    return {
        module: {
            rules: [
                {
                    test: /\.sass$/,
                    include: paths,
                    use: extractSASS.extract({
                        publicPath: '../',
                        fallback: "style-loader",
                        use: ['css-loader?url=false','sass-loader']
                    })
                },
                {
                    test: /\.css$/,
                    include: paths,
                    use: extractCSS.extract({
                        publicPath: '../',
                        fallback: "style-loader",
                        use: ['css-loader?url=false']
                    })
              }
            ]
          },
          plugins: [
            extractSASS,
            extractCSS
          ]
    }
}