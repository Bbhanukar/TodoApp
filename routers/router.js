let config = require('../configs/config');
let handler = require('../routeHandlers/handler');

let baseUrl = config.baseUrl;
module.exports.setRouter = function (app) {
    app.post(baseUrl + '/addwork', handler.addwork);

    app.get(baseUrl + '/viewlist',handler.viewlist );

    app.post(baseUrl + '/modify', handler.modify);

    app.post(baseUrl + '/remove', handler.remove);
}