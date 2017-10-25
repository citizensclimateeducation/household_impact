import React from 'react';
import {nextSection} from '../lib/Utility.jsx';
import {toCurrency} from '../lib/Utility.jsx'

class BasicInfoData extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <div className="pre_calculate basic_info_data">
            <div className="row">
              <div className="col-xs-12 bottom_buffer">
                <span className="form_title">Household Summary</span>
                <a href="#basic_questions" onClick={(e)=>{nextSection(e, '#basic_questions')}}>Edit Household Summary...</a>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-4">Adults</div>
              <div className="col-xs-2">{this.props.adults}</div>
              <div className="col-xs-4">Children</div>
              <div className="col-xs-2">{this.props.children}</div>
            </div>
            <div className="row">
              <div className="col-xs-4"># Rooms</div>
              <div className="col-xs-2">{this.props.rooms}</div>
              <div className="col-xs-4"># Vehicles</div>
              <div className="col-xs-2">{this.props.vehicles}</div>
            </div>
            <div className="row">
            </div>
            <div className="row">
              <div className="col-md-6">Zip Code: {this.props.zip}</div>
              <div className="col-md-6">Income: {toCurrency(this.props.income, '$0,0')}</div>
            </div>
          </div>
        )
    }
}

export default BasicInfoData;
