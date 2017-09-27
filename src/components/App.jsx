import React from 'react'
import Introduction from './Introduction.jsx'
import BasicInfo from './BasicInfo.jsx'
import Spending from './Spending.jsx'
import Results from './Results.jsx'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {div_pre: 0, mrate: 0.15, elec: 100, gas: 100, cost: ''}

    this.setResults = this.setResults.bind(this)
  }

  electricSlide = (value) => {
    this.setState({gas: e})
  }

  setResults(e) {
    console.log(e)
    this.setState(e);
  }

  render() {
    const results = this.state;
    const gas = this.state.gas;
    const elec = this.state.elec;

    return (
    <div>
        <Introduction />
        <BasicInfo setResults={this.setResults} />
        <Spending setResults={this.setResults} gas={gas} elec={elec}  />
        <Results results={results} />
    </div>
    )
  }
}

export default App
