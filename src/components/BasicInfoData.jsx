import React from 'react';
import {nextSection} from '../lib/Utility.jsx';

class BasicInfoData extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <div>
          <div className="form-group row">
            <label className="col-form-label col-sm-8 col-xs-12">HOUSEHOLD SIZE</label>
          </div>
          <div className="form-group row">
            <div className="col-xs-8"><h4>Adults</h4></div>
            <div className="col-xs-4 cost"><h4>{this.props.adults}</h4></div>
          </div>
          <div className="form-group row">
            <div className="col-xs-8"><h4>Children</h4></div>
            <div className="col-xs-4 cost"><h4>{this.props.children}</h4></div>
          </div>
          <div className="form-group row">
            <div className="col-xs-8"><h4>Zip Code</h4></div>
            <div className="col-xs-4 cost"><h4>{this.props.zip}</h4></div>
          </div>
          <div className="form-group row">
            <div className="col-xs-8"><h4>Household Income</h4></div>
            <div className="col-xs-4 cost"><h4>{this.props.income}</h4></div>
          </div>
          </div>
        )
    }
}

export default BasicInfoData;
