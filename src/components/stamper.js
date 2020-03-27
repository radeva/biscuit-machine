import React from 'react';
import {ReactComponent as StamperSVG} from './../images/stamper.svg';
import {ReactComponent as StamperPusherSVG} from './../images/stamper-pusher.svg';
import {ReactComponent as RawBiscuitSVG} from './../images/raw-biscuit.svg';

export default function Stamper(props) {
    
    let doughElement = '',
        animationPausedClass = '',
        stamperPusherClassName = 'stamper-pusher ';

    if(props.isMachineMovementOn){
        stamperPusherClassName += 'stamper-pusher-on ';
    }
    else if(props.isMachineMovementPaused){
        animationPausedClass = 'animation-paused';
        stamperPusherClassName += 'stamper-pusher-on ' + animationPausedClass;
    }

    if(props.hasBiscuitToStamp) {
        doughElement=(
            <RawBiscuitSVG className={'raw-biscuit ' + animationPausedClass}/>
        );
    }
    return (
        <div className='stamper left'>
                <StamperSVG />
                <StamperPusherSVG className={stamperPusherClassName} />
            {doughElement}
        </div>
    );
}