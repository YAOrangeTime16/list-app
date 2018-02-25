import React from 'react';
import './Button.css';

const Button = ({clickAction, title, classname})=> <button onClick={clickAction} className={classname}>{title}</button>

export default Button;