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
                        <BasicInfoData adults={this.props.adults} children={this.props.children} zip={this.props.zip}
                                        income={this.props.income} vehicles={this.props.vehicles} rooms={this.props.rooms} />
                      </div>

                      <div className="form_title">Next, a couple of questions about your spending.</div>

                      <div className="spending">
                      Households similar to yours spend approximately ${this.props.initial_elec}/mo on electricity, ${this.props.initial_gas}/week on gasoline,
                      and ${this.props.initial_heat}/mo on heating. If this doesn't align with your spending, make adjustments here.
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

                          {this.props.heat > 0 && (
                            <div className="form-group">
                                <label htmlFor="electricity">Typical Monthly {this.props.heating_type} Expediture: ${this.props.heat}</label>
                                <div>
                                    <Slider min={0} max={300} step={1} value={this.props.heat}
                                            onChange={(val) => {this.props.handleSlide('heat', val)}}/>
                                </div>
                            </div>
                          )}
                      </form>
                    </div>
                </div>
                <div className="footer">
                    <button href="#results" className="btn btn-default btn_results" onClick={(e)=>{nextSection(e, '#results')}}>RESULTS</button>
                    <button className="btn btn-default btn_back" href="#basic_questions" onClick={(e)=>{nextSection(e, '#basic_questions')}}>BACK</button>
                </div>
            </div>
        )
    }
}

export default Spending;
