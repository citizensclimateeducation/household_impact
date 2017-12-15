import React from 'react'
import numeral from 'numeral/min/numeral.min.js'
import {toCurrency} from '../lib/Utility.jsx'
import { ShareButtons,  ShareCounts,  generateShareIcon } from 'react-share'

const {
  FacebookShareButton, GooglePlusShareButton, LinkedinShareButton, TwitterShareButton, TelegramShareButton, WhatsappShareButton, PinterestShareButton,
  VKShareButton, OKShareButton, RedditShareButton, EmailShareButton,
} = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const TelegramIcon = generateShareIcon('telegram');
const WhatsappIcon = generateShareIcon('whatsapp');
const GooglePlusIcon = generateShareIcon('google');
const LinkedinIcon = generateShareIcon('linkedin');
const PinterestIcon = generateShareIcon('pinterest');
const VKIcon = generateShareIcon('vk');
const OKIcon = generateShareIcon('ok');
const RedditIcon = generateShareIcon('reddit');
const EmailIcon = generateShareIcon('email');

class Results extends React.Component {
  constructor(props) {
    super(props);
  }

  net_profit = () => { return this.props.results.net_impact >= 0 }
  displayImpact = () => { return toCurrency(Math.abs(this.props.results.net_impact))}

  render() {
    const share_url = "http://cclobby.staging.wpengine.com/calculator/";
    const share_message = "See how much money you can save while fighting climate change!"
    const share_media = "https://11bup83sxdss1xze1i3lpol4-wpengine.netdna-ssl.com/wp-content/uploads/2016/05/Household-Impact-Study-percent-benefited-by-zip-code.png"

    return (
      <div id="results" className="card initially_hidden">
        <div></div>
        <div>
          <div className="row"><div className="col-xs-12 form_title">Your Results</div></div>
          <div className="explanation">
          </div>
          <div className="row result_row top_buffer">
            <div className="col-xs-8">Monthly Dividend</div>
            <div className="col-xs-4 dividend text-right">{this.props.results.div_post}</div>
          </div>
          <div className="row top_buffer">
            <div className="col-sm-12 text-muted">Dividend checks are based on the number of people in a household, not on income or spending.</div>
          </div>
          <div className="row result_row top_buffer">
            <div className="col-xs-8">Monthly Cost</div>
            <div className="col-xs-4 cost text-right">{this.props.results.carbon_cost}</div>
          </div>
          <div className="row top_buffer bottom_buffer">
            <div className="col-sm-12 text-muted">Calculated by looking at your location and energy usage.</div>
          </div>
          <div className="impact_panel">
            <div className="row">
              <div className="col-xs-8 form_title">Estimated {this.net_profit() ? 'gain' : 'loss'} per month*</div>
              <div className="col-xs-4 form_title net_impact text-right">{this.displayImpact()}<span className="label_lg">/mo</span></div>
            </div>
            <div className="row top_buffer">
              <div className="col-sm-12 text-muted summary">
                <span className="summary_profit">
                  {this.net_profit() &&
                      "Awesome! You should end up with some extra money each year."
                  }
                </span>
              </div>
            </div>
            <div className="row top_buffer">
              <div className="col-sm-12 text-muted tips">
                Learn more about <a href="https://citizensclimatelobby.org/basics-carbon-fee-dividend/" target="_blank">Carbon Fee and Dividend</a> and then
                join <a href="https://citizensclimatelobby.org/join-citizens-climate-lobby/" target="_blank">Citizens Climage Lobby</a> to help us get CF&D passed.
              </div>
            </div>
            <div className="share_row row">
              <div className="col-sm-12 text-muted">
                <label>Print: </label><a className="print_button" href="javascript:window.print()"><i className="fa fa-print"></i></a>
                <label>Share: </label>
                <FacebookShareButton url={share_url} quote={share_message} hashtag="climate">
                  <i className="fa fa-facebook"></i>
                </FacebookShareButton>
                <TwitterShareButton url={share_url} title={share_message} via="citizensclimate" hashtags={['climate', 'PutAPriceOnIt']}>
                  <i className="fa fa-twitter"></i>
                </TwitterShareButton>
                <GooglePlusShareButton url={share_url}>
                  <i className="fa fa-google-plus-official"></i>
                </GooglePlusShareButton>
                <PinterestShareButton url={share_url} description={share_message} media={share_media}>
                  <i className="fa fa-pinterest"></i>
                </PinterestShareButton>
                <EmailShareButton url={share_url} subject={share_message}>
                  <i className="fa fa-email"></i>
                </EmailShareButton>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 text-muted disclaimer">
                <i className="fa fa-asterisk" aria-hidden="true"></i> This calculation is based on
                the <a href="https://citizensclimatelobby.org/household-impact-study/">Household Impact Study</a> done by
                Kevin Ummel to estimate the impact of Citizens' Climate Lobby's proposed carbon fee and dividend policy.
                Click <a data-toggle="modal" data-target="#calcDetails">here</a> for methods and assumptions used in the calculation.
              </div>
            </div>
          </div>
        </div>
        <div>
        </div>
      </div>
    )
  }
}

export default Results ;
