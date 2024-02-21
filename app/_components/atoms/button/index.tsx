import React from 'react';
import Link from 'next/link';
import './index.scss'

type ButtonProps = {
    type: 'primary' | 'secondary';
    size: 'normal' | 'small';
    withArrow?: boolean;
    children: React.ReactNode;
    disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({ type = 'primary', size = 'normal', children, disabled, ...props }) => {

    let buttonClass = "components-btn"

    if (type === 'primary') {
        buttonClass += " components-btn--primary"
    } else if (type === 'secondary') {
        buttonClass += " components-btn--secondary"
    }

    if (size === 'small') {
        buttonClass += " components-btn--small"
    } else if (size === 'normal') {
        buttonClass += " components-btn--normal"
    }

    return <button className={buttonClass} disabled={disabled} {...props}>{children}</button>;
};

type ButtonLinkProps = ButtonProps & {
    href: string;
};

const ButtonLink: React.FC<ButtonLinkProps> = ({ href, ...props }) => {
    return (
        <Link href={href}>
            <Button {...props} />
        </Link>
    );
};

export { Button, ButtonLink };