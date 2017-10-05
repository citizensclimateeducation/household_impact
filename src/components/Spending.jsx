import React from 'react';
import Slider from 'react-rangeslider'
import {nextSection} from '../lib/Utility.jsx'
import BasicInfoData from './BasicInfoData.jsx'

class Spending extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="spending" className="card pre_calculate input">
                <div></div>
                <div>
                    <div className="calculating text-center">
                        <i className="fa fa-circle-o-notch fa-spin"></i>
                        <h2>Calculating Presets...</h2>
                    </div>

                    <div className="spending_panel">

                      <div className="basic_info_data">
                      </div>

                      <div className="form_title">Next, a couple of questions about your spending.</div>
                      <div className="spending explanation">
                          Let us know about how much you spend on electricity and gas or, if you've entered basic information above, we
                          can <a href="#spending" id="calculate">calculate</a> defaults for you based on similar households.
                      </div>

                      <form>
                          <div className="form-group">
                              <label htmlFor="electricity">Typical Monthly Electricity Bill: ${this.props.elec}</label>
                              <div>
                                  <Slider min={0} max={300} step={1} value={this.props.elec}
                                          onChange={(val) => {this.props.handleSlide('elec', val)}}/>
                              </div>
                          </div>

                          <div className="form-group">
                              <label htmlFor="gasoline">Typical Weekly Gasoline Expenditure: ${this.props.gas}</label>
                              <div>
                                  <Slider min={0} max={300} step={1} value={this.props.gas}
                                          onChange={(val) => {this.props.handleSlide('gas', val)}}/>
                              </div>
                          </div>
                      </form>
                    </div>
                </div>
                <div className="footer">
                    <a href="#results" className="scroll-down" onClick={(e)=>{nextSection(e, '#results')}}>
                        <i className="fa fa-chevron-down"></i>
                    </a>
                </div>
            </div>
        )
    }
}

export default Spending;
