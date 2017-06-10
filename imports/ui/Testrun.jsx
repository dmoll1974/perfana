import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

// Task component - represents a single todo item
export default class TestRun extends Component {

  deleteThisTestRun() {
    Meteor.call('testRuns.remove', this.props.testRun._id);
  }

  render() {

    return (
      <tr>
        <td>
            {this.props.testRun.application}
        </td>
        <td>
            {this.props.testRun.testType}
        </td>
        <td>
            {this.props.testRun.testRunId}
        </td>
        <td>
            {this.props.testRun.start.toUTCString()}
        </td>
        <td>
            {this.props.testRun.end.toUTCString()}
        </td>
        <td>
           <button className="delete" onClick={this.deleteThisTestRun.bind(this)}>
          &times;
        </button>
       </td>
     </tr>
    );
  }
}

TestRun.propTypes = {
  // This component gets the testRun to display through a React prop.
  // We can use propTypes to indicate it is required
  testRun: PropTypes.object.isRequired,
};
