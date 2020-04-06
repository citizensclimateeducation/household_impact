import React from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import { toCurrency, nextSection, startOver, tagEvent } from '../lib/Utility.js';

import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  RedditShareButton,
  PocketShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  RedditIcon,
  PocketIcon,
  EmailIcon,
} from 'react-share';

const SHARE_URL = 'https://energyinnovationact.org/carbon-dividend-calculator/';
const SHARE_TITLE = 'How will a price on pollution impact your wallet?';
const SHARE_MESSAGE =
  'Calculate your financial impact from Energy Innovation Act with this personal carbon dividend calculator. Based on household and lifestyle factors.';
const LONG_MESSAGE = `${SHARE_TITLE} ${SHARE_MESSAGE}`;
const SHARE_HASHTAG = '#PriceOnPollution';
const SHARE_HASHTAGS = ['EnergyInnovationAct', 'PriceOnPollution', 'climate', 'BipartisanClimate'];

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
                Ranging from ${Math.max(this.props.results.carbon_cost - 18, 0)} to $
                {this.props.results.carbon_cost + 18} depending on your lifestyle.
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

                <a href="/personal-carbon-dividend-calculator-faq/" className="faq_link no_print" target="_blank">
                  Calculator FAQ
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
                  <FacebookShareButton url={SHARE_URL} title={SHARE_TITLE} hashtag={SHARE_HASHTAG}>
                    <FacebookIcon size={40} iconBgStyle={{ fill: 'none' }} logoFillColor={'#15527b'} />
                  </FacebookShareButton>
                  <TwitterShareButton
                    url={SHARE_URL}
                    title={LONG_MESSAGE}
                    hashtags={SHARE_HASHTAGS}
                    via={'citizensclimate'}
                  >
                    <TwitterIcon size={40} iconBgStyle={{ fill: 'none' }} logoFillColor={'#15527b'} />
                  </TwitterShareButton>
                  <RedditShareButton url={SHARE_URL} title={LONG_MESSAGE}>
                    <RedditIcon size={40} iconBgStyle={{ fill: 'none' }} logoFillColor={'#15527b'} />
                  </RedditShareButton>
                  <LinkedinShareButton url={SHARE_URL} title={LONG_MESSAGE}>
                    <LinkedinIcon size={40} iconBgStyle={{ fill: 'none' }} logoFillColor={'#15527b'} />
                  </LinkedinShareButton>
                  <PocketShareButton url={SHARE_URL} title={LONG_MESSAGE}>
                    <PocketIcon size={40} iconBgStyle={{ fill: 'none' }} logoFillColor={'#15527b'} />
                  </PocketShareButton>
                  <EmailShareButton url={SHARE_URL} subject={SHARE_TITLE} body={SHARE_MESSAGE}>
                    <EmailIcon size={40} iconBgStyle={{ fill: 'none' }} logoFillColor={'#15527b'} />
                  </EmailShareButton>
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
