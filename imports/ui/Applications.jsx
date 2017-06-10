import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Applications } from '../api/applications.js';

import Application from './Application.jsx';

import AccountsUIWrapper from './AccountsUIWrapper.jsx';

// Applications component - lists all applications
export class ApplicationsList extends Component {
  constructor(props) {
    super(props);

  }

    renderApplications() {
        let applications = this.props.applications;
        // if (this.state.hideCompleted) {
        //   filteredTasks = filteredTasks.filter(task => !task.checked);
        // }
        return applications.map((application) => {
            // const currentUserId = this.props.currentUser && this.props.currentUser._id;
            // const showPrivateButton = task.owner === currentUserId;

            return (
                <Application
                    key={application._id}
                    application={application}
                />
            );
        });
    }


    render() {
    return (
      <div>
          <h1>Applications</h1>

          <table className="filter-table form-inline">
              <thead>
              <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th></th>
              </tr>
              </thead>
              <tbody>
              {this.renderApplications()}
              </tbody>
          </table>
      </div>

    );
  }
}



ApplicationsList.propTypes = {
    applications: PropTypes.array.isRequired,
    currentUser: PropTypes.object,
};

export default createContainer(() => {
    Meteor.subscribe('applications');

    return {
        applications: Applications.find({}, { sort: { createdAt: -1 } }).fetch(),
        currentUser: Meteor.user(),
    };
}, ApplicationsList);
