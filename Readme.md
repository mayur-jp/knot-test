# Data Extraction Script

Script that applies techniques to retrieve transaction data from an account using your own cookies. The focus of this script is to scrape the data to understand how transaction data can be accessed and retrieved using cookies taken from a website in a simulated and controlled environment.

**Merchant:** [Grammarly](https://www.grammarly.com)

## Requirement

[Chrome](https://www.google.com/chrome)

[StorageAce Extension](https://chromewebstore.google.com/detail/storageace/cpbgcbmddckpmhfbdckeolkkhkjjmplo)

[Node](https://nodejs.org/en/download) >= 18

## Installation

Clone the project

```bash
  git clone https://github.com/mayur-jp/knot-test.git
```

Go to the project directory

```bash
  cd knot-test
```

Install dependencies

```bash
  yarn install
```

or

```bash
  npm install
```

## Run Script

Steps to run the script

1. Login into [Grammarly](https://www.grammarly.com/signin) with any sigin-option

2. You will be redirected to https://app.grammarly.com/, and you must copy all cookies using [StorageAce](https://chromewebstore.google.com/detail/storageace/cpbgcbmddckpmhfbdckeolkkhkjjmplo) Chrome Extension.
   ![storageace](public/storageace.png?raw=true "StorageAce")

3. Create a file named `cookies.json` inside the `src` folder and paste the copied cookies from StorageAce into it.

4. Now run the script,

```bash
  yarn start
```

or

```bash
  npm start
```

## Screenshots

![successOutput](public/successOutput.png?raw=true "Success Output")

## 🛠 Skills/Tech Stack

Node, Typescript, OOPs, Rest API

## Features

- Fetch and Store User Details from the Merchant
- Fetch and Store Subscription Details from the Merchant
- Fetch and Store Transaction Details from the Merchant

## Authors

- [@mayur-jp](https://github.com/mayur-jp)

## File Structure

```
|-- .eslintignore
|-- .eslintrc.json
|-- .gitignore
|-- Readme.md
|-- package.json
|-- dist                  // contains build of typescript
|   |-- index.js          // main js file correspond to index.ts in src
|   |-- ...
|-- public                // contains files which can be shown to public
|-- src                   // contains main logical code
|   |-- class             // contains classes
|   |   |-- api.ts
|   |   |-- merchant.ts
|   |-- common            // contains common variable, interface, functions
|   |   |-- constant.ts   // all constant variable
|   |   |-- interface.ts  // all common interface
|   |-- cookies.json      // insert your cookies in this file
|   |-- index.ts          // main function is excecuted from here
|-- tsconfig.json
|-- yarn.lock
```

## Errors

**MISSING_NECESSARY_COOKIES_ERROR:** If necessary cookies are missing at that time, this error will be thrown

**MERCHANT_CONFIG_ERROR:** If there is an error while Configuring the merchant at that time, this error will be thrown.

**UNAUTHORIZED_ERROR:** When Verifying the User, if 401: UNAUTHORIZED ERROR comes from the merchant at that time, this error will be thrown.

**VERIFY_USER_ERROR:** When Verifying the User, if any other error comes other than UNAUTHORIZED ERROR from the merchant at that time, this error will be thrown.

**SUBSCRIPTION_ERROR:** If there is an error while fetching a Subscription from the merchant at that time, this error will be thrown.

**TRANSACTION_ERROR:** If there is an error while fetching a Transactions from the merchant at that time, this error will be thrown.

## Aproach

This script, designed to extract data about user information, subscriptions, and transactions from Grammarly, is built using node typescript technology. You can see the installed packages inside package.json; this script will only run on node version 18 and above.

You can run the script by yarn start. It builds typescript code, which is a dist folder to convert it into javascript, and then it will run the index.js file inside it, which is the main file of this script. 

Now, let's talk about the primary approach. The async main function will be executed when the project is run. Let's break down the main function.

1. **(merchant constructor)** Merchant Class Instance is created at the beginning of the main function. It will import cookies from cookies.json, verify necessary cookies for user authentication, and set default headers for future api calls.

2. **(verifyUser)** Now that all default configurations are set, the verify user method is called in the main function; it will call merchant api to fetch user details using cookies and update cookies, which were imported at first. After that, it will extract the necessary information from the response and store it in the merchant class instance.

3. **(getSubscription)** Now that all prerequisites are done, it will fetch subscription details API, extract the necessary information, and store subscription details in the merchant class instance.

4. **(getTransaction)** Similar to (getSubscription), it will fetch transactions api and store necessary information in the merchant class instance

All the above 4 points describe each method in the Merchant Class.
