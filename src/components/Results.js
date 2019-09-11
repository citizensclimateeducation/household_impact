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
        <div></div>
        <div>
          <div className="row">
            <div className="col-xs-12 form_title">Your Results</div>
          </div>
          <div className="row result_row top_buffer">
            <div className="col-xs-8 sub_heading">Monthly after-tax family dividend</div>
            <div className="col-xs-4 dividend text-right">{this.props.results.div_post}</div>
          </div>
          <div className="row top_buffer">
            <div className="col-sm-12 text-muted disclaimer">
              Calculation based on family's number of adults, number of minors, and expected federal marginal tax rate.
            </div>
          </div>
          <div className="row result_row top_buffer">
            <div className="col-xs-8 sub_heading">Monthly cost due to carbon fee</div>
            <div className="col-xs-4 cost text-right">{this.props.results.carbon_cost}</div>
          </div>
          <div className="row top_buffer bottom_buffer">
            <div className="col-sm-12 text-muted disclaimer">
              Estimated additional costs due to higher prices for goods and services, depending on your family's
              characteristics entered above (income, number of vehicles, etc.).
            </div>
          </div>
          <div className="impact_panel">
            <div className="row">
              <VisibilitySensor onChange={this.props.resultsVisible}>
                <div className="col-xs-8 form_title">Net benefit per month*</div>
              </VisibilitySensor>
              <div className="col-xs-4 form_title net_impact text-right">
                {this.displayImpact()}
                <span className="label_lg month_label">/month</span>
              </div>
            </div>
            <div className="row pull-right">
              <a data-toggle="modal" data-target="#calcDetails" className="explanation_prompt">
                How is this number calculated?
              </a>
            </div>
            <div className="row top_buffer">
              <div className="col-sm-12 text-muted summary">
                <span className="summary_profit">{this.impact_message()}</span>
                <a
                  className="btn_start_over no_print"
                  id="btn_start_over"
                  onClick={e => {
                    startOver(e);
                  }}
                >
                  <i className="fa fa-undo" /> Start Over
                </a>

                <a href="/calculator/cfd-calculator-faq/" className="faq_link" target="_blank">
                  Got questions about the calculator?
                </a>
              </div>
            </div>
            <div className="footer"></div>
            <div className="row top_buffer no_print">
              <div className="col-sm-12 text-muted tips">
                Learn more about{' '}
                <a href="https://citizensclimatelobby.org/basics-carbon-fee-dividend/" target="_blank">
                  Carbon Fee and Dividend
                </a>{' '}
                and then join{' '}
                <a href="https://citizensclimatelobby.org/join-citizens-climate-lobby/" target="_blank">
                  Citizens' Climate Lobby
                </a>{' '}
                to help us get CF&D passed.
              </div>
            </div>
            <div className="share_row row no_print">
              <div className="col-sm-12 text-muted">
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
            <div className="row no_print">
              <div className="col-sm-12 text-muted disclaimer">
                <i className="fa fa-asterisk" aria-hidden="true"></i> Calculator results are based on
                <a href="https://citizensclimatelobby.org/household-impact-study/" target="_blank">
                  {' '}
                  CCL's Household Impact Study
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
