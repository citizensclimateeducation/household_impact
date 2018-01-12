import React from 'react'
import VisibilitySensor from 'react-visibility-sensor'
import {toCurrency, nextSection} from '../lib/Utility.jsx';

class Results extends React.Component {
  constructor(props) {
    super(props);
  }

  net_profit = () => { return this.props.results.net_impact >= 0 }
  displayImpact = () => { return toCurrency(Math.abs(this.props.results.net_impact))}

  render() {
    return (
      <div id="results" className="card initially_hidden">
        <div></div>
        <div>
          <div className="row"><div className="col-xs-12 form_title">Your Results</div></div>
          <div className="explanation">
          </div>
          <div className="row result_row top_buffer">
            <div className="col-xs-8">Estimated after-tax household dividend</div>
            <div className="col-xs-4 dividend text-right">{this.props.results.div_post}</div>
          </div>
          <div className="row top_buffer">
            <div className="col-sm-12 text-muted disclaimer">
              Calculation based on household's number of adults, number of minors, and expected federal marginal tax rate. 
              <a href="https://citizensclimatelobby.org/carbon-fee-and-dividend/" target="_blank"> Learn more about the dividend</a>.
            </div>
          </div>
          <div className="row result_row top_buffer">
            <div className="col-xs-8">Monthly Cost</div>
            <div className="col-xs-4 cost text-right">{this.props.results.carbon_cost}</div>
          </div>
          <div className="row top_buffer bottom_buffer">
            <div className="col-sm-12 text-muted disclaimer">Estimated additional costs due to higher prices for goods and services, depending on the household charactersitics 
              entered above (income, number of vehicles, etc.). 
              <a href="https://citizensclimatelobby.org/carbon-fee-and-dividend/" target="_blank"> Learn more about the carbon fee</a>.
            </div>
          </div>
          <div className="impact_panel">
            <VisibilitySensor onChange={this.props.resultsVisible} />
            <div className="row">
              <div className="col-xs-8 form_title">Estimated {this.net_profit() ? 'gain' : 'loss'} per month*</div>
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
                <a className="btn_start_over" href="#basic_questions" onClick={(e)=>{nextSection(e, '#basic_questions')}}>
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
