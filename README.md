# Snowpack-ui
[![npm version](http://img.shields.io/npm/v/snowpack-ui.svg?style=flat)](https://npmjs.org/package/snowpack-ui "View this project on npm")


Run & Manage [Snowpack](https://snowpack.dev) projects from the browser instead of the terminal. 

Demo is available [here](https://youtu.be/PtAnQ-6zBUU)

## Installation

```
npm i -g snowpack-ui
```

```
npx snowpack-ui
```


## Usage

```
snowpack-ui
```

If you are starting from an empty directory, it will ask you to create a new snowpack project, which in turn requires [create-snowpack-app](https://github.com/snowpackjs/snowpack/tree/master/create-snowpack-app), 
otherwise you can run tasks and manage an existing Snowpack project.

## Screenshots

### New Project
![new project](screenshots/new-project.png)

### Project created
![project created](screenshots/project-created.png)

### Build Project
![build project](screenshots/build-project.png)

### Dev Server
![dev server](screenshots/dev-server.png)

### Install dependencies
![install deps](screenshots/install-deps.png)

### Project home
![project home](screenshots/project-home.png)

### Project tasks
![project tasks](screenshots/project-tasks.png)

## Things to do
- Save app templates as default
- Manage Snowpack config
- More extended dependency info ( things like outdated packages etc.,)
- Option to install project dependencies (first time)


## Inspiration
This project is greatly inspired by the [vue-cli-ui](https://cli.vuejs.org/) and most of the code is taken from [ember-cli-ui](https://github.com/rajasegar/ember-cli-ui).
