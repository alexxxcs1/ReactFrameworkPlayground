"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHydrateFile = void 0;
const config_1 = require("../config");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// import React from 'react';
// import ReactDom from 'react-dom';
// import Vendor from '../../demopage/'
// ReactDom.hydrate(<ClientRoute route={Vendor as any} />, document.body)
exports.createHydrateFile = (onDone) => {
    const { webpackConfig } = config_1.BaseConfig.projectConfig;
    const output = webpackConfig === null || webpackConfig === void 0 ? void 0 : webpackConfig.output;
    if (!output)
        return;
    let hydrateTemplate = `
import React from 'react';
import ReactDom from 'react-dom';
import ProjectRouter from './'
import { Route,BrowserRouter } from 'react-router-dom';
ReactDom.hydrate(<BrowserRouter>
    {
        (ProjectRouter || []).map( routeInfo => {
            const { path, view }  = routeInfo;
            
            return (
                <Route path={path} exact component={view}/>
            )
        } )
    }
</BrowserRouter>, document.body);
    `;
    const hydratePath = path_1.default.join(path_1.default.resolve(output), 'hydrate.js');
    fs_1.default.writeFile(hydratePath, hydrateTemplate, (err) => {
        if (err)
            throw err;
        onDone(hydratePath);
    });
};
