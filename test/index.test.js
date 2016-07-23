var chai = require('chai');
var chaiMoment = require('../index.js');

chai.use(chaiMoment);

chaiMoment.setErrorFormat('LLLL');

var moment = require('moment');

chai.should();
var assert = chai.assert;
var expect = chai.expect;

var dateString = '2016-04-21',
    momentObj = moment(dateString),
    date = momentObj.toDate(),
    milliseconds = momentObj.valueOf(),
    obj = {y: 2016, M: 3, d: 21},
    arr = [2016, 3, 21],

    allInputTypes = [dateString, date, milliseconds, obj, momentObj],
    oneDayLater = moment('2016-04-22'),
    oneDayBefore = moment('2016-04-20'),
    oneYearLater = moment('2017-04-21')

describe('sameMoment', function() {

  describe('should-style tests', function() {

    allInputTypes.forEach(function(val) {
      var type = val.constructor.name;
      it('should pass for type `' + type + '`', function() {
        val.should.be.sameMoment(dateString);
      });
    });

  });

  describe('expect-style tests', function() {

    allInputTypes.forEach(function(val) {
      var type = val.constructor.name;
      it('should pass for type `' + type + '`', function() {
        expect(val).to.be.sameMoment(dateString);
      });
    });

  });

  describe('tdd-style tests', function() {

    allInputTypes.forEach(function(val) {
      var type = val.constructor.name;
      it('should pass for type `' + type + '`', function() {
        assert.sameMoment(val, dateString);
      });
    });

  });

  it('assertion should fail for non-same moment', function() {
    assert.throws(function() {
      assert.sameMoment(obj, oneDayLater);
    });
  });

  describe('with granularity', function() {

    it('should-style test should pass', function() {
      date.should.be.sameMoment(oneDayLater, 'month');
    });

    it('expect-style test should pass', function() {
      expect(date).to.be.sameMoment(oneDayLater, 'month');
    });

    it('tdd-style test should pass', function() {
      assert.sameMoment(date, oneDayLater, 'month');
    });

    it('tdd-style with error message in place of granularity should raise error', function() {
      assert.throws(function() {
        assert.sameMoment(date, oneDayLater, 'moments are not the same');
      }, 'moments are not the same');
    });

  })

});

describe('afterMoment', function() {

  it('should-style test should pass', function() {
    oneDayLater.should.be.afterMoment(obj);
  });

  it('expect-style test should pass', function() {
    expect(oneDayLater).to.be.afterMoment(obj);
  });

  it('tdd-style test should pass', function() {
    assert.afterMoment(oneDayLater, obj);
  });

  it('assertion should fail for non-after moment', function() {
    assert.throws(function() {
      assert.afterMoment(obj, oneDayLater);
    });
  });

  describe('with granularity', function() {

    it('should-style test should pass', function() {
      oneYearLater.should.be.afterMoment(date, 'month');
    });

    it('expect-style test should pass', function() {
      expect(oneYearLater).to.be.afterMoment(date, 'month');
    });

    it('tdd-style test should pass', function() {
      assert.afterMoment(oneYearLater, date, 'month');
    });

    it('tdd-style with error message in place of granularity should raise error', function() {
      assert.throws(function() {
        assert.afterMoment(date, obj, 'moment is not after expected');
      }, 'moment is not after expected');
    });

  });

});

describe('beforeMoment', function() {

  it('should-style test should pass', function() {
    oneDayBefore.should.be.beforeMoment(obj);
  });

  it('expect-style test should pass', function() {
    expect(oneDayBefore).to.be.beforeMoment(obj);
  });

  it('tdd-style test should pass', function() {
    assert.beforeMoment(oneDayBefore, obj);
  });

  it('assertion should fail for non-before moment', function() {
    assert.throws(function() {
      assert.beforeMoment(oneYearLater, oneDayLater);
    });
  });

  describe('with granularity', function() {

    it('should-style test should pass', function() {
      date.should.be.beforeMoment(oneYearLater, 'month');
    });

    it('expect-style test should pass', function() {
      expect(date).to.be.beforeMoment(oneYearLater, 'month');
    });

    it('tdd-style test should pass', function() {
      assert.beforeMoment(date, oneYearLater, 'month');
    });

    it('tdd-style with error message in place of granularity should raise error', function() {
      assert.throws(function() {
        assert.beforeMoment(date, obj, 'moment is not before expected');
      }, 'moment is not before expected');
    });

  });

});

describe('chaiMoment.setErrorFormat', function() {
  it('is a function', function() {
    expect(chaiMoment.setErrorFormat).to.be.a.function;
  });

  it('sets the moment.format() call for an error', function() {
    var testFormats = ['L', 'LLL', 'D', 'mm:ss'];

    testFormats.forEach(function(format) {
      chaiMoment.setErrorFormat(format);

      function _errorThrower() {
        assert.beforeMoment(oneYearLater, oneDayLater);
      }

      expect(_errorThrower).to.throw(oneYearLater.format(format));
      expect(_errorThrower).to.throw(oneDayLater.format(format));
    });
  });
});
