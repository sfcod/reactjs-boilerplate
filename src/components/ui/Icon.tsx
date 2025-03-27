import React from 'react';
import SvgSprite from './assets/svg/svg-sprite.svg';
import classNames from 'classnames';
import styles from './assets/icon.module.scss';

interface Props {
    className?: string;
    width?: number;
    height?: number;
    name?: string;
    color?: string;
    innerWidth?: number;
    innerHeight?: number;
}
const Icon: React.FunctionComponent<Props> = ({ className, width, height, innerWidth, innerHeight, name, color }) => {
    return (
        <svg
            aria-hidden={true}
            focusable={false}
            role={'img'}
            width={width}
            height={height}
            className={classNames('icon', styles.icon, className)}
        >
            <use width={innerWidth} height={innerHeight} xlinkHref={`${SvgSprite}#${name}`} fill={color} />
        </svg>
    );
};

export default Icon;
