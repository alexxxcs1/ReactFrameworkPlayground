export interface IConfig {
    projectEnter:string,
    webpackConfig?:IWebpackConfig,
}
export type TDefaultConfig = Pick<
    IConfig,
    'webpackConfig'
>

export interface IWebpackConfig{
    output?:string
}