import { IConfig, TDefaultConfig } from "./interface";

let configClass: BaseConfig;
export class BaseConfig {
    static projectConfig:IConfig
    static defaultConfig:TDefaultConfig={
        webpackConfig:{
            output:'project'
        }
    }
    static mergeConfig = (config:IConfig) => {
        return Object.assign({}, BaseConfig.defaultConfig, config);
    }
    static init(config:IConfig){
        if(!configClass){
            configClass = new BaseConfig(config);
        }
    }
    constructor(config:IConfig){
        if(configClass){
            throw Error('ERROR')
        }else{
            BaseConfig.projectConfig = BaseConfig.mergeConfig(config);
        }
    }
    
} 