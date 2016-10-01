var 
webpack = require('webpack'),
path = require('path'),
dir = path.resolve(__dirname,'dist');
module.exports = [
];

config('var',''),
config('commonjs2','node'),
config('amd'),
config('umd')
//demo
    //("scroll");

//function demo (target) {
    //module.exports.push({
        //'entry' : {
            //'app' : ["./demos/"+target+".js"]
        //},
        //'output' : {
            //'path' : dir,
            //'filename' : "/demo_bundles/" + target +'.bundle.js'
        //},
        //'externals' : {
            //'react' : 'React',
            //'react-dom' : 'ReactDOM'
        //},
        //'module' : {
            //'loaders' : [{
                //'test' : /\.jsx?$/,
                //'loader' : 'babel-loader',
                //'exclude' : /node_modules/,
                //'query' : {
                    //'presets' : ['react']
                //}
            //}]
        //}
    //});
    //return demo;
//}

function config (target,optionalName) {
    optionalName = optionalName !== '' ? ('.'+(optionalName || target)) : '';
    module.exports.push({
        'entry' : {
            'app' : ['./libs/index.js']
        },
        'output' : {
            'path' : dir,
            'library' : 'poppy',
            'libraryTarget' : target,
            'filename' : 'poppy'+optionalName +'.js'
        },
        'externals' : {
            'react' : 'React',
            'react-dom' : 'ReactDOM'
        },
        'module' : {
            'loaders' : [{
                'test' : /\.jsx?$/,
                'loader' : 'babel-loader',
                'exclude' : /node_modules/,
                'query' : {
                    'presets' : ['react']
                }
            }]
        }
    });
    module.exports.push({
        'entry' : {
            'app' : ['./libs/index.js']
        },
        'output' : {
            'path' : dir,
            'library' : 'poppy',
            'libraryTarget' : target,
            'filename' : 'poppy'+optionalName+'.min.js'
        },
        'externals' : {
            'react' : 'React',
            'react-dom' : 'ReactDOM'
        },
        'module' : {
            'loaders' : [{
                'test' : /\.jsx?$/,
                'loader' : 'babel-loader',
                'exclude' : /node_modules/,
                'query' : {
                    'presets' : ['react']
                }
            }]
        },
        'plugins' : [
            new webpack.optimize.UglifyJsPlugin({minimize:true})
        ]
    });
}

