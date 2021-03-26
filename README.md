# Angular Signup page

Complete user registration flow by setting up routing, integrating the signup form with data services and adding proper input validation.


## Introduction

This app is nearly completed, yet the user signup page and results page are missing. Follow the instructions below in order to complete the project.


## Task Description

The HTML and styling of the form are provided. Your job is to connect it to Angular and add proper validation.

Use **Template-Driven Forms** approach when implementing the requirements.


### 1. Implement service to get country and states

- Implement methods to fetch data of `country` and `state`

- Data for `countries` and `states` should be fetched from `assets/data.json` file

- The stub for `country` fetching service is already present, but its methods are not implemented yet

- Integrate this service with `SignupForm` in step 2 service configuration


### 2. Module setup

- Setup `SignupFormComponent` - add required modules, services

- Finish `SignupDetailsComponent` implementation


### 3. Setup routes

- Set the default route to render `SignupFormComponent`

- Setup signup results route so that `SignupDetailsComponent` is rendered for `/signup-details` url


### 4. Add validation to fields

- All fields should be required

- `Email` should be validated (use Angular built-in email validation)

- `Password` should match pattern - minimum 8 characters - numbers, letters, at least one upper case.

- `Password` match value should match password value

- `Phone` should allow only numbers and match pattern `(#99) 999-9999`, where `#` denotes a non-zero digit, and `9` any digit

- Use service to populate `States` and `Country` dropdown

- Values of the `State` field should be loaded based on selected `country` value

- When `country` is selected or changed, `state` should display the default value

- If a field is invalid it should be marked as such - use Angular validation


### 5. Some user feedback

- If a field is invalid, it should display error

- Use error elements that are provided

- Make sure elements include the correct class, i.e. `.form-username-error`

- Don't hide elements with CSS if there is no error. Make sure they are not present in DOM


### 6. Display Results

- Make sure when _Signup Form_ is submitted (not only with button) the component emits proper `save` event that the parent component can subscribe to

- Prevent the event from occurring if any of form fields are invalid

- Use `SignupService` to store and retrieve data submitted in the signup form. Redirect to _Signup Details_ page after successful form submission.

- _Signup Details_ should appear in the same place where _Signup Form_ currently is.

For more details please run a task on the Devskiller platform and review the tests that are failing.

## Setup

1. `npm install` to get dependencies

2. Start app with `npm run start` and point a web browser to `http://localhost:4200/`

3. Use `npm run test:watch` to see tests failing

4. Fix issues so that tests pass

5. Solve all of the issues mentioned here

6. Submit your code on the Devskiller platform to verify that the task is completed
# Angular-Login-Page
