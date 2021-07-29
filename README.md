## Install nodejs and npm

```
curl -sL https://deb.nodesource.com/setup_14.x -o nodesource_setup.sh
sudo bash nodesourse_setup.sh
```

## Install this package

```
$ git clone <repository-url>
$ cd lighthouse
$ npm install
```

## Run

After installation is completed, run

```
$ npm start
```

Open your browser and go to `localhost:3000/login`

## In development
You will need to configure the address for backend server in `package.json` file and in `src/assets/sailsSocket.js` file to connect to your backend server