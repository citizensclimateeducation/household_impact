import React from 'react'
import {DetailDialogues} from './DetailDialogues.jsx'
import Introduction from './Introduction.jsx'
import FamilyInfo from './FamilyInfo.jsx'
import HomeInfo from './HomeInfo.jsx'
import Spending from './Spending.jsx'
import Results from './Results.jsx'
import BasicInfoData from './BasicInfoData.jsx'
import Menu from './Menu.jsx'
import numeral from 'numeral/min/numeral.min.js';
import {toCurrency} from '../lib/Utility.jsx'
require('../images/favicon.ico')

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { div_pre: 0, mrate: 0.15, elec: 100, gas: 75, heat: 50, cost: '', net_impact: 0, moe: 0, gas_upr: 200, elec_upr: 200,
                  heat_upr: 300, carbon_cost: 0, div_post: 0, initial_heat: 0, initial_gas: 0, initial_elec: 0, div_month: 0, cost_month: 0, impact_month: 0,
                  adults: 1, children: 0, loading: false}
    this.setResults = this.setResults.bind(this)
  }

  setAttribute = (event) => { this.setState({ [event.target.name]: event.target.value }); }
  setLoading = (loading) => { this.setState({ loading: loading }) }

  handleSlide = (prop, value) => {
    this.setState({[prop]: value})
    this.calculateCost()
  }

  calculateCost = () => {
    const elec = this.state.elec
    const gas = this.state.gas
    const heat = this.state.heat
    const cost = eval(this.state.cost)
    const div_post = numeral(this.state.div_pre).value() * (1.0 - numeral(this.state.mrate).value())

    const carbon_cost = Math.round(cost / 12)
    const div = Math.round(div_post / 12)
    const net_impact = div - carbon_cost

    this.setState({
      net_impact: net_impact,
      carbon_cost: toCurrency(carbon_cost),
      div_post: toCurrency(div)
    })
  }

  setResults(e) {
    //console.log(e)
    this.setState(e)
    this.setState({initial_gas: e.gas, initial_elec: e.elec, initial_heat: e.heat})
    this.calculateCost()
    this.setLoading(false);
  }
  setIncome = (income) => { this.setState({income: income}) }

  render() {
    return (
      <div id="impact_calculator">
        {process.env['SHOW_MENU'] &&
          <Menu/>
        }
        <Introduction/>
        <FamilyInfo handleChange={this.setAttribute} income={this.state.income} setIncome={this.setIncome} />
        <HomeInfo setResults={this.setResults} gas={this.state.gas} elec={this.state.elec}
          heat={this.state.heat} children={this.state.children} adults={this.state.adults} income={this.state.income} setLoading={this.setLoading} />
        <Spending {...this.state} handleSlide={this.handleSlide} setResults={this.setResults} />
        <BasicInfoData {...this.state}/>
        <Results results={this.state}/>
        <DetailDialogues />
      </div>
    )
  }
}

export default App
