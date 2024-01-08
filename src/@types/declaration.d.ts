declare module '*.scss' {
    const classes: { [key: string]: string };
    export default classes;
}
declare module '*.css' {
    const classes: { [key: string]: string };
    export default classes;
}
declare module '*.jpg';
declare module '*.png';
declare module '*.svg?react';

declare type AnyObject = Record<string, unknown>;

declare module '@hookform/resolvers/yup' {
    export function yupResolver(yupSchema: any): Resolver;
}
