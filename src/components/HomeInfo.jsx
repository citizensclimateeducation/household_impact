import React from 'react';
import NumberFormat from 'react-number-format';
import NumericInput from 'react-numeric-input';
import {nextSection, nextAndHide, toCurrency, numberOptionList} from '../lib/Utility.jsx';

class HomeInfo extends React.Component {
  constructor(props) {
    super(props);
    //this.state = {heating_type: 'Natural gas', vehicles: 2, zip: '', dwelling_type: 'Stand-alone house'}
  }

  //handleChange = (event) => { this.setState({ [event.target.name]: event.target.value }); }


  render() {
    return (
      <div id="home_questions" className="card input initially_hidden">
        <div className="basic_info_panel">
          <div className="home_info_panel section">
            <div className="search_failed">
              <div className="alert alert-info" role="alert">
                Sorry, we couldn't find information for this search. Please double-check your zip code
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="zip">What's your zip code?</label>
              <a data-toggle="modal" data-target="#zipCodeDetails" className="explanation_prompt">Why am I being asked this?</a>
              <input size="8" className="form-control input-lg number_select" id="zip" name="zip" placeholder="Zip Code" ref="zip"
                value={this.props.zip} onChange={this.props.setAttribute} onKeyPress={this.props.validZip} />
            </div>
            <div className="form-group">
              <label htmlFor="dwelling_type">What type of home do you live in?</label>
              <a data-toggle="modal" data-target="#homeTypeDetails" className="explanation_prompt">Why am I being asked this?</a>
              <select className="form-control input-lg" id="dwelling_type" name="dwelling_type" value={this.props.dwelling_type}
                onChange={this.props.setAttribute}>
                <option>Stand-alone house</option>
                <option value='Apartment building'>Apartment or condo</option>
                <option value='Townhouse or other attached housing'>Townhouse, duplex, other attached housing</option>
                <option>Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="vehicles">How many vehicles does your household own?</label>
              <select className="form-control input-lg number_select" id="vehicles" name="vehicles" value={this.props.vehicles}
                onChange={this.props.setAttribute}>
                {numberOptionList(0, 4)}
                <option value='5'>5+</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="heating_type">What kind of fuel is used most to heat your home?</label>
              <a data-toggle="modal" data-target="#heatingFuelDetails" className="explanation_prompt">Why am I being asked this?</a>
              <select className="form-control input-lg" id="heating_type" name="heating_type" value={this.props.heating_type}
                onChange={this.props.setAttribute}>
                <option>Natural gas</option>
                <option>Electricity</option>
                <option>LPG/Propane</option>
                <option>Heating oil</option>
                <option>Other or none</option>
                <option>Do not know</option>
              </select>
            </div>
          </div>
        </div>
        <div className="footer">
          <button className={"btn btn-default " + (this.props.zip ? '' : 'disabled')} href="#spending" id="calculate_button"
            onClick={(e)=>{this.props.calculate(e)}}>
            NEXT
          </button>
        </div>
      </div>
    )
  }
}

export default HomeInfo;
