# Magic: The Gathering Comprehensive Rules


This application is a simple navigation tool for Magic The Gathering Rules. It displays a list of chapters which contains the rules. One can also search the rules from the bottom search bar.

Next.js was used in this project because of the efficient way it can execute commands from server-side in built time. That property is used to download the rules (text file).

These rules are effective as of April 22, 2021.

**Demo**: http://www.magicthegatheringrules.art


## Setting the app up


### Run with NPM:

#### Requirements

* Node.js (developed with v10.16.3)
* Npm (developed with 7.20.3)

Run in developer mode

```cmd
cd Magic-The-Gathering-Rules-App
npm install
npm run dev

```

Run build

```cmd
cd Magic-The-Gathering-Rules-App
npm install
npm run build
npm run start

```

### Run with Docker Compose:

#### Requirements

* docker
* Npm (developed with 7.20.3)

```cmd
cd Magic-The-Gathering-Rules-App
docker-compose up
```

You can update the image by running updateImage.sh (in linux).


## Data and file overview

.
 * [pages/](./pages)
   * [index.js](./pages/index.js)
   * [status.js](./pages/status.js)
 * [public/](./public)
   * [assets/](./public/assets)
 * [src/](./file_in_root.ext)
   * [ruleHandler.js](./src/ruleHandler.js)
 * [README.md](./README.md)
 * [env](./.env)
 * [Dockerfile](./Dockerfile)
 * [docker-compose.yml](./docker-compose.yml)
 * [package-lock.json](./package-lock.json)
 * [package.json](./package.json)
 * [updateImages.sh](./updateImages.sh)


This application is a one pager app so everything is displayed from index.js which is located in the pages folder. Application downloads The Magic (text file) rules in build time from a given environment path (.env file). After that the rules are converted to JS objects by ruleHandler from src and used for showing the content in a more human friendly way. 

The assets folder contains self made gif and background image and they are free for use in any way one likes.

updateImage.sh is shell script for updating the image and running it (used in my server).
