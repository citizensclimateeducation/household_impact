import React from 'react'
import Introduction from './Introduction.jsx'
import BasicInfo from './BasicInfo.jsx'
import Spending from './Spending.jsx'
import Results from './Results.jsx'
import Menu from './Menu.jsx'
import numeral from 'numeral/min/numeral.min.js';
import {toCurrency} from '../lib/Utility.jsx'
require('../images/favicon.ico')

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { div_pre: 0, mrate: 0.15, elec: 100, gas: 100, cost: '', net_impact: 0,
                  carbon_cost: 0, div_post: 0, initial_gas: 0, initial_elec: 0, div_month: 0, cost_month: 0, impact_month: 0 }
    this.setResults = this.setResults.bind(this)
  }

  handleSlide = (prop, value) => {
    this.setState({[prop]: value})
    this.calculateCost()
  }

  calculateCost = () => {
    var elec = this.state.elec
    var gas = this.state.gas
    var cost = eval(this.state.cost)
    var div_post = numeral(this.state.div_pre).value() * (1.0 - numeral(this.state.mrate).value())

    this.setState({
      net_impact: toCurrency((div_post - cost) / 12),
      carbon_cost: toCurrency(cost / 12),
      div_post: toCurrency(div_post / 12)
    })
  }

  setResults(e) {
    console.log(e)
    this.setState(e)
    this.setState({initial_gas: e.gas, initial_elec: e.elec})
    this.calculateCost()
  }

  render() {
    return (
      <div id="impact_calculator">
        <Menu/>
        <div className="section intro_basic">
          <Introduction/>
          <BasicInfo setResults={this.setResults} gas={this.state.gas} elec={this.state.elec}/>
        </div>
        <div className="section pre_calculate">
          <Spending {...this.state} handleSlide={this.handleSlide} setResults={this.setResults} />
          <Results results={this.state}/>
        </div>
      </div>
    )
  }
}

export default App
