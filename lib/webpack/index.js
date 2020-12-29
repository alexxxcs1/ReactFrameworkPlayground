"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectPack = void 0;
const webpack_1 = __importDefault(require("webpack"));
const config_1 = require("../config");
const path_1 = __importDefault(require("path"));
const hydrate_1 = require("../client/hydrate");
let projectPackInstance;
class ProjectPack {
    constructor() {
        this.startProjectPack = (option) => {
            const { onFirstInit } = option;
            const config = config_1.BaseConfig.projectConfig;
            const { projectEnter, webpackConfig } = config;
            const output = (webpackConfig === null || webpackConfig === void 0 ? void 0 : webpackConfig.output) || 'publish';
            const compile = webpack_1.default({
                entry: {
                    index: path_1.default.resolve(projectEnter)
                },
                module: {
                    rules: [
                        {
                            test: /\.(js|jsx)$/,
                            use: [{
                                    loader: 'babel-loader',
                                    options: {
                                        presets: ['@babel/preset-react']
                                    }
                                }],
                            resolve: {
                                extensions: ['.js', '.jsx']
                            },
                        }
                    ]
                },
                output: {
                    publicPath: '',
                    path: path_1.default.resolve(output),
                    filename: '[name].js',
                    //libraryTarget = umd 
                    //node&浏览器支持
                    libraryTarget: 'umd',
                    umdNamedDefine: true,
                    globalObject: 'this',
                }
            });
            //监听project变化
            compile.watch({
                aggregateTimeout: 300,
                poll: undefined
            }, (error, stats) => {
                if (!error) {
                    this.hydratePack(() => {
                        ProjectPack.packageCount = ++ProjectPack.packageCount;
                        if (ProjectPack.packageCount === 1) {
                            onFirstInit && onFirstInit();
                        }
                    });
                }
            });
        };
        this.hydratePack = (callback) => {
            const config = config_1.BaseConfig.projectConfig;
            const { projectEnter, webpackConfig } = config;
            const output = (webpackConfig === null || webpackConfig === void 0 ? void 0 : webpackConfig.output) || 'publish';
            hydrate_1.createHydrateFile((hydratePath) => {
                webpack_1.default({
                    target: 'web',
                    entry: {
                        hydrate: path_1.default.resolve(hydratePath)
                    },
                    module: {
                        rules: [
                            {
                                test: /\.(js|jsx)$/,
                                use: [{
                                        loader: 'babel-loader',
                                        options: {
                                            presets: ['@babel/preset-react']
                                        }
                                    }],
                                resolve: {
                                    extensions: ['.js', '.jsx']
                                },
                            }
                        ]
                    },
                    output: {
                        path: path_1.default.resolve(output),
                        filename: '[name].js',
                    },
                }, (error, result) => {
                    var _a, _b;
                    if ((((_a = result === null || result === void 0 ? void 0 : result.compilation) === null || _a === void 0 ? void 0 : _a.errors) || []).length)
                        throw Error((_b = result === null || result === void 0 ? void 0 : result.compilation) === null || _b === void 0 ? void 0 : _b.errors);
                    callback(true);
                });
            });
        };
        if (projectPackInstance) {
            throw Error('ERROR');
        }
    }
    static getInstance() {
        if (!projectPackInstance) {
            projectPackInstance = new ProjectPack();
            return projectPackInstance;
        }
        return projectPackInstance;
    }
}
exports.ProjectPack = ProjectPack;
ProjectPack.packageCount = 0;
