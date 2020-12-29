"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const server_1 = require("../server");
const webpack_1 = require("../webpack");
const argv = process.argv;
const [nodepath, codepath, ...optionsArray] = argv || [];
const options = optionsArray.reduce((resultOpt, optionString) => {
    const [_key, value] = optionString.split('=');
    if (_key.indexOf('--') >= 0) {
        const key = _key.replace('--', '');
        resultOpt[key] = value;
    }
    return resultOpt;
}, {});
if (options.projectEnter) {
    const ProjectPackInstance = webpack_1.ProjectPack.getInstance();
    const ServerInstance = server_1.Server.getInstance();
    config_1.BaseConfig.init({
        projectEnter: options.projectEnter
    });
    ProjectPackInstance.startProjectPack({
        onFirstInit: () => {
            ServerInstance.startServer();
        }
    });
}
