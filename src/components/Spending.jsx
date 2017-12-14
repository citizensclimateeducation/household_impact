import React from 'react';
import Slider from 'react-rangeslider'
import {nextSection} from '../lib/Utility.jsx'
import BasicInfoData from './BasicInfoData.jsx'

class Spending extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange = (event) => { 
    // pass to slide event
    this.setState({ [event.target.name]: event.target.value }); 
  }

  render() {
    return (
      <div id="spending" className="card pre_calculate input">
        <div></div>
        <div>
          <div className="calculating text-center">
            <i className="fa fa-circle-o-notch fa-spin"></i>
            <h2>Calculating spending defaults...</h2>
          </div>

          <div className="spending_panel">
            <div className="basic_info_data print_only">
              <BasicInfoData adults={this.props.adults} children={this.props.children} zip={this.props.zip}
                income={this.props.income} vehicles={this.props.vehicles} rooms={this.props.rooms} />
            </div>

            <div className="form_title">Almost done. Just a couple more questions about your spending.</div>

            <div className="spending">
              We've taken a guess, approximately ${this.props.initial_elec}/mo on electricity, ${this.props.initial_gas}/week on gasoline,
              and ${this.props.initial_heat}/mo on heating. If this doesn't align with your spending, you can make adjustments here.
            </div>

            <form>
              <div className="form-group">
                <label htmlFor="elec">Typical Monthly Electricity Bill: $ </label>
                <input size="3" className="form-control expense_text" id="elec" name="elec" 
                  value={this.props.elec} onChange={(event)=>{this.props.handleSlide('elec', event.target.value)}} />
                <div className="slider_wrapper">
                  <Slider min={0} max={300} step={1} value={this.props.elec}
                    onChange={(val) => {this.props.handleSlide('elec', val)}}/>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="gas">Typical Weekly Gasoline Expenditure: $ </label>
                <input size="3" className="form-control expense_text" id="gas" name="gas" 
                  value={this.props.gas} onChange={(event)=>{this.props.handleSlide('gas', event.target.value)}}/>
                <div className="slider_wrapper">
                  <Slider min={0} max={300} step={1} value={this.props.gas}
                    onChange={(val) => {this.props.handleSlide('gas', val)}}/>
                </div>
              </div>

              {this.props.heat > 0 && (
                <div className="form-group">
                  <label htmlFor="heat">Typical Monthly {this.props.heating_type} Expediture: $ </label>
                  <input size="3" className="form-control expense_text" id="heat" name="heat"
                    value={this.props.heat} onChange={(event)=>{this.props.handleSlide('heat', event.target.value)}} />
                  <div className="slider_wrapper">
                    <Slider min={0} max={300} step={1} value={this.props.heat}
                      onChange={(val) => {this.props.handleSlide('heat', val)}}/>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
        <div className="footer">
          <button href="#results" className="btn btn-default btn_results" onClick={(e)=>{nextSection(e, '#results')}}>CALCULATE</button>
        </div>
      </div>
    )
  }
}

export default Spending;
