import React from 'react';
import { toCurrency, nextSection } from '../lib/Utility.js';

/**
 * Floating footer that shows the net impact once the results screen has already been viewed
 */
class ResultsIndicator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { initially_viewed: false };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show_footer_impact !== this.props.show_footer_impact) {
      this.fadeFooter(nextProps.show_footer_impact);
    }
  }

  fadeFooter = show_footer => {
    if (show_footer) {
      // && this.state.initially_viewed) {
      $('.impact_indicator')
        .css('display', 'block')
        .hide()
        .fadeIn();
    } else {
      this.setState({ initially_viewed: true });
      $('.impact_indicator').fadeOut();
    }
  };

  net_profit = () => {
    return this.props.net_impact >= 0;
  };
  displayImpact = () => {
    return toCurrency(this.props.net_impact);
  };

  // {/* <polyline className='letter' points='41,31 41,59 69,59' /> */}
  render() {
    return (
      <div className="impact_indicator no_print">
        <div className="ccl_card">
          <div className="row calculating">
            <div className="spinner">
              <svg className="wait_spinner" xmlns="http//www.w3.org/2000/svg" viewBox="0 0 100 100">
                <circle className="green_circle" cx="50" cy="50" r="45" strokeDasharray="141.37" />
                <circle className="blue_circle" cx="50" cy="50" r="30" strokeDasharray="94.248" />
              </svg>
            </div>
          </div>
          <div className="row calculate_success">
            <div className="col-md-8 col-xs-9 estimate_message">Net benefit per month*</div>
            <div className="col-md-4 col-xs-3 net_impact text-right">
              {this.displayImpact()}
              <span className="label_lg">/mo</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ResultsIndicator;
