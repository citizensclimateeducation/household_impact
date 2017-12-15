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
                <div className="footer text-center">
                  <div className="cf_and_d_explanation text-muted">
                    CCL's <a href="https://citizensclimatelobby.org/basics-carbon-fee-dividend/">Carbon Fee and Dividend</a> is the policy that climate scientists and economists alike say 
                    is the best first step to reduce the likelyhood of catastrophic climate change from global warming. Learn more about the policy. This calculator estimates the impact of 
                    both the carbon fee and dividend for the first years' fee of $15/ton.
                  </div>

                  <button href="#basic_questions" className="btn btn-default btn-intro" onClick={(e)=>{nextSection(e, '#basic_questions')}}>Get Started</button>
                </div>
            </div>
        )
    }
}

export default Introduction;
