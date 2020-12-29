import { BaseConfig } from "../config";
import { Server } from "../server";
import { ProjectPack } from "../webpack";
import { ICoustomConfig } from "./interface";


const argv = process.argv;
const [ nodepath, codepath, ...optionsArray ] = argv || [];

const options = optionsArray.reduce( (resultOpt:ICoustomConfig, optionString) => {
    const [ _key, value ] = optionString.split('=');
    if (_key.indexOf('--') >= 0) {
        const key = _key.replace('--','');
        resultOpt[key] = value;
    }
    return resultOpt;
}, { } as ICoustomConfig );

if (options.projectEnter){
    const ProjectPackInstance = ProjectPack.getInstance();
    const ServerInstance = Server.getInstance();
    BaseConfig.init({
        projectEnter:options.projectEnter
    });
    ProjectPackInstance.startProjectPack({
        onFirstInit:()=>{
            ServerInstance.startServer();
        }
    });
}