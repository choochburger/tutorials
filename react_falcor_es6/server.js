var FalcorServer = require('falcor-express');
var bodyParser = require('body-parser');
var express = require('express');
var Router = require('falcor-router');
var app = express();

var data = {
    names: [
        { name: 'a' },
        { name: 'b' },
        { name: 'c' }
    ]
};

var NamesRouter = Router.createClass([{
    route: 'names[{integers:nameIndexes}]["name"]',
    get: (pathSet) => {
        var results = [];
        pathSet.nameIndexes.forEach(nameIndex => {
            if (data.names.length > nameIndex) {
                results.push({
                    path: ['names', nameIndex, 'name'],
                    value: data.names[nameIndex].name
                });
            }
        });
        return results;
    }
}, {
    route: 'names.add',
    call: (callPath, args) => {
        var newName = args[0];
        data.names.push({ name: newName });
        return [{
            path: ['names', data.names.length - 1, 'name'],
            value: newName
        }, {
            path: ['names', 'length'],
            value: data.names.length
        }];
    }
}, {
    route: 'names.length',
    get: () => {
        return { path: ['names', 'length'], value: data.names.length }
    }
}]);

app.use(bodyParser.urlencoded({extended: false}));
app.use('/model.json', FalcorServer.dataSourceRoute(() => new NamesRouter()));
app.use(express.static('.'));
app.listen(9090, err => {
    if (err) {
        return console.error(err);
    }
});
console.log('navigate to http://localhost:9090');
