"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const react_1 = __importDefault(require("react"));
const server_1 = require("react-dom/server");
const client_1 = require("../client");
const config_1 = require("../config");
let projectServer;
class Server {
    constructor() {
        this.startServer = () => {
            const config = config_1.BaseConfig.projectConfig;
            const { projectEnter, webpackConfig } = config;
            const output = (webpackConfig === null || webpackConfig === void 0 ? void 0 : webpackConfig.output) || 'publish';
            const peojectEnterUMD = require(path_1.default.resolve(output)).default;
            debugger;
            Server.app.use(express_1.default.static(path_1.default.resolve(output)));
            Server.app.use('/', (req, res, next) => {
                const serverRouteElement = react_1.default.createElement(client_1.ServerRoute, {
                    route: peojectEnterUMD,
                    staticPath: req.path
                });
                const Layout = react_1.default.createElement(client_1.DefaultLayout, {
                    content: serverRouteElement,
                });
                const HTMLString = server_1.renderToString(Layout);
                res.send(HTMLString);
            });
            Server.app.listen(Server.port, () => {
                console.log(`server start at : http://localhost:${Server.port}`);
            });
        };
        if (projectServer) {
            throw Error('ERROR');
        }
        else {
            Server.app = express_1.default();
        }
    }
    static getInstance() {
        if (!projectServer) {
            projectServer = new Server();
            return projectServer;
        }
        return projectServer;
    }
}
exports.Server = Server;
Server.port = 3001;
