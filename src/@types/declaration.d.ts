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

declare type AnyObject = Record<string, any>;
