import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { TestRuns } from '../api/testruns.js';
import { Applications } from '../api/applications.js';
import TestRunsList from './Testruns.jsx';
import ApplicationsList from './Application.jsx';

import AccountsUIWrapper from './AccountsUIWrapper.jsx';

// App component - represents the whole app
class App extends Component {

  render() {
    return (

            <TestRunsList
                // testRuns={this.props.testRuns}
            />

    );
  }
}


export default App
// export default createContainer(() => {
    /*Meteor.subscribe('testRuns');

    return {
        testRuns: TestRuns.find({}, { sort: { end: -1 } }).fetch(),
    };*/
// }, App);