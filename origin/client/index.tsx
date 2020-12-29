import React, { Component, Props, ClassAttributes, ReactElement } from 'react';
import { Route,StaticRouter, BrowserRouter } from 'react-router-dom';

interface customProps extends ClassAttributes<any>{
    route:{
        path:string,
        view:ReactElement
    }[],
    staticPath?:string
}

export class ServerRoute extends Component<customProps>{
    constructor(props:any){
        super(props);
    }
    render(){
        const { route, staticPath } = this.props;
        return (
            <StaticRouter location={staticPath}>
                <BaseRoute route={route}/>
            </StaticRouter>
        )
    }
}

export class ClientRoute extends Component<customProps>{
    constructor(props:any){
        super(props);
    }
    render(){
        const { route } = this.props;
        return (
            <BrowserRouter>
                <BaseRoute route={route}/>
            </BrowserRouter>
        )
    }
}

export class BaseRoute extends Component<customProps>{
    constructor(props:any){
        super(props);
    }
    render(){
        const { route } = this.props;
        const _route = ( route || [] ).map(R => {
            return {
                path:R.path,
                view:R.view
            }
        })
        return (
            <>
                {
                    (_route || []).map( routeInfo => {
                        const { path, view }  = routeInfo;
                        
                        return (
                            <Route path={path} exact component={view as any}/>
                        )
                    } )
                }
            </>
        )
    }
}

const DefaultLayout = (props:any) => {
    return (
        <html lang="zh">
        <head>
            <meta charSet="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>hahahaha</title>
        </head>
        <body>
            {props?.content}
        </body>
        <script src='/hydrate.js' />
        </html>
    )
}

export {
    DefaultLayout
};