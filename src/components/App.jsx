import React from 'react'
import axios from 'axios';
import { DetailDialogues } from './DetailDialogues.jsx'
import Introduction from './Introduction.jsx'
import FamilyInfo from './FamilyInfo.jsx'
import HomeInfo from './HomeInfo.jsx'
import Spending from './Spending.jsx'
import Results from './Results.jsx'
import ResultsIndicator from './ResultsIndicator.jsx'
import BasicInfoData from './BasicInfoData.jsx'
import numeral from 'numeral/min/numeral.min.js';
import { nextSection, nextAndHideFooter, toCurrency, tagEvent } from '../lib/Utility.jsx'
require('../images/favicon.ico')

const impact_study_url = 'https://ummel.ocpu.io/exampleR/R/predictModel2/json'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      div_pre: 0, mrate: 0.15, elec: 0, gas: 0, heat: 0, cost: '', net_impact: 0, moe: 0, gas_upr: 200,
      elec_upr: 200, show_footer_impact: false, heat_upr: 300, carbon_cost: 0, div_post: 0, initial_heat: 0,
      initial_gas: 0, initial_elec: 0, div_month: 0, cost_month: 0, impact_month: 0, adults: 1, children: 0, other_residents: 0,
      loading: false, heating_type: 'Natural gas', vehicles: 2, zip: '', dwelling_type: 'Stand-alone house'
    }
  }

  costAvailable = () => { return !!this.state.cost; }
  calculateIfValid = () => { if (this.costAvailable() && this.valid()) { this.calculate() } }
  setAttribute = (event) => { this.setState({ [event.target.name]: event.target.value }, this.calculateIfValid) }
  setLoading = (loading) => { this.setState({ loading: loading }) }
  handleSlide = (prop, value) => { this.setState({ [prop]: value }, this.calculateCost) }

  // set results after API call
  setResults = (e) => {
    const utilities = ['gas', 'heat', 'elec'];
    // if utilities costs have already been selected by user don't overwrite those
    Object.keys(e).forEach((key) => { utilities.includes(key) ? this.updateUtility(key, e[key]) : this.setState({ [key]: e[key] }) })

    this.setState({ initial_gas: e.gas, initial_elec: e.elec, initial_heat: e.heat })
    this.calculateCost()
    this.setLoading(false)
  }

  // update a utility with the API value if it's not already set or if it's outside of the upper bounds
  updateUtility = (key, updatedValue) => {
    if (updatedValue === 0 || this.state[key] === 0 || this.state[key] > this.state[key + '_upr']) {
      this.setState({ [key]: Math.round(updatedValue) })
    }
  }

  calculate = (e) => {
    if (this.state.zip) {
      // hide elements during update
      $('.pre_calculate').removeClass('pre_calculate').addClass('post_calculate')
      $('.spending_panel, .search_failed, .calculate_success').hide();
      const costAvailable = this.costAvailable();
      const setLoading = this.setLoading;
      const setResults = this.setResults

      if (!costAvailable) { nextAndHideFooter(e, '#spending'); }

      var data = {
        input: [{
          zip: this.state.zip,
          na: Number(this.state.adults),
          nc: Number(this.state.children),
          hinc: this.state.income,
          hfuel: this.state.heating_type,
          veh: Number(this.state.vehicles),
          htype: String(this.state.dwelling_type)
        }]
      };

      let data_other = null;
      let other_residents_factor = 1.0;

      if (this.state.other_residents > 0) {
        // if there are other residents prepare a "dummy" call for more accurate utilities. Clone original data
        let data_residents = Object.assign({}, data.input[0]);

        const total_family = Number(this.state.adults) + Number(this.state.children);
        other_residents_factor = (total_family + Number(this.state.other_residents)) / total_family;
        data_residents.na = Number(this.state.adults + Number(this.state.other_residents));
        data_residents.hinc = this.state.income * other_residents_factor;
        console.log(`hinc: ${data_residents.hinc}, factor: ${other_residents_factor}`);
        data_other = { input: [data_residents] };
      }

      this.setLoading(true);
      $('.calculating').fadeIn('slow');
      const zip = this.state.zip
      console.log(data)

      Promise.all([
        axios.post(impact_study_url, JSON.stringify(data), { responseType: 'json', headers: { 'Content-Type': 'application/json' } }),
        data_other ? axios.post(impact_study_url, JSON.stringify(data_other), { responseType: 'json', headers: { 'Content-Type': 'application/json' } }) : Promise.resolve(),
      ]).then(function ([original_call, other_residents_call]) {
        console.log(`Main post response:`);
        console.log(original_call.data[0]);
        console.log(`Modified residents response:`);
        console.log(other_residents_call ? other_residents_call.data[0] : '');
        // success, set results and fade them in
        const res = original_call.data[0];

        if (other_residents_call) {
          const other_res = other_residents_call.data[0];
          res.elec = other_res.elec / other_residents_factor;
          res.heat = other_res.heat / other_residents_factor;
          console.log(`Utilities after applying other residents factor:`);
          console.log(res);
        }

        setResults({ ...res })
        $('.calculating').fadeOut('slow', function () {
          $('.spending_panel, #spending, .calculate_success').fadeIn('slow')
          if (!costAvailable) { $('.spending_footer').animate({ opacity: 1 }); }
        });
      }).catch(function (error) {
        // on error log results and focus on zip code
        nextSection('#home_questions');

        $('.search_failed').fadeIn('slow', function () {
          if (!costAvailable) { $('.calculate_footer').animate({ opacity: 1 }); }
        });

        $('.calculating').fadeOut('slow', function () {
          $('.post_calculate').addClass('pre_calculate').removeClass('post_calculate');
          setLoading(false);
        });

        $('#zip').select();
        console.log(error);
      });

    }
  }

  calculateCost = () => {
    let { elec, gas, heat } = this.state
    // cost variable is a string formula (e.g. "428.8 + gas * 0.7924 + elec * 1.12 + heat * 0.7826") returned from 
    // the API call and evaled to determine determine cost in real-time
    const cost = eval(this.state.cost)
    const div_post = numeral(this.state.div_pre).value() * (1.0 - numeral(this.state.mrate).value())
    const carbon_cost = Math.round(cost / 12)
    const div = Math.round(div_post / 12)

    this.setState({
      net_impact: div - carbon_cost,
      carbon_cost: toCurrency(carbon_cost),
      div_post: toCurrency(div)
    })
  }

  valid = () => { return /^\d{5}$/.test(this.state.zip) }
  validZip = (e) => {
    e.persist();
    const re = /^[0-9]{0,5}$/
    const newval = e.target.value + e.key
    const highlighted = window.getSelection().toString()
    if (!re.test(newval) && !highlighted) { e.preventDefault(); }
  }

  setIncome = (income) => { this.setState({ income: income }) }

  // trigger visibility of floating footer
  resultsVisible = (isVisible) => {
    var show_footer_impact = !isVisible && this.costAvailable();
    this.setState({ show_footer_impact: show_footer_impact });
  }

  render() {
    return (
      <div id="impact_calculator">
        {process.env['SHOW_MENU'] &&
          <Menu />
        }
        <Introduction />
        <FamilyInfo handleChange={this.setAttribute} setIncome={this.setIncome} calculateIfValid={this.calculateIfValid}
          {...this.state} />
        <HomeInfo setResults={this.setResults} validZip={this.validZip} setLoading={this.setLoading}
          vehicles={this.state.vehicles} dwelling_type={this.state.dwelling_type} heating_type={this.state.heating_type}
          calculate={this.calculate} valid={this.valid} zip={this.state.zip} setAttribute={this.setAttribute} />
        <Spending {...this.state} handleSlide={this.handleSlide} setResults={this.setResults} />
        <BasicInfoData {...this.state} />
        <Results results={this.state} resultsVisible={this.resultsVisible} />
        <ResultsIndicator net_impact={this.state.net_impact} show_footer_impact={this.state.show_footer_impact} loading={this.state.loading} />
        <DetailDialogues />
      </div>
    )
  }
}

export default App
