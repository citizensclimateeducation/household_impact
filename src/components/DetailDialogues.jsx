import React from 'react'
import InfoDialog from './InfoDialog.jsx'

/**
 * Contains all dialogs used in the App
 * Exports dialogs in Div for placement at footer
 */
export const CalcDetails = (props) => {
  return (
    <InfoDialog dialogId="calcDetails" title="Calculation Explanation">
      <h4>How does the calculator work?</h4>
      <p>
        <a href="https://citizensclimatelobby.org/household-impact-study/" target="_blank">CCL's Household Impact Study</a> estimates the direct financial effect of a
        <a href="https://citizensclimatelobby.org/carbon-fee-and-dividend/" target="_blank"> carbon tax and dividend</a> policy for a large, representative sample of U.S. households. Techniques,
        data, and assumptions are described in detail in the associated <a href="https://11bup83sxdss1xze1i3lpol4-wpengine.netdna-ssl.com/wp-content/uploads/2016/05/Ummel-Impact-of-CCL-CFD-Policy-v1_4.pdf" target="_blank">working paper</a>.
      </p>

      <p>
        The calculator uses the study’s results to calculate:
      </p>
      <ul>
        <li><span className="font-weight-bold">an estimate of a household's additional costs</span> under the policy (due to higher prices for goods and services), depending
          on a limited set of household characteristics (income, number of vehicles etc.).
        </li>
        <li><span className="font-weight-bold">the expected dividend</span>, which is a function of the household's number of adults, number of minors, and
          expected federal marginal tax rate.
        </li>
        <li><span className="font-weight-bold">the "net benefit per month"</span> -- the difference between the dividend and additional cost - positive if a household
          is likely to "come out ahead" under CF&D.
        </li>
      </ul>

      <h4>How accurate is the calculator?</h4>
      <p>
        For ease of use, a small and generally easy-to-recall set of user inputs are solicited. The calculator reports the expected average outcome for a household.
        The actual outcome for any specific household could vary from the average. For example, if your household is a below-average consumer of carbon-intensive goods
        like air travel and meat, the calculator will understate the net benefit (and vice-versa). Developing a precise estimate for every household would require many
        more questions and accurate recall. We have opted for simplicity over precision.
      </p>
    </InfoDialog>
  )

}

const HouseholdSizeDetails = (props)=> {
  return (
    <InfoDialog dialogId="houseSizeDetails" title="Household Size">
      The number of adults (18+) and minors (under 18) affects the size of the dividend your household would receive
      under <a href="https://citizensclimatelobby.org/basics-carbon-fee-dividend/" target="_blank">CCL's proposal</a>. 
      It also affects household energy efficiency.
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
      Location-specific factors like carbon-intensity of the electricity grid, heating & cooling needs, fuel prices, and population density affect how much a carbon fee will impact your household.
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
      How you heat your home can have a significant impact on your household's carbon
      footprint and exposure to a carbon fee.<br /><br />
      If you own or rent more than one property with different heating fuels, choose your primary fuel source.
    </InfoDialog>
  );
}

const MultipleProperties = (props)=> {
  return (
    <InfoDialog dialogId="multipleProperties" title="Multiple Properties">
      Combine average monthly bills for all properties that you rent or own.
    </InfoDialog>
  );
}

const GasExpense = (props)=> {
  return (
    <InfoDialog dialogId="gasExpense" title="Gas Expense">
      Compile or estimate how much you spend in a month for all your vehicles.
    </InfoDialog>
  );
}

const MinorDetails = (props) => {
  return (
    <InfoDialog dialogId="minorDetails" title="Minors">
      The first two minors in a household each get half of an adult dividend.
    </InfoDialog>
  )
}

const VehicleDetails = (props) => {
  return (
    <InfoDialog dialogId="vehicleDetails" title="Vehicles Owned">
      This allows us to estimate your transportation carbon cost.
    </InfoDialog>
  )
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
      <MultipleProperties />
      <GasExpense />
      <VehicleDetails />
      <MinorDetails />
    </div>
  )
}
