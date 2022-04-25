# Form Validations

Quick Test of Frontend Application

This is a reactjs Application.

# Author

Andrew Ogaga

# Description

```
This application serves to create and view captions and cards in a beautified format. It has the following pages
 - Home Page => Search for captions under a particular tag. It uses some little animations to show how the tags are added to the page.

 - Tags Page => Add Tags to the Tags database and view all the tags on the database.

 - Captions Page => Adds captions to the database and views all captions on the database.

 This makes use of Styled components for UI and Formik functions (form validations) to achieve this feat.
```

# UI View
[Caption cards](https://condescending-haibt-b707dc.netlify.com/)

# API Used

```
POST Add Caption
https://capcards-api.herokuapp.com/v1.0/api/caption/

POST Add Tags
https://capcards-api.herokuapp.com/v1.0/api/tag/

GET Get all Tags
https://capcards-api.herokuapp.com/v1.0/api/tag/

GET Get all Captions
https://capcards-api.herokuapp.com/v1.0/api/caption/

GET Get Captions under Tag
https://capcards-api.herokuapp.com/v1.0/api/caption/withTag?tagId=2

```

# Packages used
```
"axios" => HTTP Requests,
"formik" => Wonderful form handler,
"history" => History management for page routing,
"prop-types" => Prop type validations,
"react-redux" => State management (redux) connection to react,
"redux" => State management,
"redux-persist" => Persist state on device,
"redux-thunk" => Accepting asynchronous action creators,
"styled-components" => Component styling in react,
"yup" => Form validation handler,
"@testing-library" => User Interaction Testing by Kent C. Dodds,
"eslint" => Linting service,
"eslint-config-airbnb" => Linting service according to airbnb,
"moxios" => mocking axios API calls while testing,
"redux-mock-store" => mocking redux store while testing
```

# Installation Procedure

```
git clone <repo link>
npm install
npm start
```

# Tests Run

```
npm test
```
