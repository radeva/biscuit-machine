import React from 'react';

export default function Stamper(props) {
    
    let doughElement = '';
    if(props.hasBiscuitToStamp){
        doughElement=<div>oOo</div>;
    }
    return (
        <div className='stamper left'>
            <div>STAMPER HERE</div>
            {doughElement}
        </div>
    );
}