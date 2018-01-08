import React from 'react'
import Lottie from 'react-lottie';
import * as animationData from '../images/loader-w200-h200.json'
import {toCurrency, nextSection} from '../lib/Utility.jsx';


class ResultsIndicator extends React.Component {

  constructor(props) {
    super(props);
    this.state = {initially_viewed: false};
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.show_footer_impact !== this.props.show_footer_impact) {
      this.fadeFooter(nextProps.show_footer_impact);
    }
  }

  fadeFooter = (show_footer) => {
    console.log('show: ' + show_footer);
    if(show_footer && this.state.initially_viewed) {
      $('.impact_indicator').css("display", "block").hide().fadeIn();
    } else {
      this.setState({initially_viewed: true});
      $('.impact_indicator').fadeOut();
    }
  }

  net_profit = () => { return this.props.net_impact >= 0 }
  displayImpact = () => { return toCurrency(Math.abs(this.props.net_impact))}

  render() {
    const defaultOptions = { loop: true, autoplay: true, animationData: animationData }
    return (
      <div className="impact_indicator no_print">
        <div className="card">
          <div className="row calculating">
              <div className="spinner">
                <Lottie options={defaultOptions} isStopped={! this.props.loading} isPaused={false}/>
              </div>
          </div>
          <div className="row calculate_success">
            <div className="col-xs-8">Estimated {this.net_profit() ? 'gain' : 'loss'} per month*</div>
            <div className="col-xs-4 net_impact text-right">
              {this.displayImpact()}<span className="label_lg">/mo</span>
            </div>
          </div>
        </div>

      </div>

    )
  }
}


export default ResultsIndicator
