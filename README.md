# Personal Carbon Dividend Calculator

This is an application built by [Citizen's Climate Lobby](https://citizensclimatelobby.org/) that uses data from the [Household Impact](https://citizensclimatelobby.org/household-impact-study/) study to estimate the net impact of [Carbon Fee and Dividend](https://citizensclimatelobby.org/carbon-fee-and-dividend/) on an individual household.

[Calculator](https://energyinnovationact.org/carbon-dividend-calculator/)  
[Project FAQ](https://energyinnovationact.org/personal-carbon-dividend-calculator-faq/)  
[How to use the calculator](https://community.citizensclimate.org/resources/item/19/133)  
[Updates from previous version](http://cclusa.org/calculator-training)

![Calculator Intro](https://citizensclimatelobby.org/wp-content/uploads/2018/03/compressed-CFD-Calculator-header.jpg)

### Prerequisites

This application uses node.js > 9, and parcel

### Installing

Instructions for Ubuntu:
```
// install nodejs and npm
> curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
> sudo apt install nodejs

// install build essentials needed by node-gyp
sudo apt install build-essential

// go to project directory and install node packages
> npm install

// run the app in demo mode
npm run start
```

## Deployment

Build bundle file for deployment
```
npm run build
```

This will create a main.bundle.js file in the build/ folder

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
