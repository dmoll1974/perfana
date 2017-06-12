import { Applications } from '../imports/api/applications.js';


if (Applications.find().count() === 0) {

    let now = new Date().getTime();

    // create two users
    let danielId = Meteor.users.insert({
        profile: {name: 'Daniel Moll'}
    });
    let daniel = Meteor.users.findOne(danielId);

    let ApplicationId = Applications.insert({
        name: 'TELEGRAAF',
        description: 'Fixture application',
        owner: daniel._id,
        created: now,
        dashboards: [
            {
              name: 'gatling2',
              variables: [
                  { name: "simulation", value: 'telegraaf'}
              ]
            },
            {
              name: 'gatling',
              variables: [
              ]
            },
        ]
    });
}