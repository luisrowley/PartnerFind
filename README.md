# PartnerFind

**PartnerFind** is practical application to calculate the distance between two points on a perfect spherical surface. It implements the [Haversine Formula](https://en.wikipedia.org/wiki/Haversine_formula) in order to calculate the Great-Circle distance between the two points, based on its latitude and logitude coordinates. After this, it can return an ordered JSON object containing the valid locations within a pre-defined maximum distance in kilometers.

## Getting Started

### Installing

For an easy installation, please follow the steps: 

 1. Getting a copy of this repo:

    ```
    git clone https://github.com/luisrowley/PartnerFind
    ```

 2. Changing to the project directory:

    ```
    cd PartnerFind
    ```

 3. And installing the needed dependencies by running:

    ```
    npm i
    ```

### Usage

To be used in a node environment, you can simply import it by: 

 1. Using the **require** syntax:

    ```
    var partnerFind = require("../functions/partnerFind.js")
    ```

## Running the tests

This project uses the well known javascript [Mocha Test framework](https://phpunit.de/) coupled with [Chai assertion library](https://www.chaijs.com/) which provides with descriptive **unit tests** for all possible cases. 

### Performing PHPUnit tests

To perform the unit tests on a **node** environment, simply run:

```
npm test < ./path/to/file >
```


For example, in order to test the **WPNonce** class from the project folder you would run:

```
npm test ./test/testDeepClone.js
```

## Built With

* [Javascript](https://tc39.es/ecma262/)
* [NodeJS](https://nodejs.org/en/) - JS runtime environment
* [Mocha](https://mochajs.org/) - Testing framework for Javascript
* [ChaiJS](https://www.chaijs.com/) - Assertion library

## Authors

* **Luis De Benito** 
