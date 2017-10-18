import React from 'react';
import {nextSection} from '../lib/Utility.jsx';
import {toCurrency} from '../lib/Utility.jsx'

class BasicInfoData extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <div className="pre_calculate">
            <div className="row">
              <div className="col-xs-12 bottom_buffer">
                <span className="form_title">Household Summary</span>
                <a href="#basic_questions" onClick={(e)=>{nextSection(e, '#basic_questions')}}>Edit Household Summary...</a>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-8 col-md-6"><h4>Adults</h4></div>
              <div className="col-xs-4 col-md-6"><h4>{this.props.adults}</h4></div>
            </div>
            <div className="row">
              <div className="col-xs-8 col-md-6"><h4>Children</h4></div>
              <div className="col-xs-4  col-md-6"><h4>{this.props.children}</h4></div>
            </div>
            <div className="row">
            </div>
            <div className="row">
              <div className="col-xs-8 col-md-6"><h4>Zip Code</h4></div>
              <div className="col-xs-4 col-md-6"><h4>{this.props.zip}</h4></div>
            </div>
            <div className="row">
              <div className="col-xs-8 col-md-6"><h4>Household Income</h4></div>
              <div className="col-xs-4 col-md-6"><h4>{toCurrency(this.props.income, '$0,0')}</h4></div>
            </div>
          </div>
        )
    }
}

export default BasicInfoData;
