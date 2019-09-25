import React from 'react';
import InfoDialog from './InfoDialog.js';

/**
 * Contains all dialogs used in the App
 * Exports dialogs in Div for placement at footer
 */
export const CalcDetails = props => {
  return (
    <InfoDialog dialogId="calcDetails" title="Calculation Explanation">
      <h4>How does the calculator work?</h4>
      <p>
        <a href="https://citizensclimatelobby.org/household-impact-study/" target="_blank">
          Citizens' Climate Lobby's Household Impact Study
        </a>{' '}
        estimates the direct financial effect of a
        <a href="https://citizensclimatelobby.org/carbon-fee-and-dividend/" target="_blank">
          {' '}
          carbon tax and dividend
        </a>{' '}
        policy for a large, representative sample of U.S. households. Techniques, data, and assumptions are described in
        detail in the associated{' '}
        <a
          href="https://11bup83sxdss1xze1i3lpol4-wpengine.netdna-ssl.com/wp-content/uploads/2016/05/Ummel-Impact-of-CCL-CFD-Policy-v1_4.pdf"
          target="_blank"
        >
          working paper
        </a>
        .
      </p>

      <p>The calculator uses the study’s results to calculate:</p>
      <ul>
        <li>
          <span className="font-weight-bold">an estimate of a household's carbon fee costs</span> under the policy (due
          to higher prices for goods and services), depending on a limited set of household characteristics (income,
          number of vehicles etc.).
        </li>
        <li>
          <span className="font-weight-bold">the expected dividend</span>, which is a function of the household's number
          of adults, number of minors, and expected federal marginal tax rate.
        </li>
        <li>
          <span className="font-weight-bold">the "estimated gain per month"</span> -- the difference between the
          dividend and additional cost - positive if a household is likely to "come out ahead" under the Energy
          Innovation and Carbon Dividend proposal.
        </li>
      </ul>

      <h4>How accurate is the calculator?</h4>
      <p>
        For ease of use, a small and generally easy-to-recall set of user inputs are solicited. The calculator reports
        the expected average outcome for a household. The actual outcome for any specific household could vary from the
        average. For example, if your household is a below-average consumer of carbon-intensive goods like air travel
        and meat, the calculator will understate the estimated gain (and vice-versa). Developing a precise estimate for
        every household would require many more questions and accurate recall. We have opted for simplicity over
        precision.
      </p>
    </InfoDialog>
  );
};

const LivingSituation = props => {
  return (
    <InfoDialog dialogId="livingSituation" title="Living Situation">
      This helps us calculate your dividends and carbon costs as accurately as possible. For this purpose, “family”
      means a financial unit such as a couple living together or a person/couple living with children or other
      dependents. “Housemates” would include people sharing your residence who are not part of your family (as a
      financial unit), such as roommates sharing an apartment, boarders renting a room, children or parents with
      separate finances, or another family sharing a house.
    </InfoDialog>
  );
};

const HouseholdSizeDetails = props => {
  return (
    <InfoDialog dialogId="houseSizeDetails" title="Household Size">
      The number of adults (19+) and minors (under 19) affects the size of the dividend your household would receive
      under the Energy Innovation and Carbon Dividend proposal. It also affects household energy efficiency.
    </InfoDialog>
  );
};

const OtherResidentsDetails = props => {
  return (
    <InfoDialog dialogId="otherResidentsDetails" title="Other Residents">
      The number of non-family residents affects the total amount that you pay for utilities.
    </InfoDialog>
  );
};

const IncomeDetails = props => {
  return (
    <InfoDialog dialogId="incomeDetails" title="Household Income">
      Households with higher income generally consume more, leading to a larger carbon footprint and greater exposure to
      a carbon fee.
    </InfoDialog>
  );
};

const ZipCodeDetails = props => {
  return (
    <InfoDialog dialogId="zipCodeDetails" title="Zip Code">
      Location-specific factors like carbon-intensity of the electricity grid, heating & cooling needs, fuel prices, and
      population density affect how much a carbon fee will impact your household.
    </InfoDialog>
  );
};

const HomeTypeDetails = props => {
  return (
    <InfoDialog dialogId="homeTypeDetails" title="Home/Dwelling Type">
      Dwelling type is correlated with energy efficiency and the size of a home. Stand-alone houses are usually larger
      and associated with higher carbon footprints and greater exposure to a carbon fee.
    </InfoDialog>
  );
};

const HeatingFuelDetails = props => {
  return (
    <InfoDialog dialogId="heatingFuelDetails" title="Heating Fuel">
      How you heat your home can have a significant impact on your household's carbon footprint and exposure to a carbon
      fee.
      <br />
      <br />
      If you own or rent more than one property with different heating fuels, choose your primary fuel source.
    </InfoDialog>
  );
};

const MultipleProperties = props => {
  return (
    <InfoDialog dialogId="multipleProperties" title="Shared Expenses">
      If you share utility costs with housemates outside your family, enter just the portion your family is responsible
      for
    </InfoDialog>
  );
};

const GasExpense = props => {
  return (
    <InfoDialog dialogId="gasExpense" title="Gasoline Expense">
      Compile or estimate how much you spend in a month for all your vehicles.
    </InfoDialog>
  );
};

const MinorDetails = props => {
  return (
    <InfoDialog dialogId="minorDetails" title="Minors">
      Minors each get half of an adult dividend.
    </InfoDialog>
  );
};

const VehicleDetails = props => {
  return (
    <InfoDialog dialogId="vehicleDetails" title="Vehicles Owned">
      This allows us to estimate your transportation carbon cost.
    </InfoDialog>
  );
};

export const DetailDialogues = props => {
  return (
    <div>
      <LivingSituation />
      <ZipCodeDetails />
      <IncomeDetails />
      <HouseholdSizeDetails />
      <OtherResidentsDetails />
      <CalcDetails />
      <HomeTypeDetails />
      <HeatingFuelDetails />
      <MultipleProperties />
      <GasExpense />
      <VehicleDetails />
      <MinorDetails />
    </div>
  );
};
