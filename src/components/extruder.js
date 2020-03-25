import React, { useEffect } from 'react';

export default function Extruder(props) {

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
        <div className='extruder left'>
            <div>EXTRUDER HERE</div>
            {doughElement}
        </div>
    );
}