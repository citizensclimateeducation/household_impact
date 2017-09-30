import React from 'react';
import axios from 'axios';
import {nextSection} from '../lib/Utility.jsx';

const impact_study_url = 'https://ummel.ocpu.io/exampleR/R/predictModel/json'

class BasicInfo extends React.Component {
    constructor() {
        super();
        this.state = {age: '', adults: 1, children: 0, income: 15000, zip: ''}
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (event) => {}

    handleChange = (event) => { this.setState({ [event.target.name]: event.target.value }); }

    valid = () => {
      return (this.state.age && this.state.income && this.state.zip)
    }

    validZip = (e) => {
      const re = /^[0-9]{0,4}$/g
      if (!re.test(e.target.value)) { e.preventDefault(); }
    }

    validAge = (e) => {
      const re = /^[0-9]{0,2}$/g
      if (!re.test(e.target.value)) { e.preventDefault(); }
    }

    calculate(e) {
      if (this.valid()) {
        $('.pre_calculate').removeClass('pre_calculate');
        $('.spending_panel').hide();
        nextSection(e, '#spending');

        var data = {input: [{
            zip: this.state.zip,
            hhsize: Number(this.state.adults) + Number(this.state.children),
            minors: Number(this.state.children),
            age: this.state.age,
            income: this.state.income
        }]};

        const respond = this.props.setResults;

        $('.calculating').fadeIn('slow');

        axios.post(impact_study_url, JSON.stringify(data), {responseType: 'json', headers: {'Content-Type': 'application/json'}}).
        then(function(response) {
          $('.calculating').fadeOut('slow', function() {
            $('.spending_panel').fadeIn('slow', function() {
              respond(response.data[0])
            });
          });
        }).catch(function(error) {
            console.log(error);
        })
      }
    }

    render() {
        return (
            <section id="basic_questions" className="demo">
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
                    <form id="basic_questions_form">
                        <div className="form-group row">
                          <label className="col-form-label col-sm-8 col-xs-12">HOUSEHOLD SIZE</label>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="adults" className="col-form-label col-sm-4 col-xs-6">Adults</label>
                            <div className="col-sm-8 col-xs-6">
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
                        <div className="form-group row">
                            <label htmlFor="adults" className="col-form-label col-sm-4 col-xs-6">Children</label>
                            <div className="col-sm-8 col-xs-6">
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
                        <div className="form-group">&nbsp;</div>
                        <div className="form-group row">
                            <label htmlFor="age" className="col-form-label col-sm-4 col-xs-6">Age of Head of Household</label>
                            <div className="col-sm-2 col-xs-4">
                                <input type="number" size="3" className="form-control" id="age" name="age"
                                    value={this.state.age} onChange={this.handleChange} onKeyPress={(e) => this.validAge(e)} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="zip" className="col-form-label col-sm-4 col-xs-6">Zip Code</label>
                            <div className="col-sm-4 col-xs-4">
                                <input type="number" size="8" className="form-control" id="zip" name="zip" placeholder="Zip Code"
                                       value={this.state.zip} onChange={this.handleChange} onKeyPress={(e) => this.validZip(e)} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="income" className="col-form-label col-sm-4 col-xs-6">Household Income</label>
                            <div className="col-sm-6 col-xs-6">
                                <select className="form-control" id="income" name="income" value={this.state.income} onChange={this.handleChange}>
                                    <option value="10000">&lt; $10,000</option>
                                    <option value="15000">$10,000 - $20,000</option>
                                    <option value="30000">$20,000 - $40,000</option>
                                    <option value="50000">$40,000 - $60,000</option>
                                    <option value="60000">$50,000 - $70,000</option>
                                    <option value="80000">$70,000 - $90,000</option>
                                    <option value="100000">$90,000 - $110,000</option>
                                    <option value="120000">$110,000 - $130,000</option>
                                    <option value="140000">$130,000 - $150,000</option>
                                    <option value="175000">$150,000 - $200,000</option>
                                    <option value="225000">$200,000 - $250,000</option>
                                    <option value="300000">&gt; $250,000</option>
                                </select>
                            </div>
                        </div>
                    </form>
                  <div className="print_spending">
                    <hr/>
                    <div className="row top_buffer">
                        <div className="col-xs-8">Typical Monthly Electricity Bill</div>
                        <div className="col-xs-4">${this.props.elec}</div>
                    </div>
                    <div className="row top_buffer">
                        <div className="col-xs-8">Typical Weekly Gasoline Expenditure</div>
                        <div className="col-xs-4">${this.props.gas}</div>
                    </div>
                  </div>
                </div>
                <div className="footer">
                    <button className={"btn btn-default " + (this.valid() ? '' : 'disabled')} href="#spending" id="calculate_button"
                            onClick={(e)=>{this.calculate(e)}}>
                      CALCULATE
                    </button>
                </div>

            </section>
        )
    }
}

export default BasicInfo;
