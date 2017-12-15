import React from 'react'
import InfoDialog from './InfoDialog.jsx'

export const CalcDetails = (props) => {
  return (
    <InfoDialog dialogId="calcDetails" title="Calculation Explanation">
      <h4>Methods2</h4>
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
    </InfoDialog>
  )

}

const HouseholdSizeDetails = (props)=> {
  return (
    <InfoDialog dialogId="houseSizeDetails" title="Household Size">
      The number of adults (18+) and minors (less than 18) affects the size of the dividend your household would receive 
      under <a href="https://citizensclimatelobby.org/basics-carbon-fee-dividend/">CCL's proposal</a>
    </InfoDialog>
  );
}

const IncomeDetails = (props)=> {
  return (
    <InfoDialog dialogId="incomeDetails" title="Household Income">
      Households with higher income generally consume more, leading to a larger carbon footprint and greater exposure to a carbon fee.
    </InfoDialog>
  );
}

const ZipCodeDetails = (props)=> {
  return (
    <InfoDialog dialogId="zipCodeDetails" title="Zip Code">
      Location-specific factors like carbon-intensity of the electricity grid, climate, fuel prices, and population density affect how much a carbon fee will impact your household.
    </InfoDialog>
  );
}

const HomeTypeDetails = (props)=> {
  return (
    <InfoDialog dialogId="homeTypeDetails" title="Home/Dwelling Type">
      Dwelling type is correlated with energy efficiency and the size of a home. Stand-alone houses are usually larger and associated with higher carbon footprints and greater exposure to a carbon fee.
    </InfoDialog>
  );
}

const HeatingFuelDetails = (props)=> {
  return (
    <InfoDialog dialogId="heatingFuelDetails" title="Heating Fuel">
      How you heat your home can have a significant impact on your household's carbon footprint and exposure to a carbon fee.
    </InfoDialog>
  );
}

export const DetailDialogues = (props) => {
  return (
    <div>
      <ZipCodeDetails />
      <IncomeDetails />
      <HouseholdSizeDetails />
      <CalcDetails />
      <HomeTypeDetails />
      <HeatingFuelDetails />
    </div>
  )
}
