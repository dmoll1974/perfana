import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { ReactiveVar } from 'meteor/reactive-var';

export const TestRuns = new Mongo.Collection('testRuns');

if (Meteor.isServer) {

    // This code only runs on the server
  // Only publish applications that are public or belong to the current user
  Meteor.publish('testRuns', function testRunsPublication() {
    return TestRuns.find({
      running: false
    });
  });

    var currentTime = new ReactiveVar(new Date().valueOf());

    Meteor.setInterval(function () {
        currentTime.set(new Date().valueOf());

        // console.log(currentTime.get());

    //     let testRun = TestRuns.findOne({$and: [
    //         {
    //             'end': {
    //                 $gte: new Date(currentTime.get() - (30 * 1000)) // ms
    //             }
    //         },
    //         { $where: function () { return currentTime.get() - new Date(this.end).getTime() < (30 * 1000)  }  }, //only show as running test when end timestamp is not older than 30 secs
    //         { 'running': true }
    //     ]
    // });
    //
    //     console.log(testRun.end > currentTime.get() - (30 * 1000));
    }, 15000); // ms

    Meteor.publish('runningTestRuns', function testRunsPublication() {
        this.autorun(function (computation) {
            return TestRuns.find({
                $and: [
                    {
                        end: {
                            $gte: new Date(currentTime.get() - (30 * 1000)) // ms
                        }
                    },
                    { running: true }
                ]
            });
        });
    });

}

Meteor.methods({
  'testrun-keepalive'(testRunAttributes) {
      check(testRunAttributes, {
          application: String,
          testType: String,
          duration: Number,
          rampUp: Number,
          testRunId: String,
          running: Boolean,
      });


      let testRun =  _.extend(testRunAttributes, {
          end: new Date(),
      })

      TestRuns.upsert({

          testRunId: testRun.testRunId
      },{
          $setOnInsert: { start: new Date() },
          $set:{
              application: testRun.application,
              testType: testRun.testType,
              duration: testRun.duration,
              rampUp: testRun.rampUp,
              running: testRun.running,
              end: new Date()
          }
      });

      let updatedTestRun = TestRuns.findOne({testRunId: testRun.testRunId });

      return updatedTestRun;
  },
  'testRuns.remove'(testRunId) {
    check(testRunId, String);

    const testRun = Applications.findOne(testRunId);
    // if (testRun.owner !== this.userId) {
    //   // If the task is private, make sure only the owner can delete it
    //   throw new Meteor.Error('not-authorized');
    // }

    TestRuns.remove(testRunId);
  },
  'testRuns.markAsComplete'(testRunId, setCompleted) {
    check(testRunId, String);
    check(completed, Boolean);

    const testRun = TestRuns.findOne(testRunId);
    // if (task.private && task.owner !== this.userId) {
    //   // If the task is private, make sure only the owner can check it off
    //   throw new Meteor.Error('not-authorized');
    // }

    TestRun.update(testRunId, { $set: { completed: setCompleted } });
  },
});
