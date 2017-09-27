import React from 'react';

class Results extends React.Component {
    constructor() {
        super();
        this.state = {
          results: {
              pre_tax: 0,
              tax_bracket: 0,
              income: 0,
              net_impact: 0,
              cost: 0
          }
        };
    }

    render() {
        return (
            <section id="results" className="demo">
                <div></div>
                <div>
                    <div className="form_title">Your Results</div>
                    <div className="explanation">
                    </div>
                    <div className="row top_buffer">
                        <div className="col-sm-8"><h4>Yearly post-tax dividend</h4></div>
                        <div className="col-sm-4 dividend">{this.state.results.pre_tax}</div>
                    </div>
                    <div className="row top_buffer">
                        <div className="col-sm-12 text-muted">Dividend checks are based on the number of people in a household, not on income or spending.</div>
                    </div>
                    <div className="row top_buffer">
                        <div className="col-sm-8"><h4>Cost of carbon fee</h4></div>
                        <div className="col-sm-4 cost">{this.state.results.cost}</div>
                    </div>
                    <div className="row top_buffer bottom_buffer">
                        <div className="col-sm-12 text-muted">Calculated by looking at your location and energy usage.</div>
                    </div>
                    <hr/>
                    <div className="row top_buffer">
                        <div className="col-sm-8 form_title">Estimated net impact per year*</div>
                        <div className="col-sm-4 form_title net_impact">{this.state.results.net_impact}</div>
                    </div>
                    <div className="row top_buffer">
                        <div className="col-sm-12 text-muted summary">
                            <span className="summary_profit">Awesome! You should end up with some extra money each year.</span>
                        </div>
                    </div>
                    <div className="row top_buffer">
                        <div className="col-sm-12 text-muted">Want more money in your pocket? <a href="#">Learn how to reduce your footprint</a> and keep more of your dividend check</div>
                    </div>
                </div>
                <div className="share_row">
                    <div className="row">
                        <div className="col-sm-6"><label>Print: </label> <i className="fa fa-print"></i></div>
                        <div className="col-sm-6"><label>Share: </label> <i className="fa fa-twitter"></i><i className="fa fa-facebook"></i></div>
                    </div>
                    <div className="row top_buffer">
                        <div className="col-sm-12 text-muted">* In real life there are many other factors to consider. However, this estimate is expected to be accurate within a range of 75%</div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Results ;