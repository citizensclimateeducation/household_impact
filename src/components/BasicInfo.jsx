import React from 'react';
import axios from 'axios';
import Slider from 'react-rangeslider';
import NumericInput from 'react-numeric-input';
import {nextSection, toCurrency} from '../lib/Utility.jsx';
// import {toCurrency} from '../lib/Utility.jsx';

const impact_study_url = 'https://ummel.ocpu.io/exampleR/R/predictModel/json'

class BasicInfo extends React.Component {
    constructor() {
        super();
        this.state = {heating_type: 'Natural gas', vehicles: 2, adults: 1, children: 0, income: this.position_to_income(800), income_pos: 800, zip: '', rooms: 3}
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (event) => {}

    handleChange = (event) => { this.setState({ [event.target.name]: event.target.value }); }
    numberChange = (name, val) => { this.setState({[name]: val}) }
    valid = () => { return (this.state.income && this.state.zip) }

    validZip = (e) => {
      const re = /^[0-9]{0,5}$/
      const newval = e.target.value + e.key
      const highlighted = window.getSelection().toString()
      if (!re.test(newval) && !highlighted) { e.preventDefault(); }
    }

    validAge = (e) => {
      const re = /^[0-9]{0,2}$/
      if (!re.test(e.target.value)) { e.preventDefault(); }
    }

    calculate(e) {
      if (this.valid()) {
        $('.pre_calculate').removeClass('pre_calculate').addClass('post_calculate')
        $('.spending_panel, .search_failed').hide();
        nextSection(e, '#spending');

        var data = {input: [{
            zip: this.state.zip,
            na: Number(this.state.adults) + Number(this.state.children),
            nc: Number(this.state.children),
            hinc: this.state.income,
            hfuel: this.state.heating_type,
            veh: String(this.state.vehicles),
            rms: String(this.state.rooms)
        }]};

        const respond = this.props.setResults;

        $('.calculating').fadeIn('slow');
        const zip = this.refs.zip
        const basic_questions = this.state;

        axios.post(impact_study_url, JSON.stringify(data), {responseType: 'json', headers: {'Content-Type': 'application/json'}}).
        then(function(response) {
          $('.calculating').fadeOut('slow', function() {
            $('.spending_panel').fadeIn('slow', function() {
              respond({...response.data[0], ...basic_questions})
            });
          });
        }).catch(function(error) {
            nextSection(e, '#basic_questions')
            $('.search_failed').fadeIn('slow');

            $('.calculating').fadeOut('slow', function() {
              $('.post_calculate').addClass('pre_calculate').removeClass('post_calculate');
            });

            zip.select();
            console.log(error);
        })
      }
    }

    // based on https://stackoverflow.com/questions/846221/logarithmic-slider
    position_to_income = (val) => {
      const minlval = 0
      const maxlval = 12.89921982609012; // Math.log(400000)
      const scale = 0.01289921982609012; //maxlval / 1000
      return Math.exp(val * scale)
    }

    // TODO: extract // 0 to 1000 maps to 0 to 400,000 logarithmically
    handleSlide = (val) => { this.setState({income: this.position_to_income(val), income_pos: val}) }

    render() {
        return (
            <div id="basic_questions" className="card input">
                <div className="print_banner">
                  <a className="print_only" href="#">
                    <img src={require('../images/ccl-logo-alpha.png')} className="menu-logo" />
                  </a>
                </div>
                <div className="basic_info_panel">
                    <div className="form_title no_print">Let's start with some basic questions</div>
                    <div className="form_title print_only">Household and Spending</div>
                    <div className="explanation no_print">
                        This will help us figure out your dividend check and take some first guesses at your spending.
                    </div>
                    <div className="search_failed">
                      <div className="alert alert-info" role="alert">
                        Sorry, we couldn't find information for this search. Please double-check your zip code
                      </div>
                    </div>
                    <form id="basic_questions_form">
                        <div className="form-group row">
                          <label className="col-form-label col-sm-8 col-xs-12">HOUSEHOLD SIZE</label>
                        </div>
                        <div className="row">
                          <div className="form-group col-md-6 row">
                            <label htmlFor="adults" className="col-form-label col-lg-4 col-md-7 col-sm-4 col-xs-6">Adults</label>
                            <div className="col-md-5 col-sm-8 col-xs-6">
                                <select className="form-control number_select" id="adults" name="adults" value={this.state.adults} onChange={this.handleChange}>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                </select>
                            </div>
                            </div>
                            <div className="form-group col-md-6 row">
                                <label htmlFor="adults" className="col-form-label col-lg-4 col-md-7 col-sm-4 col-xs-6">Children</label>
                                <div className="col-md-5 col-sm-8 col-xs-6">
                                    <select className="form-control number_select" id="children" name="children" value={this.state.children} onChange={this.handleChange}>>
                                        <option>0</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>6</option>
                                        <option>7</option>
                                        <option>8</option>
                                        <option>9</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                          <div className="form-group col-md-6 row">
                              <label htmlFor="vehicles" className="col-form-label col-lg-4 col-md-7 col-sm-4 col-xs-6">Vehicles</label>
                              <div className="col-md-5 col-sm-4 col-xs-6">
                                <select className="form-control number_select" id="vehicles" name="vehicles" value={this.state.vehicles} onChange={this.handleChange}>>
                                    <option>0</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5+</option>
                                </select>
                              </div>
                          </div>
                          <div className="form-group col-md-6 row">
                            <label htmlFor="rooms" className="col-form-label col-lg-4 col-md-7 col-sm-4 col-xs-6">Rooms</label>
                            <div className="col-md-5 col-sm-4 col-xs-4">
                              <select className="form-control number_select" id="rooms" name="rooms" value={this.state.rooms} onChange={this.handleChange}>>
                                  <option>0</option>
                                  <option>1</option>
                                  <option>2</option>
                                  <option>3</option>
                                  <option>4</option>
                                  <option>5+</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">&nbsp;</div>
                        <div className="form-group row">
                            <label htmlFor="heating_type" className="col-form-label col-sm-4 col-xs-6">Heating Fuel</label>
                            <div className="col-md-4 col-sm-6 col-xs-6">
                                <select className="form-control" id="heating_type" name="heating_type" value={this.state.heating_type} onChange={this.handleChange}>>
                                    <option>Natural gas</option>
                                    <option>Electricity</option>
                                    <option>LPG/Propane</option>
                                    <option>Heating oil</option>
                                    <option>Other or none</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="zip" className="col-form-label col-sm-4 col-xs-6">Zip Code</label>
                            <div className="col-sm-4 col-xs-5">
                                <input size="8" className="form-control" id="zip" name="zip" placeholder="Zip Code" ref="zip"
                                       value={this.state.zip} onChange={this.handleChange} onKeyPress={(e) => this.validZip(e)} />
                            </div>
                        </div>
                        <div className="form-group">&nbsp;</div>
                        <div className="form-group">
                            <label htmlFor="income">Household Income: {toCurrency(this.state.income, '$0,0')}</label>
                            <div className="no_print">
                                <Slider min={0} max={1000} step={1} value={this.state.income_pos} onChange={this.handleSlide}/>
                            </div>
                        </div>
                    </form>
                  <div className="print_spending print_only">
                    <hr/>
                    <div className="row top_buffer">
                        <div className="col-xs-8">Typical Monthly Electricity Bill</div>
                        <div className="col-xs-4">${this.props.elec}</div>
                    </div>
                    <div className="row top_buffer">
                        <div className="col-xs-8">Typical Weekly Gasoline Expenditure</div>
                        <div className="col-xs-4">${this.props.gas}</div>
                    </div>
                    {this.props.heat > 0 &&
                      <div className="row top_buffer">
                          <div className="col-xs-8">Typical Monthly {this.state.heating_type} Expenditure</div>
                          <div className="col-xs-4">{toCurrency(this.props.heat)}</div>
                      </div>
                    }
                  </div>
                </div>
                <div className="footer">
                    <button className={"btn btn-default " + (this.valid() ? '' : 'disabled')} href="#spending" id="calculate_button"
                            onClick={(e)=>{this.calculate(e)}}>
                      NEXT
                    </button>
                </div>

            </div>
        )
    }
}

export default BasicInfo;
