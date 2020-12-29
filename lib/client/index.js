"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultLayout = exports.BaseRoute = exports.ClientRoute = exports.ServerRoute = void 0;
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
class ServerRoute extends react_1.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { route, staticPath } = this.props;
        return (react_1.default.createElement(react_router_dom_1.StaticRouter, { location: staticPath },
            react_1.default.createElement(BaseRoute, { route: route })));
    }
}
exports.ServerRoute = ServerRoute;
class ClientRoute extends react_1.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { route } = this.props;
        return (react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
            react_1.default.createElement(BaseRoute, { route: route })));
    }
}
exports.ClientRoute = ClientRoute;
class BaseRoute extends react_1.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { route } = this.props;
        const _route = (route || []).map(R => {
            return {
                path: R.path,
                view: R.view
            };
        });
        return (react_1.default.createElement(react_1.default.Fragment, null, (_route || []).map(routeInfo => {
            const { path, view } = routeInfo;
            return (react_1.default.createElement(react_router_dom_1.Route, { path: path, exact: true, component: view }));
        })));
    }
}
exports.BaseRoute = BaseRoute;
const DefaultLayout = (props) => {
    return (react_1.default.createElement("html", { lang: "zh" },
        react_1.default.createElement("head", null,
            react_1.default.createElement("meta", { charSet: "UTF-8" }),
            react_1.default.createElement("meta", { name: "viewport", content: "width=device-width, initial-scale=1.0" }),
            react_1.default.createElement("title", null, "hahahaha")),
        react_1.default.createElement("body", null, props === null || props === void 0 ? void 0 : props.content),
        react_1.default.createElement("script", { src: '/hydrate.js' })));
};
exports.DefaultLayout = DefaultLayout;
