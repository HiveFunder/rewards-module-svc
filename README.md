# Project Name

> Rewards/reward-tier module for a crowd-funding campaign/project page

## Related Projects

  - https://github.com/FEC-Kickstand/comments-module
  - https://github.com/FEC-Kickstand/funding-widget-svc
  - https://github.com/FEC-Kickstand/updates-service
  - https://github.com/FEC-Kickstand/rewards-module-proxy

## Table of Contents

1. [Usage](#Usage)
2. [Requirements](#requirements)
3. [Development](#development)
4. [CRUD](#crud)

## Usage

> From within the root directory:
```sh
npm run build
npm start
```

> To seed the database:

Enter appropriate user & password information into database/index.js file
```sh
npm run schema
npm run seed
```

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```
## CRUD

| Request Type   | Route                          |
|----------------|--------------------------------|
| GET            | `api/:projectId/rewards`       |
| POST           | `api/:projectId/pledge`        |
| POST           | `api/:projectId/reward`        |
| PUT            | `api/:projectId/:name/rewards` |
| DELETE         | `api/:projectId/:name/rewards` | 
