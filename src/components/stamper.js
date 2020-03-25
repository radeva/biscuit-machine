import React, { useEffect } from 'react';

export default function Stamper(props) {
    
    useEffect(() => {
        if(props.shouldUsePulse) {
            props.onMarkPulseInUse();
            setTimeout(props.onPulseUsed, 2000);
        }
    });
    
    let doughElement = '';
    if(props.shouldShowBiscuit){
        doughElement=<div>oOo</div>;
    }
    return (
        <div className='stamper left'>
            <div>STAMPER HERE</div>
            {doughElement}
        </div>
    );
}