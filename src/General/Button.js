import React from 'react';
import './Button.css';

const Button = ({clickAction, title, className})=> <button onClick={clickAction} className={className}>{title}</button>

export default Button;