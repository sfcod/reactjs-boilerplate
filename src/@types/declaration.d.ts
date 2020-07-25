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

declare module 'react-widgets-simple-number' {
    const numberLocalizer: () => void;
    export default numberLocalizer;
}
