import express,{ Express } from 'express'
import path from 'path'
import React from 'react';
import { renderToString } from 'react-dom/server';
import { DefaultLayout, ServerRoute } from '../client';
import { BaseConfig } from '../config';

let projectServer:Server;

export class Server {
    static app: Express
    static port:number=3001
    constructor(){
        if(projectServer){
            throw Error('ERROR')
        }else{
            Server.app = express();
        }
    }
    static getInstance(){
        if(!projectServer){
            projectServer = new Server();
            return projectServer
        }
        return projectServer;
    }
    startServer=()=>{
        const config = BaseConfig.projectConfig;
        const { projectEnter, webpackConfig } = config;
        const output = webpackConfig?.output || 'publish';
        const peojectEnterUMD = require(path.resolve(output)).default;
        debugger;
        Server.app.use(express.static(path.resolve(output)));
        
        Server.app.use('/',(req,res,next)=> {
            const serverRouteElement = React.createElement(ServerRoute, {
                route:peojectEnterUMD,
                staticPath:req.path
            })
            const Layout = React.createElement(DefaultLayout,{
                content: serverRouteElement,
            })
            const HTMLString = renderToString(Layout);
            
            res.send(HTMLString)
        });
        Server.app.listen(Server.port, () => {
            console.log(`server start at : http://localhost:${Server.port}`);
        })
    }
}