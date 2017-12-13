import React from 'react';
import axios from 'axios';
import Slider from 'react-rangeslider';
import NumberFormat from 'react-number-format';
import NumericInput from 'react-numeric-input';
import {nextSection, toCurrency} from '../lib/Utility.jsx';
// import {toCurrency} from '../lib/Utility.jsx';

const impact_study_url = 'https://ummel.ocpu.io/exampleR/R/predictModel/json'

class BasicInfo extends React.Component {
    constructor() {
        super();
        this.state = {heating_type: 'Natural gas', vehicles: 2, adults: 1, children: 0, income: this.position_to_income(272),
                      income_pos: 272, zip: '', dwelling_type: 'Stand-alone house'}
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
                veh: Number(this.state.vehicles),
                htype: String(this.state.dwelling_type)
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

    toNearestThousand = (val) => { return Math.ceil(((val + 1) / 1000)) * 1000 }

    // based on https://stackoverflow.com/questions/846221/logarithmic-slider
    position_to_income = (val) => {
        console.log(val)
        const minp = 0;
        const maxp = 500;
        const minv = 8.517193191416238; //Math.log(5000);
        const maxv = 12.89921982609012; //Math.log(400000);
        // calculate adjustment factor
        var scale = 0.008764053269347762; // (maxv-minv) / (maxp-minp);
        return this.toNearestThousand(Math.exp(minv + scale*(val-minp)))
    }

    // TODO: extract // 0 to 1000 maps to 0 to 400,000 logarithmically
    handleSlide = (val) => { this.setState({income: this.position_to_income(val), income_pos: val}) }

    range = (start, end) => { return [...Array(1+end-start).keys()].map(v => start+v) }

    numberOptionList = (begin, end) => {
        return this.range(begin, end).map((val) =>
            <option key={val}>{val}</option>
        )
    }

    render() {
        return (
            <div id="basic_questions" className="card input">
                <div className="print_banner">
                    <a className="print_only" href="#">
                        <img src={require('../images/ccl-logo-alpha.png')} className="menu-logo" />
                    </a>
                </div>
                <div className="basic_info_panel">
                    <div className="form_title no_print">Tell us a little bit about your household</div>
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
                        <div className="row">
                            <div className="form-group col-lg-4 col-xs-6">
                                <label htmlFor="adults"># of Adults</label>
                                <select className="form-control number_select" id="adults" name="adults" value={this.state.adults}
                                    onChange={this.handleChange}>
                                    {this.numberOptionList(1, 6)}
                                </select>
                            </div>
                            <div className="form-group col-xs-6">
                                <label htmlFor="adults"># of Minors</label>
                                <select className="form-control number_select" id="children" name="children" value={this.state.children}
                                    onChange={this.handleChange}>
                                    {this.numberOptionList(0, 9)}
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group">
                                <div className="col-md-12 col-lg-8">
                                    <label htmlFor="income">Household Income: {toCurrency(this.state.income, '$0,0')}</label>
                                    <div className="no_print">
                                        <Slider min={0} max={500} step={1} value={this.state.income_pos} onChange={this.handleSlide}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">&nbsp;</div>
                        <div className="row">
                            <div className="form-group col-lg-4 col-md-6 col-sm-8">
                                <label htmlFor="zip">Zip Code</label>
                                <input size="8" className="form-control" id="zip" name="zip" placeholder="Zip Code" ref="zip"
                                    value={this.state.zip} onChange={this.handleChange} onKeyPress={(e) => this.validZip(e)} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-xs-6">
                                <label htmlFor="dwelling_type">Dwelling Type</label>
                                <select className="form-control" id="rooms" name="rooms" value={this.state.dwelling_type}
                                    onChange={this.handleChange}>
                                    <option>Stand-alone house</option>
                                    <option>Apartment building</option>
                                    <option value='Townhouse or other attached housing'>Townhouse</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div className="form-group col-lg-4 col-xs-6">
                                <label htmlFor="vehicles"># of Vehicles</label>
                                <select className="form-control number_select" id="vehicles" name="vehicles" value={this.state.vehicles}
                                    onChange={this.handleChange}>
                                    {this.numberOptionList(0, 4)}
                                    <option value='5'>5+</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-lg-4 col-md-6 col-sm-8">
                                <label htmlFor="heating_type">Heating Fuel</label>
                                <select className="form-control" id="heating_type" name="heating_type" value={this.state.heating_type}
                                    onChange={this.handleChange}>>
                                    <option>Natural gas</option>
                                    <option>Electricity</option>
                                    <option>LPG/Propane</option>
                                    <option>Heating oil</option>
                                    <option>Other or none</option>
                                    <option>Do not know</option>
                                </select>
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
