import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import classnames from 'classnames';
import { Applications } from '../api/applications.js';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import _ from 'underscore';



// Task component - represents a single todo item
export  class TestRun extends Component {

  deleteThisTestRun() {
    Meteor.call('testRuns.remove', this.props.testRun._id);
  }

  renderGrafanaUrl (dashboard){

      let grafanaHost = 'http://localhost:3333/dashboard/db';
      let start = new Date(this.props.testRun.start).getTime();
      let end = new Date(this.props.testRun.end).getTime();
      let variables = '';

      _.each(dashboard.variables,function(variable){

          variables += '&var-' + variable.name + '=' + variable.value;
      })

      let variableQueryParam = dashboard.variables.length > 0 ? variables : '';

      let url = `${grafanaHost}/${dashboard.name}?orgId=1&from=${start}&to=${end}${variableQueryParam}`;

      return url;
  }

  renderDashboards(){

     return this.props.applications.map((application) =>{

       return application.dashboards.map((dashboard) =>{

              let url = this.renderGrafanaUrl(dashboard);

              return(
                  <li>
                      <a href={url}
                         target="_blank">
                          {dashboard.name}
                      </a>
                  </li>
              )
          })
      })

  }

  renderApplication(){

      return (
          <Dropdown>
              <DropdownTrigger>Dashboards</DropdownTrigger>
              <DropdownContent>
                  {/*<img src="avatar.jpg" /> Username*/}
                  <ul>
                      {this.renderDashboards()}
                  </ul>
              </DropdownContent>
          </Dropdown>
      )

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
            {this.renderApplication()}
        </td>
        {/*<td>*/}
           {/*<button className="delete" onClick={this.deleteThisTestRun.bind(this)}>*/}
          {/*&times;*/}
        {/*</button>*/}
       {/*</td>*/}
     </tr>
    );
  }
}

TestRun.propTypes = {
  // This component gets the testRun to display through a React prop.
  // We can use propTypes to indicate it is required
  testRun: PropTypes.object.isRequired,
  application: PropTypes.object,
};

export default createContainer((props) => {

    Meteor.subscribe('testRunApplication', props.testRun.application );

    return {
        applications: Applications.find({name: props.testRun.application}).fetch(),

    };
}, TestRun);
