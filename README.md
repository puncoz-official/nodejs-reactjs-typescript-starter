# CorpusApp

## Requirement
1. Node (>=v10)
2. NPM (>=v6.0)
3. Yarn (>= 1.16)
4. Docker / Docker-compose

#### Installing Node/Npm
- Follow Guide from [https://nodejs.org/en/](https://nodejs.org/en/)

#### Installing Yarn
- To install yarn, simple run following command
```shell script
$ npm install -g yarn
```

#### Installing Docker/DockerCompose
- [Install Docker](https://docs.docker.com/install/)
- [Install Docker Compose](https://docs.docker.com/compose/install/)

## Installation/Setup Application
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
$ yarn
```
6. Start API and WEB
```shell script
$ yarn start
```
