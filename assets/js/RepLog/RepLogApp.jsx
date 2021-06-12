import React, {Component} from "react";

export default class ReplogApp extends Component {
  render() {
    let heart = ''
    if (this.props.withHeart) {
      heart = <span>❤️</span>
    }

    return (
      <h2>Lift Stuff! {heart}</h2>
    );
  }
}
