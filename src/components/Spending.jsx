import React from 'react';
import Slider from 'react-rangeslider'
import {nextSection} from '../lib/Utility.jsx';

class Spending extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section id="spending" className="demo">
                <div></div>
                <div>
                    <div className="form_title">Next, a couple of questions about your spending.</div>

                    <div className="calculating">
                        <i className="fa fa-spinner fa-spin"></i> Calculating Presets <i className="fa fa-spinner fa-spin"></i>
                    </div>

                    <div className="spending explanation">
                        Let us know about how much you spend on electricity and gas or, if you've entered basic information above, we can
                        <a href="#spending" id="calculate">calculate</a> defaults for you based on similar households.
                    </div>

                    <form>
                        <div className="form-group">
                            <label htmlFor="electricity">Typical Monthly Electricity Bill: ${this.props.elec}</label>
                            <div>
                                <Slider min={0} max={300} step={1} value={this.props.elec}
                                        onChange={(value) => {this.setState({elec: value})}}/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="gasoline">Typical Weekly Gasoline Expenditure: ${this.props.gas}</label>
                            <div>
                                <Slider min={0} max={300} step={1} value={this.props.gas}
                                        onChange={(value) => {this.setState({gas: value})}}/>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="footer">
                    <a href="#results" className="scroll-down" onClick={(e)=>{nextSection(e, '#results')}}>
                        <i className="fa fa-chevron-down"></i>
                    </a>
                </div>
            </section>
        )
    }
}

export default Spending;
