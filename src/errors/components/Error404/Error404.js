import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Card, Col} from "reactstrap";
import "./Error404.scss";


class Error404 extends Component{

  constructor(props){
    super(props);

    this.maxSeconds = 60;
    this.maxMinutes = 60;
    this.tickInterval = 1000;

    this.state = {
      hour: 0,
      minutes: 1,
      seconds: 30,
    };


    this.timerInterval = setInterval(this.tick, this.tickInterval);
  }

  tick =() =>{
    if (this.isEndTimer()){
      clearInterval(this.timerInterval);
      document.location.href = "/";
      return;
    }




    if (this.state.minutes === 0 && this.state.seconds === 0) {
      this.setState({hour: this.state.hour-1});
      this.setState({minutes: this.maxMinutes});
    }
    if (this.state.seconds === 0){
      this.setState({minutes: this.state.minutes-1});
      this.setState({seconds: this.maxSeconds});

    }
    this.setState({seconds: this.state.seconds-1});
  };

  isEndTimer(){
    if (this.state.hour === 0 && this.state.minutes === 0 && this.state.seconds === 0){
      return true;
    }
    return false;
  }

  render() {
    return (
      <Col lg="12" className="justify-content-center align-items-center">
        <Card className="text-center text-dark error__container">
          <h1 className="error__header">404</h1>
          <p className="error__info">Не теряйте <span className="error__span">время</span>, переходите на -> <Link className="error__link" to="/">Главную</Link></p>
          <div className="error__hand">
            <div className="error__timer">{this.state.hour} : {this.state.minutes} : {this.state.seconds}</div>
          </div>
        </Card>
      </Col>
    );
  }

}

export default Error404;