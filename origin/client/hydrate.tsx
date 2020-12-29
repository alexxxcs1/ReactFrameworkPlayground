import { BaseConfig } from "../config"
import fs from 'fs';
import path from 'path'
// import React from 'react';
// import ReactDom from 'react-dom';
// import Vendor from '../../demopage/'
// ReactDom.hydrate(<ClientRoute route={Vendor as any} />, document.body)

export const createHydrateFile = (onDone:(path:string)=>void) => {
    const { webpackConfig } = BaseConfig.projectConfig;
    const output = webpackConfig?.output;
    if (!output) return;
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
    const hydratePath = path.join(path.resolve(output),'hydrate.js');
    fs.writeFile(hydratePath, hydrateTemplate, (err) => {
      if (err) throw err;
      onDone(hydratePath);
    });
}