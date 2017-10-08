import React from 'react'
import numeral from 'numeral/min/numeral.min.js'

class Results extends React.Component {
    constructor(props) {
        super(props);
    }

    net_profit = () => { return numeral(this.props.results.net_impact).value() >= 0 }

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
                          <div className="col-xs-8 form_title">Estimated {this.net_profit() ? 'gain' : 'cost'} per month*</div>
                          <div className="col-xs-4 form_title net_impact">{this.props.results.net_impact}</div>
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
                          <div className="col-sm-12 text-muted tips">Want more money in your pocket? <a href="#">Learn how to reduce your footprint</a> and keep more of your dividend check</div>
                      </div>
                      <div className="share_row row">
                        <div className="col-sm-12 text-muted"><label>Print: </label><a href="javascript:window.print()"><i className="fa fa-print"></i></a>
                        <label>Share: </label> <a href="#"><i className="fa fa-twitter"></i></a><a href="#"><i className="fa fa-facebook"></i></a></div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12 text-muted">* In real life there are many other factors to consider. However, this estimate is expected to be accurate within a range of 75%</div>
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
