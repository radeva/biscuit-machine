import React, { useState } from 'react';
import { SWITCH_STATES } from './switch';
import useInterval from 'react-useinterval';

const 
    OVEN_MIN_TEMPERATURE = 220,
    OVEN_MAX_TEMPERATURE = 240,
    HEAT_OVEN_STEP = 2,
    HEAT_OVEN_INTERVAL_IN_SECONDS = 100,
    COOLDOWN_OVEN_INTERVAL_IN_SECONDS = 1000,
    COOLDOWN_OVEN_STEP = 2,
    WARMUP_OVEN_INTERVAL_IN_SECONDS = 1000,
    WARMUP_OVEN_STEP = 2,
    INITIAL_TEMPERATURE = 40;


export default function Oven(props) {
    const [temperature, setTemperature] = useState(INITIAL_TEMPERATURE),
        [isOn, setIsOn] = useState(false),
        [isWarmingUp, setIsWarmingUp] = useState(false);
    
    
    const isOvenOn = props.switchState !== SWITCH_STATES.OFF || props.hasBiscuitOnConveyor;
    if((!isOn && isOvenOn) || (isOn && !isOvenOn)){
        setIsOn(isOvenOn);
    }

    const shouldTemperatureGoUp = 
            isOn && 
            temperature < OVEN_MIN_TEMPERATURE,
        shouldTemperatureGoDown = 
            !isOn && 
            temperature > INITIAL_TEMPERATURE && 
            temperature <= OVEN_MIN_TEMPERATURE,
        shouldWarmUp = 
            (isOn || props.hasBiscuitOnConveyor) && 
            (temperature === OVEN_MIN_TEMPERATURE || 
                (isWarmingUp && temperature > OVEN_MIN_TEMPERATURE && temperature < OVEN_MAX_TEMPERATURE)) ,
        shouldCoolDown = 
            temperature === OVEN_MAX_TEMPERATURE || 
            ((!isWarmingUp || !isOn) && temperature > OVEN_MIN_TEMPERATURE && temperature < OVEN_MAX_TEMPERATURE);

    const calculateTemperatureDown = () => {
        if(temperature === INITIAL_TEMPERATURE) {
            return;
        }
        setTemperature(temperature - HEAT_OVEN_STEP);
    }

    const calculateTemperatureUp = () => {
        const newTemperature = temperature + HEAT_OVEN_STEP;
        setTemperature(newTemperature);
        
        if(newTemperature === OVEN_MIN_TEMPERATURE) {
            console.log('oven, temperature reached')
            props.handleOvenReady(true);
        }
    }

    const coolDown = () => {
        setIsWarmingUp(false);
        setTemperature(temperature - COOLDOWN_OVEN_STEP);
    }

    const warmUp = () => {
        setIsWarmingUp(true);
        setTemperature(temperature + WARMUP_OVEN_STEP);
    }

    useInterval(calculateTemperatureUp, shouldTemperatureGoUp ? HEAT_OVEN_INTERVAL_IN_SECONDS : null);
    useInterval(calculateTemperatureDown, shouldTemperatureGoDown ? HEAT_OVEN_INTERVAL_IN_SECONDS : null);
    useInterval(coolDown, shouldCoolDown ? COOLDOWN_OVEN_INTERVAL_IN_SECONDS : null);
    useInterval(warmUp, shouldWarmUp ? WARMUP_OVEN_INTERVAL_IN_SECONDS : null);

    let ovenLightClassName = 'oven-light';
    if(isOn){
        ovenLightClassName += ' ' + ovenLightClassName + '-on';
    }

    let biscuitElement = '';
    if(props.hasBiscuitToBake) {
        biscuitElement=<div>oOo</div>;
    }

    return (
        <div className='oven right' >
            <label>GORENJE</label><span className={ovenLightClassName}>&#8226;</span><br />
            <label>{temperature}<span>&#8451;</span></label>
            {biscuitElement}
        </div>
    );
}
