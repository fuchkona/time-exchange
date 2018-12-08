import React, {Component} from 'react';
import './LoadingAnimationMini.scss';

class LoadingAnimationMini extends Component {

  render() {
    return (
      <div id="warningGradientOuterBarG">
        <div id="warningGradientFrontBarG" className="warningGradientAnimationG">
          <div className="warningGradientBarLineG">
          </div>
          <div className="warningGradientBarLineG">
          </div>
          <div className="warningGradientBarLineG">
          </div>
          <div className="warningGradientBarLineG">
          </div>
          <div className="warningGradientBarLineG">
          </div>
          <div className="warningGradientBarLineG">
          </div>
        </div>
      </div>
    );
  }
}

export default LoadingAnimationMini;