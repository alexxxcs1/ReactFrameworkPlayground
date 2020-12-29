import webpack from 'webpack';
import { BaseConfig } from '../config';
import path from 'path'
import { createHydrateFile } from '../client/hydrate';
import { IStartProjectPack } from './interface';

let projectPackInstance:ProjectPack ;

export class ProjectPack {
    static packageCount:number = 0;
    constructor(){
        if(projectPackInstance){
            throw Error('ERROR')
        }
    }
    static getInstance(){
        if(!projectPackInstance){
            projectPackInstance = new ProjectPack();
            return projectPackInstance
        }
        return projectPackInstance;
    }
    startProjectPack = (option:IStartProjectPack) => {
        const { onFirstInit } = option;
        const config = BaseConfig.projectConfig;
        const { projectEnter, webpackConfig } = config;
        const output = webpackConfig?.output || 'publish';
        const compile = webpack({
            entry:{
                index: path.resolve(projectEnter)
            },
            module:{
                rules:[
                    {
                        test:/\.(js|jsx)$/,
                        use:[{
                            loader:'babel-loader',
                            options:{
                                presets:['@babel/preset-react']
                            }
                        }],
                        resolve:{
                            extensions:['.js','.jsx']
                        },
                    }
                ]
            },
            output:{
                publicPath:'',
                path:path.resolve(output),
                filename:'[name].js',
                //libraryTarget = umd 
                //node&浏览器支持
                libraryTarget:'umd',
                umdNamedDefine:true,
                globalObject:'this',
            }
        });
        //监听project变化
        compile.watch({
            aggregateTimeout: 300,
            poll: undefined
        },(error, stats)=>{
            if(!error){
                this.hydratePack(()=>{
                    ProjectPack.packageCount = ++ProjectPack.packageCount;
                    if (ProjectPack.packageCount === 1) {
                        onFirstInit && onFirstInit();
                    }
                });
            }
        })
    }
    hydratePack = (callback:(result:boolean)=>void) => {
        const config = BaseConfig.projectConfig;
        const { projectEnter, webpackConfig } = config;
        const output = webpackConfig?.output || 'publish';
        
        createHydrateFile((hydratePath)=>{
            webpack({
                target:'web',
                entry: {
                    hydrate:path.resolve(hydratePath)
                },
                module:{
                    rules:[
                        {
                            test:/\.(js|jsx)$/,
                            use:[{
                                loader:'babel-loader',
                                options:{
                                    presets:['@babel/preset-react']
                                }
                            }],
                            resolve:{
                                extensions:['.js','.jsx']
                            },
                        }
                    ]
                },
                output: {
                    path:path.resolve(output),
                    filename:'[name].js',
                },
            },(error, result: any)=>{
                if ((result?.compilation?.errors || []).length) throw Error(result?.compilation?.errors);
                callback(true);
            });
        });
    }
}