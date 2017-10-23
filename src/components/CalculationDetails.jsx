import React from 'react'

const CalculationDetails = (props)=> {
  return (
    <div className="modal fade" id="calculationDetails">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <h3 className="modal-title">Calculation Explanation</h3>
          </div>
          <div className="modal-body">
            <h4>Methods</h4>
            <p>
              This calculation is based on the <a href="https://citizensclimatelobby.org/household-impact-study/">Household Impact Study</a> done by Kevin Ummel.
              The <a href="https://11bup83sxdss1xze1i3lpol4-wpengine.netdna-ssl.com/wp-content/uploads/2016/05/Ummel-Impact-of-CCL-CFD-Policy-v1_4.pdf">working paper</a> estimates
              the policy impact for a representative sample of about 6 million households and should be the primary
              reference for anyone interested in underlying methods.</p>

              <p>The model behind this calculator provides a way to derive
              a reasonable estimate of how households "similar" to the user (based on the 6 million sample) typically do under the policy --
              but intelligently selecting a small set of household attributes for defining "similar", in order to make the tool tractable.</p>

              <p>The actual modeling technique is a machine learning algorithm that falls under the heading
              of <a href="https://en.wikipedia.org/wiki/Gradient_boosting">"gradient boosting"</a>, and is
              implemented in R packages
              like <a href="https://cran.r-project.org/web/packages/gbm/index.html">gbm</a> and <a href="https://cran.r-project.org/web/packages/h2o/index.html">h2o</a>, the
              latter provides bindings to the open-source <a href="https://www.h2o.ai/">H2O.ai</a> platform.
            </p>

            <h4>Assumptions</h4>

            <p>For the purposes of this calculator we assume a federal marginal tax bracket of 15%. We also assume the starting carbon
            fee of $15/ton of CO<sub>2</sub> equivalent emissions of fossil fuels.</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalculationDetails;
