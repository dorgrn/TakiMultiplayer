import React from "react";
import "../css/styleStatsMenu.css";
import stats from "../engine/Stats";

export default class StatsBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time: ""
    };
  }

  componentDidMount() {
    this.elapsedTimeInterval = setInterval(() => {
      this.setState(() => ({
        time: stats.getElapsedTime()
      }));
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.elapsedTimeInterval);
  }

  render() {
    return (
      <div>
        <div className={"stats-bar"}>
          <img src="../src/textures/bar.png" id={"stats-bar"} />
          <div className={"stats-bar-content"}>
            <div className={"stats-bar-text"}>
              Time:{" "}
              {this.props.inShowMode
                ? this.props.stats.gameElapsedTime
                : this.state.time}
            </div>
            <div className={"stats-bar-text"}>
              Turn no. {this.props.stats.turnAmount}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
