import React from 'react';

const Layout = (props) => {
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

export default Layout;