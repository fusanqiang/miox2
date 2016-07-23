/**
 * Created by evio on 16/7/20.
 */
'use strict';
const Production = require('./production');
const Development = require('./development');
let result;

switch (process.env.NODE_ENV) {
    case "production":
        result = Production;
        break;
    case "development":
        result = Development;
        break;
}

module.exports = result;