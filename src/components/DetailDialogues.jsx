import React from 'react'
import InfoDialog from './InfoDialog.jsx'

export const CalcDetails = (props) => {
  return (
    <InfoDialog dialogId="calcDetails" title="Calculation Explanation">
      <p>
        <a href="https://citizensclimatelobby.org/household-impact-study/">CCL's Household Impact Study</a> estimates the direct financial effect of a
        <a href="https://citizensclimatelobby.org/carbon-fee-and-dividend/">carbon tax and dividend</a> policy for a large, representative sample of U.S. households. Techniques,
        data, and assumptions are described in detail in the associated <a href="https://11bup83sxdss1xze1i3lpol4-wpengine.netdna-ssl.com/wp-content/uploads/2016/05/Ummel-Impact-of-CCL-CFD-Policy-v1_4.pdf">working paper</a>.
      </p>

      <p>
        The calculator uses the study’s results to estimate a household’s additional costs under the policy (due to higher prices for goods and services), depending on a limited set of household characteristics
        (income, number of vehicles, etc.). It also calculates the expected dividend, which is a function of the household’s number of adults, number of minors, and expected federal marginal tax rate.
        The difference between the dividend and additional cost is the “net financial benefit” – positive if a household is likely to “come out ahead” under CF&D.
      </p>

      <p>
        For ease of use, a small and generally easy-to-recall set of user inputs are solicited. The calculator reports the expected average outcome for a household. The actual outcome
        for any specific household could vary from the average. For example, if your household is a below-average consumer of carbon-intensive goods like air travel and meat, the calculator
        will understate the net benefit (and vice-versa). Developing a precise estimate for every household would require many more questions and accurate recall. We have opted for simplicity over precision.
      </p>
    </InfoDialog>
  )

}

const HouseholdSizeDetails = (props)=> {
  return (
    <InfoDialog dialogId="houseSizeDetails" title="Household Size">
      The number of adults (18+) and minors (less than 18) affects the size of the dividend your household would receive
      under <a href="https://citizensclimatelobby.org/basics-carbon-fee-dividend/">CCL's proposal</a>.
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
