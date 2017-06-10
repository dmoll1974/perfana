import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

// Task component - represents a single todo item
export  class Application extends Component {

  deleteThisApplication() {
    Meteor.call('applications.remove', this.props.application._id);
  }

  render() {

    return (
      <tr>
        <td>
            {this.props.application.name}
        </td>
        <td>
            {this.props.application.description}
        </td>
        <td>
           <button className="delete" onClick={this.deleteThisApplication.bind(this)}>
          &times;
        </button>
       </td>
     </tr>
    );
  }
}

Application.propTypes = {
  // This component gets the application to display through a React prop.
  // We can use propTypes to indicate it is required
  application: PropTypes.object.isRequired,
};
