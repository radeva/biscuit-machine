import React from 'react';

export default function Extruder(props) {

    let doughElement = '';
    if(props.shouldPushNewBiscuit){
        doughElement=<div>oOo</div>;
    }

    return (
        <div className='extruder left'>
            <div>EXTRUDER HERE</div>
            {doughElement}
        </div>
    );
}