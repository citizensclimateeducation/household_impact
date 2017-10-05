import React from 'react';
import {nextSection} from '../lib/Utility.jsx';

class Introduction extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div id="intro" className="card intro_container">
                <div></div>
                <div>
                    <div className="calculator_title">
                        CARBON FEE AND DIVIDEND CALCULATOR
                    </div>

                    <div className="explanation text-muted">
                        Tell us a little bit about your lifestyle and we'll give you a personal estimate of the impact our solution will have on your budget.
                    </div>
                </div>
                <div className="footer">
                    <a href="#basic_questions" className="scroll-down" onClick={(e)=>{nextSection(e, '#basic_questions')}}>
                        <div className="get_started">Get Started</div>
                        <i className="fa fa-chevron-down"></i>
                    </a>
                </div>
            </div>
        )
    }
}

export default Introduction;
