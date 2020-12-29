"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseConfig = void 0;
let configClass;
class BaseConfig {
    constructor(config) {
        if (configClass) {
            throw Error('ERROR');
        }
        else {
            BaseConfig.projectConfig = BaseConfig.mergeConfig(config);
        }
    }
    static init(config) {
        if (!configClass) {
            configClass = new BaseConfig(config);
        }
    }
}
exports.BaseConfig = BaseConfig;
BaseConfig.defaultConfig = {
    webpackConfig: {
        output: 'project'
    }
};
BaseConfig.mergeConfig = (config) => {
    return Object.assign({}, BaseConfig.defaultConfig, config);
};
