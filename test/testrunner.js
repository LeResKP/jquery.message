var qunit = require('qunit');
var jsdom = require('jsdom').jsdom;

function abspath(p) {
  return "./" + p;
}


// jsdom.env({
//       html: "<html><body></body></html>",
//       scripts: [
//         'http://code.jquery.com/jquery-1.5.min.js'
//       ]
// }, function (err, window) {
//     console.log('JSDOM ENV');
//     document = window.document;
//     var $ = window.jQuery;
//     console.log($);
//     exports.$ = $;
//     qunit.run({
//         deps: ["test/env.js", "test/lib/jquery-1.9.0.js"].map(abspath),
//         // deps: ["test/env.js"].map(abspath),
//         code: {path: abspath('src/jquery.message.js')},
//         tests: ['test/test.js'].map(abspath)
//     })
// });
//


qunit.run({
    deps: ["test/env.js", "test/lib/jquery-1.9.0.js"].map(abspath),
    // deps: ["test/env.js"].map(abspath),
    code: {path: abspath('src/jquery.message.js')},
    tests: ['test/test.js'].map(abspath)
})
