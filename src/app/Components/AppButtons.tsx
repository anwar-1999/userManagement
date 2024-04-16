import React from 'react';
import { Button } from 'antd';
import styles from '../style/AppButtons.module.scss'



export default function AppButtons(props: any) {
    const {
        buttonType,
        text,
        onClick,
        htmlType,
        form,
        disabled,
        block,
        children,
        value,
        id,
        fontSize,
        width
    } = props;

    return (
        <div 
        className="app-buttons-container"
            style={
                width &&
                { width: width }
            }
        >
            <Button
                className={buttonType}
                onClick={onClick}
                htmlType={htmlType}
                form={form}
                disabled={disabled}
                block={block}
                value={value}
                id={id}
                style={{ fontSize: ` ${fontSize}px !important` }}
            >
                {children}
                {text}
            </Button>

        </div>
    );
}

