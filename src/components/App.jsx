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
    this.state = {
      div_pre: 0,
      mrate: 0.15,
      elec: 100,
      gas: 100,
      cost: '',
      net_impact: 0,
      carbon_cost: 0,
      div_post: 0
    }

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
    this.setState({
      net_impact: toCurrency(this.state.div_pre - cost),
      carbon_cost: toCurrency(cost),
      div_post: toCurrency(numeral(this.state.div_pre).value() * (1.0 - numeral(this.state.mrate).value()))
    })
  }

  setResults(e) {
    console.log(e)
    this.setState(e)
    this.calculateCost()
  }

  render() {
    const results = this.state
    const gas = this.state.gas
    const elec = this.state.elec
    const net_impact = this.state.net_impact

    return (
      <div id="impact_calculator">
        <Menu/>
        <Introduction/>
        <BasicInfo setResults={this.setResults} gas={gas} elec={elec}/>
        <Spending setResults={this.setResults} gas={gas} elec={elec} handleSlide={this.handleSlide}/>
        <Results results={results}/>
      </div>
    )
  }
}

export default App
