var babel = require('babel-core'),
fs = require('fs');

copy ("index.js") ("poppy.css");
transform_jsx ("container.js") ("poppy.js")


function copy (file) {
    fs.readFile("libs/"+file,function (err,data) {
        fs.writeFile("dist/"+file,data,function (err,data) {
            if (err) {
                console.error(err.toString());
            } else {
                console.error("done writing " + file);
            }
        });
    });
    return copy;
}
function transform_jsx (file) {
    babel.transformFile("libs/"+file,{
        'presets' : ['react']
    },function (err,code) {
        if (err) {
            console.error(err.toString());
        } else {
            fs.writeFile("dist/"+file,code.code,function (err) {
                if (err) {
                    console.error(err.toString());
                } else {
                    console.error("done writing " + file);
                }
            });
        }
    });
    return transform_jsx;
}
