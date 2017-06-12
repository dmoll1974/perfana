import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { TestRuns } from '../api/testruns.js';
import  TestRun from './Testrun.jsx';


export class TestRunsList extends Component {
  constructor(props) {
    super(props);

  }



    renderRunningTestRuns() {
        // let testRuns = this.props.testRuns;
        // if (this.state.hideCompleted) {
        //   filteredTasks = filteredTasks.filter(task => !task.checked);
        // }
        return this.props.runningtTestRuns.map((testRun) => {

            return (
                <TestRun
                    key={testRun._id}
                    testRun={testRun}
                />
            );
        });
    }

     renderTestRuns() {


         // if (this.state.hideCompleted) {
        //   filteredTasks = filteredTasks.filter(task => !task.checked);
        // }
        return this.props.testRuns.map((testRun) => {


            return (
                <TestRun
                    key={testRun._id}
                    testRun={testRun}
                />
            );
        });
    }

  render() {
    return (
      <div>
        <div className="tabbed-view-header">
          <h2 className="tabbed-view-title">Test runs</h2>
          <ul className="gf-tabs">
            <li className="gf-tabs-item"><a className="gf-tabs-link active">Recent test runs</a></li>
            <li className="gf-tabs-item"><a className="gf-tabs-link">Running test runs</a></li>
          </ul>
        </div>
        <div className="tabbed-view-body">
          <table className="filter-table form-inline">
              <thead>
                <tr>
                  <th>Application</th>
                  <th>Test type</th>
                  <th>Test run ID</th>
                  <th>Start</th>
                  <th>End</th>
                  <th>Dashboards</th>
                </tr>
              </thead>
              <tbody>
                {this.renderTestRuns()}
              </tbody>
            </table>
        </div>

        </div>

    );
  }
}

TestRunsList.propTypes = {
    testRuns: PropTypes.array.isRequired,
    runningtTestRuns: PropTypes.array,
};

export default createContainer(() => {
  Meteor.subscribe('testRuns');
  Meteor.subscribe('runningTestRuns');

  return {
      testRuns: TestRuns.find({}, { sort: { end: -1 } }).fetch(),
      runningtTestRuns: TestRuns.find({
          $and: [
              // { $where: function () { return Date.now() - new Date(this.end) < (30 * 1000)  }  }, //only show as running test when end timestamp is not older than 30 secs
              { running: true },
          ]
      }, { sort: { end: -1 } }).fetch(),
  };
}, TestRunsList);
