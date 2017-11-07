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
                    Carbon Fee and Dividend is the policy that climate scientists and economists alike say is the best first step to reduce the likelyhood
                    of catastrophic climate change from global warming. <a href="https://citizensclimatelobby.org/basics-carbon-fee-dividend/">Learn
                    more about the policy.</a>
                  </div>

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
