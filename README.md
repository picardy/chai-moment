# chai-moment

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

    var chai = require('chai');
    chai.use(require('chai-moment'));

## Assertions


### sameMoment(date[, granularity])

compare any moment-parseable date/string/whatever with another, with optional granularity.

```javascript

```

# Thanks

Thanks to [chai-fuzzy](https://github.com/elliotf/chai-fuzzy) for the project structure.
