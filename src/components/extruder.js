import React, { useEffect } from 'react';

export default function Extruder(props) {

    useEffect(() => {
        if(props.shouldUsePulse) {
            setTimeout(props.onPulseUsed, 2000);
        }
    });

    let doughElement = '';
    if(props.shouldUsePulse){
        doughElement=<div>oOo</div>;
    }

    return (
        <div className='extruder left'>
            <div>EXTRUDER HERE</div>
            {doughElement}
        </div>
    );
}