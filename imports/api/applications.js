import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Applications = new Mongo.Collection('applications');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish applications that are public or belong to the current user
  Meteor.publish('applications', function applicationsPublication() {
    return Applications.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}

Meteor.methods({
  'applications.insert'(applicationAttributes) {
      check(this.userId, String);
      check(applicationAttributes, {
          name: String,
          description: String
      });

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

      let user = Meteor.user();

      let application =  _.extend(applicationAttributes, {
          owner: user._id,
          created: new Date()
      })

      Applications.insert(application);
  },
  'applications.remove'(applicationId) {
    check(applicationId, String);

    const application = Applications.findOne(applicationId);
    if (application.owner !== this.userId) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Applications.remove(applicationId);
  },
  'applications.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);

    const task = Applications.findOne(taskId);
    if (task.private && task.owner !== this.userId) {
      // If the task is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }

    Applications.update(taskId, { $set: { checked: setChecked } });
  },
  'applications.setPrivate'(taskId, setToPrivate) {
    check(taskId, String);
    check(setToPrivate, Boolean);

    const task = Applications.findOne(taskId);

    // Make sure only the task owner can make a task private
    if (task.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Applications.update(taskId, { $set: { private: setToPrivate } });
  },
});
