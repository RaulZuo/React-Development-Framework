import React from 'react';
import ReactDOM from 'react-dom';
import Comp1 from './Component/component1.js';
import './style.less';

ReactDOM.render(
    <div className="main">
        react es2015 demo;
        <Comp1 />
    </div>,
    document.getElementById('comp')
);