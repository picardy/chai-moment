# chai-moment [![Build Status](https://travis-ci.org/picardy/chai-moment.svg?branch=master)](https://travis-ci.org/picardy/chai-moment)

Matchers for dates and formatted date strings powered by [moment.js](http://momentjs.com/)

## Using

Also see the [tests](https://github.com/picardy/chai-moment/tree/master/test/) and [examples](https://github.com/picardy/chai-moment/tree/master/examples/).

### browser-side

include chai moment after chai and moment:

    <script src="moment.js"></script>
    <script src="chai.js"></script>
    <script src="chai-moment.js"></script>

### server-side

have chai use chai-moment:

```javascript

var chai = require('chai');
chai.use(require('chai-moment'));

```

## Assertions

Compare any moment-parseable date/string/whatever with another, with optional granularity.  See [Moment.js docs](http://momentjs.com/docs/#/parsing/) on parsing.

When using granularity, please use one of the following: `year`, `month`, `week`, `day`, `hour`, `minute`, `second`.  When using tdd-style assertions, if you do not use one of the listed granularities, the argument will be interpreted as a custom error message.

### sameMoment

```javascript

var dateString = '2016-04-21',
    date = new Date(2016, 3, 21),
    milliseconds = 1461222000000,  // assumes system has PDT timezone
    obj = { y: 2016, M: 3, d: 21 },
    arr = [2016, 3, 21],
    momentObj = moment('2016-04-21'),
    oneDayLater = '2016-04-22';

// using should-style assertions
dateString.should.be.sameMoment(date);
dateString.should.be.sameMoment(oneDayLater, 'month');

// using expect-style assertions
expect(milliseconds).to.be.sameMoment(obj);
expect(dateString).to.be.sameMoment(oneDayLater, 'month');

// using tdd assertions
assert.sameMoment(arr, momentObj);
assert.sameMoment(arr, oneDayLater, 'month');
assert.sameMoment(arr, oneDayLater, 'month', 'custom error message');
assert.sameMoment(arr, oneDayLater, 'custom error message');  // fails

```

### beforeMoment

```javascript

var dateString = '2016-04-21',
    oneDayLater = '2016-04-22';

// using should-style assertions
dateString.should.be.beforeMoment(oneDayLater);
dateString.should.be.beforeMoment(oneDayLater, 'month');  // fails

// using expect-style assertions
expect(dateString).to.be.beforeMoment(oneDayLater);
expect(dateString).to.be.beforeMoment(oneDayLater, 'month');  // fails

// using tdd assertions
assert.beforeMoment(dateString, oneDayLater);
assert.beforeMoment(dateString, oneDayLater, 'month');  // fails
assert.beforeMoment(dateString, oneDayLater, 'month', 'custom error message');  // fails
assert.beforeMoment(dateString, oneDayLater, 'custom error message');

```

### afterMoment

```javascript

var dateString = '2016-04-21',
    oneDayLater = '2016-04-22';

// using should-style assertions
oneDayLater.should.be.afterMoment(dateString);
oneDayLater.should.be.afterMoment(dateString, 'month');  // fails

// using expect-style assertions
expect(oneDayLater).to.be.afterMoment(dateString);
expect(oneDayLater).to.be.afterMoment(dateString, 'month');  // fails

// using tdd assertions
assert.afterMoment(oneDayLater, dateString);
assert.afterMoment(oneDayLater, dateString, 'month');  // fails
assert.afterMoment(oneDayLater, dateString, 'month', 'custom error message');  // fails
assert.afterMoment(oneDayLater, dateString, 'custom error message');

```

## Configuration

### setErrorFormat(format)

Sets the [format](http://momentjs.com/docs/#/displaying/) used for reporting moments in failed assertions.

```javascript

var chaiMoment = require('chai-moment');

chaiMoment.setErrorFormat('L');

expect(moment('2016-04-21')).to.be.beforeMoment(moment('2016-04-22'));
// Error('expected 04/21/2017 to be before 04/22/2016')

```

# Thanks

Thanks to [chai-fuzzy](https://github.com/elliotf/chai-fuzzy) for the project structure.
