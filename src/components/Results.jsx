import React from 'react'
import numeral from 'numeral/min/numeral.min.js'
import {toCurrency} from '../lib/Utility.jsx'

class Results extends React.Component {
    constructor(props) {
        super(props);
    }

    net_profit = () => { return this.props.results.net_impact >= 0 }
    displayImpact = () => { return toCurrency(Math.abs(this.props.results.net_impact))}

    render() {
        return (
            <div id="results" className="card pre_calculate">
                <div></div>
                <div>
                    <div className="row"><div className="col-xs-12 form_title">Your Results</div></div>
                    <div className="explanation">
                    </div>
                    <div className="row top_buffer">
                        <div className="col-xs-8">Monthly Dividend</div>
                        <div className="col-xs-4 dividend">{this.props.results.div_post}</div>
                    </div>
                    <div className="row top_buffer">
                        <div className="col-sm-12 text-muted">Dividend checks are based on the number of people in a household, not on income or spending.</div>
                    </div>
                    <div className="row top_buffer">
                        <div className="col-xs-8">Monthly Cost</div>
                        <div className="col-xs-4 cost">{this.props.results.carbon_cost}</div>
                    </div>
                    <div className="row top_buffer bottom_buffer">
                        <div className="col-sm-12 text-muted">Calculated by looking at your location and energy usage.</div>
                    </div>
                    <div className="impact_panel">
                      <div className="row top_buffer">
                          <div className="col-xs-8 form_title">Estimated {this.net_profit() ? 'gain' : 'loss'} per month*</div>
                          <div className="col-xs-4 form_title net_impact">{this.displayImpact()}</div>
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
                        <div className="col-sm-12 text-muted"><label>Print: </label><a href="javascript:window.print()"><i className="fa fa-print"></i></a>
                        <label>Share: </label> <a href="#"><i className="fa fa-twitter"></i></a><a href="#"><i className="fa fa-facebook"></i></a></div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12 text-muted disclaimer">
                          <i className="fa fa-asterisk" aria-hidden="true"></i> This calculation is based on
                          the <a href="https://citizensclimatelobby.org/household-impact-study/">Household Impact Study</a> done by
                          Kevin Ummel to estimate the impact of Citizens' Climate Lobby's proposed carbon fee and dividend policy.
                          Click <a data-toggle="modal" data-target="#calculationDetails">here</a> for methods and assumptions used in the calculation.
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
