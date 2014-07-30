'use strict';

describe('poll JS', function () {
    var Poll, polling, fs, clock,
        path = '../poll';

    before(function () {
        fs = require('fs');
    });

    beforeEach(function () {
        clock = sinon.useFakeTimers();
        Poll = require(path);
        polling = new Poll();
    });

    afterEach(function () {
        clock.restore();
        delete require.cache[require.resolve(path)];
    });

    it('should not be undefined', function () {
        expect(polling).to.be.ok;
    });

    function advanceClockBy1Sec() {
        clock.tick(1000);
    }

    function advanceClockBy10Mins() {
        clock.tick((1000 * 60) * 10);
    }

    describe('start function', function () {
        it('should start automatic polling based on supplied timer', function () {

            var minutes10 = (1000 * 60) * 10,
                mockCallback = sinon.spy();

            polling.start(mockCallback, minutes10);

            expect(mockCallback.calledOnce).to.not.be.ok;

            advanceClockBy10Mins();
            expect(mockCallback.calledOnce).to.be.ok;
        });

        it('should start automatic polling based on default timer', function () {

            var mockCallback = sinon.spy();

            polling.start(mockCallback);

            expect(mockCallback.calledOnce).to.not.be.ok;

            advanceClockBy1Sec();
            expect(mockCallback.calledOnce).to.be.ok;
        });
    });

    describe('stop function', function () {
        it('should call clearInterval', function () {
            var minutes10 = (1000 * 60) * 10,
                mockCallback = sinon.spy();


            polling.start(mockCallback, minutes10);
            advanceClockBy10Mins();
            polling.stop();

            expect(mockCallback.calledOnce).to.be.ok;

            advanceClockBy10Mins();
            expect(mockCallback.calledOnce).to.be.ok;
        });
    });
});
