import React, { Component, createRef } from "react";

// import stroke from "./keyStroke.wav";
// import tink from "./tink.wav";
// import ride from "./ride.wav";
import { connect } from "react-redux";

class Sounds extends Component {
  constructor(props) {
    super(props);
    this.passed = createRef();
    this.missed = createRef();
    this.sticky = createRef();
    this.canPlay = true;
  }
  componentWillUpdate({ sound, capsOn, sticky }) {
    if (sound) {
      this.play(sound);
    }
    if (capsOn || sticky) {
      this.play("sticky");
    }
  }
  play(sound) {
    this.playAudio(this[sound].current);
  }

  playAudio(ref) {
    if (!this.canPlay) return;

    if (ref.currentTime > 0) {
      ref.currentTime = 0;
    }

    ref
      .play()
      .then((done) => (this.canPlay = true))
      .catch((error) => (this.canPlay = true));
  }
  render() {
    return (
      <template>
        <audio
          src="C:\Users\hp\Music\src_sounds_keyStroke (1).wav"
          ref={this.passed}
        />
        <audio src="C:\Users\hp\Music\ride.wav" ref={this.sticky} />
        <audio src="C:\Users\hp\Music\src_sounds_ride.wav" ref={this.missed} />
      </template>
    );
  }
}

const mapStateToProps = ({ courses, keyboard }) => ({
  sound: courses.get("sound"),
  sticky: keyboard.get("sticky"),
  capsOn: keyboard.get("capsOn"),
});

export default connect(mapStateToProps, null)(Sounds);
