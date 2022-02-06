# testcafe-browser-provider-portable
[![Build Status](https://travis-ci.org/SkyWalker1005/testcafe-browser-provider-portable.svg)](https://travis-ci.org/SkyWalker1005/testcafe-browser-provider-portable)

This is the **portable** browser provider plugin for [TestCafe](http://devexpress.github.io/testcafe).

## Install

```
npm install testcafe-browser-provider-portable
```

## Usage


You can determine the available browser aliases by running
```
testcafe -b portable
```

When you run tests from the command line, use the alias when specifying browsers:

```
testcafe portable:browser1 'path/to/test/file.js'
```


When you use API, pass the alias to the `browsers()` method:

```js
testCafe
    .createRunner()
    .src('path/to/test/file.js')
    .browsers('portable:browser1')
    .run();
```

## Author
lalit.sharma 
