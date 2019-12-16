# CorpusApp

## Requirement
1. Node (>=v10)
2. NPM (>=v6.0)

## Installation
1. Clone the repository
```shell script
$ git clone git@github.com:ouhkribilt/CorpusApp.git"
````
2. Copy `.env.example` to `.env`
```shell script
$ cp .env.example .env
```
3. Update `.env` as per your configuration
4. Run docker for MongoDB. You can skip this if you have separate MongoDB running in your system
```shell script
$ docker-compose up --build
```
5. Install dependencies
```shell script
$ yarn install
```
6. Start API and WEB
```shell script
$ yarn start
```
