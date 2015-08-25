angular.module("wordpet.controllers", ['firebase','ngCookies']);
angular.module("wordpet.directives", ['firebase','ngCookies']);
angular.module("wordpet.services", ['firebase','ngCookies']);

require("./directives/header.js");

require("./services/authentication.js");
require("./services/authorization.js");
require("./services/settings.js");
require("./services/svc.js");
require("./services/refs.js");
require("./services/utils.js");

require("./controllers/home.js");
require("./controllers/settings.js");
require("./controllers/search.js");
