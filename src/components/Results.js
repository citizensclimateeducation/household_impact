import React from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import { toCurrency, nextSection, startOver, tagEvent } from '../lib/Utility.js';

class Results extends React.Component {
  constructor(props) {
    super(props);
  }

  net_profit = () => {
    return this.props.results.net_impact >= 0;
  };
  displayImpact = () => {
    return toCurrency(this.props.results.net_impact);
  };

  impact_message = () => {
    const impact = this.props.results.net_impact;

    if (impact < -3.0) {
      return 'We estimate your carbon costs might exceed your dividends.';
    } else if (impact < 4.0) {
      return 'Good news! We estimate you are right around the break even point.';
    } else if (impact > 3.0) {
      return 'Great! We estimate you should end up with some extra money each year.';
    }

    return '';
  };

  resultsVisible = visible => {
    console.log('visible change...' + visible);
  };

  render() {
    // var VisibilitySensor = require('react-visibility-sensor');

    const share_url = 'https://citizensclimatelobby.org/calculator';
    const share_message = 'See how much money you can save while fighting climate change!';
    const share_media =
      'https://11bup83sxdss1xze1i3lpol4-wpengine.netdna-ssl.com/wp-content/uploads/2016/05/Household-Impact-Study-percent-benefited-by-zip-code.png';
    return (
      <div id="results" className="ccl_card initially_hidden">
        <div>
          <div className="form_title">Your Results</div>

          <div className="dividend_highlight">
            <div className="sub_heading">Your monthly carbon dividends will add up to</div>
            <div className="dividend">{this.props.results.div_post}</div>
            <div className="text-muted disclaimer">
              after tax based on household's number of adults, number of minors, and expected federal marginal tax rate.{' '}
              <a href="https://energyinnovationact.org/how-it-works/" target="_blank">
                Learn more about the dividend
              </a>
            </div>
          </div>

          <div className="result_details">
            <div className="sub_heading">Net outcome</div>

            <div className="result_detail_row">
              <div>
                Your monthly <strong>carbon dividends</strong>
              </div>
              <div>{this.props.results.div_post}</div>
            </div>
            <div className="result_detail_row">
              <div>
                Your average monthly <strong>carbon fee costs</strong>
              </div>
              <div>${this.props.results.carbon_cost}</div>
            </div>
            <div className="carbon_fee_details">
              <div className="text-muted disclaimer">
                Ranging from ${this.props.results.carbon_cost - 18} to ${this.props.results.carbon_cost + 18} depending
                on your lifestyle.
                <br />
                <a href="https://energyinnovationact.org/how-it-works/" target="_blank">
                  Learn more about the carbon fee
                </a>
              </div>
            </div>
          </div>

          <div className="impact_panel">
            <div className="result_detail_row">
              <div>
                <VisibilitySensor onChange={this.props.resultsVisible}>
                  <div className="form_title">Your estimated {this.net_profit() ? 'gain' : 'loss'} per month*</div>
                </VisibilitySensor>
                <div className="text-muted summary">
                  <span className="summary_profit">{this.impact_message()}</span>
                </div>
              </div>
              <div className="form_title net_impact text-right">
                {this.displayImpact()}
                <span className="label_lg month_label">/month</span>
                <br />
                <a data-toggle="modal" data-target="#calcDetails" className="explanation_prompt">
                  How is this number calculated?
                </a>
              </div>
            </div>
            <div className="result_detail_row pull-right"></div>
            <div className="row top_buffer">
              <div className="text-muted summary">
                <a
                  className="btn_start_over no_print"
                  id="btn_start_over"
                  onClick={e => {
                    startOver(e);
                  }}
                >
                  <i className="fa fa-undo" /> Start Over
                </a>

                <a href="/calculator/cfd-calculator-faq/" className="faq_link no_print" target="_blank">
                  Got questions about the calculator?
                </a>
              </div>
            </div>
            <div className="footer"></div>
            <div className="row top_buffer no_print">
              <div className="text-muted tips">
                Learn more about the{' '}
                <a href="https://energyinnovationact.org/how-it-works/" target="_blank">
                  Energy Innovation and Carbon Dividend Act
                </a>
              </div>
            </div>
            <div className="share_row row no_print">
              <div>
                <label>Print: </label>
                <a className="print_button" href="javascript:window.print()">
                  <i className="fa fa-print"></i>
                </a>
                <label>Share: </label>
                <div className="SocialMediaShareButton">
                  <a
                    href="https://www.facebook.com/sharer/sharer.php?u=https://citizensclimatelobby.org/calculator/&amp;t=Calculator&amp;redirect_uri=https://citizensclimatelobby.org?sharing-thankyou=yes"
                    title={share_message}
                    target="_blank"
                    rel="nofollow"
                  >
                    <i className="fa fa-facebook"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="no_print">
              <div className="text-muted disclaimer">
                <i className="fa fa-asterisk" aria-hidden="true"></i> Calculator results are based on
                <a href="https://citizensclimatelobby.org/household-impact-study/" target="_blank">
                  {' '}
                  Citizens' Climate Lobby's Household Impact Study
                </a>
                .{' '}
                <a data-toggle="modal" data-target="#calcDetails">
                  Learn more
                </a>{' '}
                about the methods and assumptions used in the calculation.
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    );
  }
}

export default Results;
