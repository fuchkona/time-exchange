import React, {Component} from 'react';
import './LoadingAnimation.scss';

class LoadingAnimation extends Component {

  render() {
    return (
      <div className="animation_holder panel panel-default">
        <div className="cube3d__container">
          <div className="cube3d__side cube3d__top"/>
          <div className="cube3d__side cube3d__bottom"/>
          <div className="cube3d__side cube3d__left"/>
          <div className="cube3d__side cube3d__right"/>
          <div className="cube3d__side cube3d__back"/>
          <div className="cube3d__side cube3d__front"/>
        </div>
      </div>
    );
  }
}

export default LoadingAnimation;