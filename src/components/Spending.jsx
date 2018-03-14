import React from 'react';
import Slider from 'react-rangeslider'
import {nextAndHideFooter, tagEvent} from '../lib/Utility.jsx'

class Spending extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange = (event) => {
    // pass to slide event
    this.setState({ [event.target.name]: event.target.value });
  }

  slideComplete = (prop) => tagEvent('slide', prop)

  render() {
    return (
      <div id="spending" className="card pre_calculate input">
        <div></div>
        <div>
          <div className="calculating text-center">
            <div className="spinner">
              <svg className="wait_spinner" xmlns="http//www.w3.org/2000/svg" viewBox="0 0 100 100">
                <circle className='green_circle' cx='50' cy='50' r='45' strokeDasharray='141.37' />
                <circle className='blue_circle' cx='50' cy='50' r='30' strokeDasharray='94.248'/>
                <polyline className='letter' points='41,31 41,59 69,59' />
              </svg>
            </div>
            <h2>Crunching the numbers...</h2>
          </div>

          <div className="spending_panel">
            <div className="form_title">Almost done. Just a couple more questions about your spending.</div>

            <div className="spending sub_heading">
              Use the sliders below to tell us how much your household spends on gasoline and utilities each month.
              If you aren't sure, just leave the sliders at their initial values, which are reasonable guesses based on your information.
            </div>

            <form>
              <div className="form-group">
                <label htmlFor="gas" className="label_lg">How much is your average monthly gasoline expenditure? $ </label>
                <label htmlFor="gas" className="label_sm">Average monthly gasoline expenditure? $ </label>
                <input size="3" className="form-control expense_text" id="gas" name="gas"
                  value={this.props.gas} onChange={(event)=>{this.props.handleSlide('gas', event.target.value)}}/>
                <a data-toggle="modal" data-target="#gasExpense" className="explanation_prompt">Explain this</a>
                <div className="slider_wrapper">
                  <Slider min={0} max={this.props.gas_upr} step={1} value={this.props.gas}
                    onChange={(val) => {this.props.handleSlide('gas', val)}} onChangeComplete={e => this.slideComplete('gas')} />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="elec" className="label_lg">How much is your average monthly electricity bill? $ </label>
                <label htmlFor="elec" className="label_sm">Average monthly electricity bill? $ </label>
                <input size="3" className="form-control expense_text" id="elec" name="elec"
                  value={this.props.elec} onChange={(event)=>{this.props.handleSlide('elec', event.target.value)}} />
                <a data-toggle="modal" data-target="#multipleProperties" className="explanation_prompt">Explain this</a>
                <div className="slider_wrapper">
                  <Slider min={0} max={this.props.elec_upr} step={1} value={this.props.elec}
                    onChange={(val) => {this.props.handleSlide('elec', val)}} onChangeComplete={e => this.slideComplete('elec')}/>
                </div>
              </div>

              {this.props.initial_heat > 0 && (
                <div className="form-group">
                  <label htmlFor="heat" className="label_lg">What is your average monthly {this.props.heating_type.toLowerCase()} expediture? $ </label>
                  <label htmlFor="heat" className="label_sm">Average monthly {this.props.heating_type.toLowerCase()} expediture? $ </label>
                  <input size="3" className="form-control expense_text" id="heat" name="heat"
                    value={this.props.heat} onChange={(event)=>{this.props.handleSlide('heat', event.target.value)}} />
                  <a data-toggle="modal" data-target="#multipleProperties" className="explanation_prompt">Explain this</a>
                  <div className="slider_wrapper">
                    <Slider min={0} max={this.props.heat_upr} step={1} value={this.props.heat}
                      onChange={(val) => {this.props.handleSlide('heat', val)}} onChangeComplete={e => this.slideComplete('heat')}/>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
        <div className="footer spending_footer">
          <button href="#results" className="btn btn-default" id="btn_spending_next"
            onClick={(e)=>{nextAndHideFooter(e, '#results')}}>SHOW RESULTS</button>

          <a href="/calculator/cfd-calculator-faq/" className="faq_link" target="_blank">Got questions about the calculator?</a>
        </div>
      </div>
    )
  }
}

export default Spending;
