# Carbon Fee and Dividend Calculator

This is an application built by [Citizen's Climate Lobby](https://citizensclimatelobby.org/) that uses data from the 
[Household Impact](https://citizensclimatelobby.org/household-impact-study/) to estimate the net impact of Carbon Fee and Dividend on an individual household.

![Calculator Intro](https://citizensclimatelobby.org/wp-content/uploads/2018/03/compressed-CFD-Calculator-header.jpg)

### Prerequisites

This application uses node.js > 9, webpack, and yarn.

### Installing

Instructions for Ubuntu:
```
// install node and yarn
curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
sudo apt-get install -y nodejs
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install yarn
// install build essentials needed by node-gyp
sudo apt install build-essential

// go to project directory and install node packages
yarn install

// run the app in demo mode
yarn start
```

## Deployment

Build bundle file for deployment
```
yarn build
```

This will create a main.bundle.js file in the build/ folder

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
