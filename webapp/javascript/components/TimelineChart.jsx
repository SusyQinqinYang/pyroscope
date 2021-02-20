import { connect } from "react-redux";
import "react-dom";
import React from "react";

import ReactFlot from "react-flot";
import "react-flot/flot/jquery.flot.time.min";
import "react-flot/flot/jquery.flot.selection.min";
import "react-flot/flot/jquery.flot.crosshair.min";
import { bindActionCreators } from "redux";
import { setDateRange } from "../redux/actions";
import { formatAsOBject } from "../util/formatDate";

class TimelineChart extends ReactFlot {
  constructor() {
    super();
  }

  componentDidMount() {
    this.draw();
    
    $(`#${this.props.id}`).bind("plotselected", (event, ranges) => {
      this.props.actions.setDateRange(
        Math.round(ranges.xaxis.from / 1000),
        Math.round(ranges.xaxis.to / 1000)
      );
    });

    $(`#${this.props.id}`).bind("plothover", (evt, position) => {
      if (position) {
        this.lockCrosshair({
          x: item.datapoint[0],
          y: item.datapoint[1],
        });
      } else {
        this.unlockCrosshair();
      }
    });
  }

  componentDidUpdate() {
    // this.props.options.grid.markings = this.plotMarkings();
    console.log('counting updates')
    this.draw();
  }

  // render = () => {
  //   return (
  //     <ReactFlot id={this.props.id} options={this.props.options} data={this.props.data || [[0, 0]]} width={this.props.width} height="100px" />
  //   )
  // }
}

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      setDateRange,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(TimelineChart);
