import React from 'react';
import {ReactComponent as ExtruderSVG} from './../images/extruder.svg';
import {ReactComponent as BiscuitDoughSVG} from './../images/biscuit-dough.svg';

export default function Extruder(props) {

    let doughElement = '',
        animationPausedClass = '';
    if(props.isMachineMovementPaused) {
        animationPausedClass = 'animation-paused';
    }
    if(props.shouldPushNewBiscuit){
        doughElement=<BiscuitDoughSVG className={'biscuit-dough ' + animationPausedClass}/>;
    }

    return (
        <div className='extruder left'>
            <div><ExtruderSVG /></div>
            {doughElement}
        </div>
    );
}