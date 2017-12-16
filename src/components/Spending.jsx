import React from 'react';
import Slider from 'react-rangeslider'
import {nextSection, nextAndHide} from '../lib/Utility.jsx'
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
            <h2>Crunching the numbers...</h2>
          </div>

          <div className="spending_panel">
            <div className="basic_info_data print_only">
              <BasicInfoData adults={this.props.adults} children={this.props.children} zip={this.props.zip}
                income={this.props.income} vehicles={this.props.vehicles} rooms={this.props.rooms} />
            </div>

            <div className="form_title">Almost done. Just a couple more questions about your spending.</div>

            <div className="spending">
              Use the sliders below to tell us how much your household spends on gasoline and utilities. 
              For utilities, estimate the average over the past year. If you aren't sure, just leave the 
              sliders at their initial values, which are reasonable guesses based on your information.
            </div>

            <form>
              <div className="form-group">
                <label htmlFor="gas" className="label_lg">How much is your average monthly gasoline expenditure? $ </label>
                <label htmlFor="gas" className="label_sm">Average monthly gas expenditure? $ </label>
                <input size="3" className="form-control expense_text" id="gas" name="gas" 
                  value={this.props.gas} onChange={(event)=>{this.props.handleSlide('gas', event.target.value)}}/>
                <div className="slider_wrapper">
                  <Slider min={0} max={this.props.gas_upr} step={1} value={this.props.gas}
                    onChange={(val) => {this.props.handleSlide('gas', val)}}/>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="elec" className="label_lg">How much is your average monthly electricity bill? $ </label>
                <label htmlFor="elec" className="label_sm">Average monthly electricity bill? $ </label>
                <input size="3" className="form-control expense_text" id="elec" name="elec" 
                  value={this.props.elec} onChange={(event)=>{this.props.handleSlide('elec', event.target.value)}} />
                <div className="slider_wrapper">
                  <Slider min={0} max={this.props.elec_upr} step={1} value={this.props.elec}
                    onChange={(val) => {this.props.handleSlide('elec', val)}}/>
                </div>
              </div>

              {this.props.initial_heat > 0 && (
                <div className="form-group">
                  <label htmlFor="heat" className="label_lg">What is your average monthly {this.props.heating_type} expediture? $ </label>
                  <label htmlFor="heat" className="label_sm">Average monthly {this.props.heating_type} expediture? $ </label>
                  <input size="3" className="form-control expense_text" id="heat" name="heat"
                    value={this.props.heat} onChange={(event)=>{this.props.handleSlide('heat', event.target.value)}} />
                  <div className="slider_wrapper">
                    <Slider min={0} max={this.props.heat_upr} step={1} value={this.props.heat}
                      onChange={(val) => {this.props.handleSlide('heat', val)}}/>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
        <div className="footer">
          <button href="#results" className="btn btn-default btn_results" onClick={(e)=>{nextAndHide(e, '#results')}}>CALCULATE</button>
        </div>
      </div>
    )
  }
}

export default Spending;
