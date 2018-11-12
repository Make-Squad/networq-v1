import React, { Component } from "react";
import tracking from "tracking";
import face from "tracking/build/data/face";

class App extends Component {
  state = {};

  tracker = null;

  componentDidMount() {
    this.tracker = new window.tracking.ObjectTracker("face");
    this.tracker.setInitialScale(4);
    this.tracker.setStepSize(2);
    this.tracker.setEdgesDensity(0.1);

    window.tracking.track(this.refs.cameraOutput, this.tracker, {
      camera: true
    });
    this.tracker.on("track", event => {
      let context = this.refs.canvas.getContext("2d");
      context.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
      event.data.forEach(function(rect) {
        context.strokeStyle = "#a64ceb";
        context.strokeRect(rect.x, rect.y, rect.width, rect.height);
        context.font = "11px Helvetica";
        context.fillStyle = "#fff";
        context.fillText(
          "x: " + rect.x + "px",
          rect.x + rect.width + 5,
          rect.y + 11
        );
        context.fillText(
          "y: " + rect.y + "px",
          rect.x + rect.width + 5,
          rect.y + 22
        );
      });
    });
  }

  componentWillUnmount() {
    this.tracker.removeAllListeners();
  }

  render() {
    return (
      <div className="App">
        <div className="demo-frame">
          <div className="demo-container">
            <video
              ref="cameraOutput"
              width="320"
              height="240"
              preload
              autoPlay
              loop
              muted
            />
            <canvas ref="canvas" width="320" height="240" />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
