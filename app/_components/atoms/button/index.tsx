import React from 'react';
import Link from 'next/link';
import './index.css'

type ButtonProps = {
    type: 'primary' | 'secondary';
    size: 'normal' | 'small';
    withArrow?: boolean;
    children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ type = 'primary', size = 'normal', children }) => {

    let buttonClass = "btn"

    if (type === 'primary') {
        buttonClass += " btn-primary"
    } else if (type === 'secondary') {
        buttonClass += " btn-secondary"
    }

    if (size === 'small') {
        buttonClass += " btn-small"
    } else if (size === 'normal') {
        buttonClass += " btn-normal"
    }

    return <button className={buttonClass}>{children}</button>;
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