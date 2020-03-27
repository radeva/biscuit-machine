import React from 'react';

export const SWITCH_STATES = {
    ON: 'ON',
    OFF: 'OFF',
    PAUSE: 'PAUSE'
}
  
export default class Switch extends React.Component {
    constructor(props) {
      super(props);
      this.handleClickOn = this.handleClickOn.bind(this);
      this.handleClickPause = this.handleClickPause.bind(this);
      this.handleClickOff = this.handleClickOff.bind(this);
    }

    // TODO: Use one method only ???
    handleClickOn(e) {
      this.props.onSwitchClick(SWITCH_STATES.ON);
    }
  
    handleClickOff(e) {
      this.props.onSwitchClick(SWITCH_STATES.OFF);
    }
  
    handleClickPause(e) {
      this.props.onSwitchClick(SWITCH_STATES.PAUSE);
    }
  
    render() {
      const activeState = this.props.switchState,
        isPauseDisabled = activeState !== SWITCH_STATES.ON;
      return (
        <div className="switch-container">
          <div>Switch</div>
          <SwitchButton name={SWITCH_STATES.ON} activeButtonName={activeState} onClick={this.handleClickOn}/>
          <SwitchButton name={SWITCH_STATES.PAUSE} disabled={isPauseDisabled} activeButtonName={activeState} onClick={this.handleClickPause}/>
          <SwitchButton name={SWITCH_STATES.OFF} activeButtonName={activeState} onClick={this.handleClickOff}/>
        </div>
      );
    }
  }
  
class SwitchButton extends React.Component {
  
    constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
    }
  
    handleClick(e) {
      this.props.onClick(e.target.innerHTML);
    }
  
    render() {
      let buttonClassName = 'switch-button';
      const buttonName = this.props.name;
      if(this.props.activeButtonName === buttonName) {
        buttonClassName += ' ' + buttonClassName + '-active';
      }
  
      return (
        <button className={buttonClassName} onClick={this.handleClick} disabled={this.props.disabled}> {buttonName} </button>
      )
    }
}