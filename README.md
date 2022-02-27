# Meta Tag Parser

Meta Tag Parser accepts full or partial XML/HTML in a text input field, parses all a11y meta tags, and displays their properties and content in a table. The table can be sorted alphabetically by property or content. Any errors in the supplied xml are also displayed.


## Set up

In the project directory, install dependencies by running

```
npm install
```

Start the app in development mode by running

```
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

To launch the test runner run

```
npm test
```

## Notes

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). I used [Material-UI](https://mui.com/) for styling. I parsed the metadata from the xml with the [fast-xml-parser](https://www.npmjs.com/package/fast-xml-parser) library. I started off using the browser's native DOMParser API, but found that fast-xml-parser was better able to handle partial xml and errors.
