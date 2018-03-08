import React from 'react'
import axios from 'axios';
import {DetailDialogues} from './DetailDialogues.jsx'
import Introduction from './Introduction.jsx'
import FamilyInfo from './FamilyInfo.jsx'
import HomeInfo from './HomeInfo.jsx'
import Spending from './Spending.jsx'
import Results from './Results.jsx'
import ResultsIndicator from './ResultsIndicator.jsx'
import BasicInfoData from './BasicInfoData.jsx'
import numeral from 'numeral/min/numeral.min.js';
import {nextSection, nextAndHideFooter, toCurrency, tagEvent} from '../lib/Utility.jsx'
require('../images/favicon.ico')

const impact_study_url = 'https://ummel.ocpu.io/exampleR/R/predictModel/json'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { div_pre: 0, mrate: 0.15, elec: 0, gas: 0, heat: 0, cost: '', net_impact: 0, moe: 0, gas_upr: 200, 
      elec_upr: 200, show_footer_impact: false, heat_upr: 300, carbon_cost: 0, div_post: 0, initial_heat: 0, 
      initial_gas: 0, initial_elec: 0, div_month: 0, cost_month: 0, impact_month: 0, adults: 1, children: 0, loading: false, 
      heating_type: 'Natural gas', vehicles: 2, zip: '', dwelling_type: 'Stand-alone house'}
  }

  costAvailable = () => { return !!this.state.cost; }
  calculateIfValid = () => { if(this.costAvailable() && this.valid()) { this.calculate(); }}
  setAttribute = (event) => { this.setState({ [event.target.name]: event.target.value }, this.calculateIfValid); }
  setLoading = (loading) => { this.setState({ loading: loading }) }

  handleSlide = (prop, value) => {
    this.setState({[prop]: value}, this.calculateCost);
  }

  setResults = (e) => {
    const utilities = ['gas', 'heat', 'elec'];
    Object.keys(e).forEach((key) => { utilities.includes(key) ? this.updateUtility(key, e[key]) : this.setState({ [key]: e[key] }) })
    this.setState({initial_gas: e.gas, initial_elec: e.elec, initial_heat: e.heat})
    this.calculateCost()
    this.setLoading(false);
  }

  updateUtility = (key, updatedValue) => {
    if (updatedValue === 0 || this.state[key] === 0 || this.state[key] > this.state[key + '_upr']) {
      this.setState({ [key]: updatedValue })
    }
  }

  calculate = (e) => {
    if (this.state.zip) {
      $('.pre_calculate').removeClass('pre_calculate').addClass('post_calculate')
      $('.spending_panel, .search_failed, .calculate_success').hide();
      const costAvailable = this.costAvailable();
      const setLoading = this.setLoading;
      const setResults = this.setResults

      if (!costAvailable) { nextAndHideFooter(e, '#spending'); }

      var data = {input: [{
        zip: this.state.zip,
        na: Number(this.state.adults),
        nc: Number(this.state.children),
        hinc: this.state.income,
        hfuel: this.state.heating_type,
        veh: Number(this.state.vehicles),
        htype: String(this.state.dwelling_type)
      }]};


      this.setLoading(true);
      $('.calculating').fadeIn('slow');
      const zip = this.state.zip
      const basic_questions = this.state;

      axios.post(impact_study_url, JSON.stringify(data), {responseType: 'json', headers: {'Content-Type': 'application/json'}}).
        then(function(response) {
          setResults({...response.data[0]})
          $('.calculating').fadeOut('slow', function() {
            $('.spending_panel, #spending, .calculate_success').fadeIn('slow')
            if(!costAvailable) { $('.spending_footer').animate({ opacity: 1 }); }
          });
        }).catch(function(error) {
          nextSection('#home_questions'); 
          
          $('.search_failed').fadeIn('slow', function() {
            if(!costAvailable) { $('.calculate_footer').animate({ opacity: 1}); }
          });

          $('.calculating').fadeOut('slow', function() {
            $('.post_calculate').addClass('pre_calculate').removeClass('post_calculate');
            setLoading(false);
          });

          $('#zip').select();
          console.log(error);
        })
    }
  }

  calculateCost = () => {
    const elec = this.state.elec
    const gas = this.state.gas
    const heat = this.state.heat
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

  setIncome = (income) => { this.setState({income: income}) }

  resultsVisible = (isVisible) => {
    var show_footer_impact = !isVisible && this.costAvailable();
    this.setState({show_footer_impact: show_footer_impact});
  }

  render() {
    return (
      <div id="impact_calculator">
        {process.env['SHOW_MENU'] &&
          <Menu/>
        }
        <Introduction/>
        <FamilyInfo handleChange={this.setAttribute} income={this.state.income} setIncome={this.setIncome} 
          calculateIfValid={this.calculateIfValid} adults={this.state.adults} children={this.state.children} />
        <HomeInfo setResults={this.setResults} validZip={this.validZip} setLoading={this.setLoading} 
          vehicles={this.state.vehicles} dwelling_type={this.state.dwelling_type} heating_type={this.state.heating_type}
          calculate={this.calculate} valid={this.valid} zip={this.state.zip} setAttribute={this.setAttribute}/>
        <Spending {...this.state} handleSlide={this.handleSlide} setResults={this.setResults} />
        <BasicInfoData {...this.state}/>
        <Results results={this.state} resultsVisible={this.resultsVisible} />
        <ResultsIndicator net_impact={this.state.net_impact} show_footer_impact={this.state.show_footer_impact} loading={this.state.loading} />
        <DetailDialogues />
      </div>
    )
  }
}

export default App
