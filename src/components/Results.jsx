import React from 'react'
import VisibilitySensor from 'react-visibility-sensor'
import { ShareButtons,  ShareCounts,  generateShareIcon } from 'react-share'
import {toCurrency, nextSection, startOver} from '../lib/Utility.jsx';

const {
  FacebookShareButton, GooglePlusShareButton, LinkedinShareButton, TwitterShareButton, TelegramShareButton,
  WhatsappShareButton, PinterestShareButton,
  VKShareButton, OKShareButton, RedditShareButton, EmailShareButton,
} = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const GooglePlusIcon = generateShareIcon('google');
const EmailIcon = generateShareIcon('email');

class Results extends React.Component {
  constructor(props) {
    super(props);
  }

  net_profit = () => { return this.props.results.net_impact >= 0 }
  displayImpact = () => { return toCurrency(this.props.results.net_impact)}

  render() {
    const share_url = "https://citizensclimatelobby.org/calculator";
    const share_message = "See how much money you can save while fighting climate change!"
    const share_media = "https://11bup83sxdss1xze1i3lpol4-wpengine.netdna-ssl.com/wp-content/uploads/2016/05/Household-Impact-Study-percent-benefited-by-zip-code.png"
    return (
      <div id="results" className="card initially_hidden">
        <div></div>
        <div>
          <div className="row"><div className="col-xs-12 form_title">Your Results</div></div>
          <div className="row result_row top_buffer">
            <div className="col-xs-8 sub_heading">Estimated after-tax household dividend</div>
            <div className="col-xs-4 dividend text-right">{this.props.results.div_post}</div>
          </div>
          <div className="row top_buffer">
            <div className="col-sm-12 text-muted disclaimer">
              Calculation based on household's number of adults, number of minors, and expected federal marginal tax rate.
              <a href="https://citizensclimatelobby.org/carbon-fee-and-dividend/" target="_blank"> Learn more about the dividend</a>.
            </div>
          </div>
          <div className="row result_row top_buffer">
            <div className="col-xs-8 sub_heading">Monthly cost due to carbon fee</div>
            <div className="col-xs-4 cost text-right">{this.props.results.carbon_cost}</div>
          </div>
          <div className="row top_buffer bottom_buffer">
            <div className="col-sm-12 text-muted disclaimer">Estimated additional
            costs due to higher prices for goods and services, depending on the household characteristics entered above (income, number of vehicles, etc.).
              <a href="https://citizensclimatelobby.org/carbon-fee-and-dividend/" target="_blank"> Learn more about the carbon fee</a>.
            </div>
          </div>
          <div className="impact_panel">
            <VisibilitySensor onChange={this.props.resultsVisible} />
            <div className="row">
              <div className="col-xs-8 form_title">Net benefit per month*</div>
              <div className="col-xs-4 form_title net_impact text-right">
                {this.displayImpact()}<span className="label_lg">/mo</span>
              </div>
            </div>
            <div className="row pull-right"><a data-toggle="modal" data-target="#calcDetails" className="explanation_prompt">How is this number calculated?</a></div>
            <div className="row top_buffer">
              <div className="col-sm-12 text-muted summary">
                {this.net_profit() &&
                  <span className="summary_profit">
                    "Awesome! You should end up with some extra money each year."
                  </span>
                }
                <a className="btn_start_over"
                      onClick={(e)=>{startOver(e)}}>
                  <i className="fa fa-undo" /> Start Over
                </a>
              </div>
            </div>
            <div className='footer'>
            </div>
            <div className="row top_buffer">
              <div className="col-sm-12 text-muted tips">
                Learn more about <a href="https://citizensclimatelobby.org/basics-carbon-fee-dividend/" target="_blank">Carbon Fee and Dividend</a> and then
                join <a href="https://citizensclimatelobby.org/join-citizens-climate-lobby/" target="_blank">Citizens' Climate Lobby</a> to help us get CF&D passed.
              </div>
            </div>
            <div className="share_row row">
               <div className="col-sm-12 text-muted">
                 <label>Print: </label><a className="print_button" href="javascript:window.print()"><i className="fa fa-print"></i></a>
                 <label>Share: </label>
                 <div className="SocialMediaShareButton">
                 <a href="https://www.facebook.com/sharer/sharer.php?u=https://citizensclimatelobby.org/calculator/&amp;t=Calculator&amp;redirect_uri=https://citizensclimatelobby.org?sharing-thankyou=yes" title={share_message}
              target="_blank" rel="nofollow">
                   <i className="fa fa-facebook"></i>
      </a>
    </div>
                 <TwitterShareButton url={share_url} title={share_message} via="citizensclimate" hashtags={['climate', 'PutAPriceOnIt']}>
                   <i className="fa fa-twitter"></i>
                 </TwitterShareButton>
                 <EmailShareButton url={share_url} subject={share_message}
                   body={share_message + ": https://citizensclimatelobby.org/calculator/"}>
                   <i className="fa fa-envelope"></i>
                 </EmailShareButton>
               </div>
            </div>
            <div className="row">
              <div className="col-sm-12 text-muted disclaimer no_print">
                <i className="fa fa-asterisk" aria-hidden="true"></i> Calculator results are based on
                <a href="https://citizensclimatelobby.org/household-impact-study/" target="_blank"> CCL's Household Impact Study</a>. <a data-toggle="modal" data-target="#calcDetails">Learn more</a> about
                the methods and assumptions used in the calculation.
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
