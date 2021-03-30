# Valhalla UI

UI for PhonePe's Valhalla

It has three type of users:

- DataEntry
- Manager
- Admin

All fields are required while creating records

All the list views have a show link
and all the list views have actions for:

- approve
- activate
- de-activate

All the show pages have the same actions as it's list page
The show page can contain extra actions as well

It allows its users to:

- create merchant
- list merchant
  - has pagination, with a page size of 30
  - has filters for
    - All
    - Active
    - In-Active
    - Approved
    - Not-Approved
    - Address Verified
    - Verification Pending
- show merchant
  - has an extra action for Verify Address
- create ruleset
  - a ruleset contains three parts
    - the ruleset itself
    - multiple filters
    - multiple rules
- list ruleset
  - has pagination, with a page size of 30
  - has filters for
    - All
    - Active
    - In-Active
    - Approved
    - Not-Approved
- show ruleset
- masters
  - Account
  - Interchange

## How to start development

```sh
$ npm install
$ npm test
$ npm start
# webpack-dev-server with HMR (Hot Module Reload)
$ open http://0.0.0.0:8080/
```

## How to deploy

```sh
$ npm install
$ npm test
$ npm run production:build
$ cp -r build <your-public-folder>
```

## Code reading

The app itself is under the `app` folder.  
The starting point is `app/index.js`

## Javascript features used

- generators. using `babel-polyfill`
- promises. supported by chrome
- fetch. supported by chrome but using `isomorphic-fetch
- btoa. supported by chrome

Using HTML5 validations as well, for things like `required` and `setCustomValidity`
But that works only on Google chrome :-(

Might help in future for supporting old broswers and/or adding polyfills.
Note to future self, not an exhaustive list, might have missed stuff. Please check.
