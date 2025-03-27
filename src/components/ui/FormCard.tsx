import type { PropsWithChildren } from 'react';
import React from 'react';
import classNames from 'classnames';
import styles from './assets/form-card.module.scss';

interface Props {
    className?: string;
    formWidth?: number;
}
interface TextProps {
    textWidth?: number;
    className?: string;
}

const FormCard: React.FC<PropsWithChildren<Props>> & {
    Image: React.FC<PropsWithChildren<Props>>;
    Heading: React.FC<PropsWithChildren<Props>>;
    Text: React.FC<PropsWithChildren<TextProps>>;
    Actions: React.FC<PropsWithChildren<Props>>;
} = ({ className, children, formWidth }) => {
    return (
        <div style={{ maxWidth: `${formWidth}px` }} className={classNames(styles.formWrap, className)}>
            {children}
        </div>
    );
};

FormCard.Image = ({ children, className }) => {
    return <div className={classNames(styles.formImage, className)}>{children}</div>;
};

FormCard.Heading = ({ children, className }) => {
    return <h1 className={classNames(styles.formHeading, className)}>{children}</h1>;
};

FormCard.Text = ({ children, textWidth, className }) => {
    return (
        <div style={{ maxWidth: `${textWidth}px` }} className={classNames(styles.formText, className)}>
            {children}
        </div>
    );
};

FormCard.Actions = ({ children, className }) => {
    return <div className={classNames(styles.formActions, className)}>{children}</div>;
};

export default FormCard;
