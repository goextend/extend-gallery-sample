import React from 'react';
import { ResourceList, Paragraph } from '@auth0/cosmos';
import _ from 'lodash';

import { List } from './styles';
import Loader from '../loader';

class InstalledList extends React.Component {
  state = {
    loading: true,
    installedExtensions: []
  };

  componentWillMount() {
    const { profile } = this.props;

    profile.listWebtasks({ meta: { type: 'extension' } }).then(webtasks => {
      this.setState({
        loading: false,
        installedExtensions: webtasks.map(wt => ({
          name: wt.claims.jtn,
          title: _.capitalize(wt.claims.jtn),
          subtitle: `Version: ${wt.meta.version}`,
          image: wt.meta.logo
        }))
      });
    });
  }

  onRemove(name) {
    const { profile } = this.props;

    profile.removeWebtask({ name }).then(() => {
      this.setState(state => {
        state.installedExtensions = _.reject(state.installedExtensions, e => e.name === name);
        return state;
      });
    });
  }

  render() {
    return (
      <List>
        {this.state.loading ? (
          <Loader text="Loading" />
        ) : (
          <React.Fragment>
            {this.state.installedExtensions.length === 0 ? (
              <Paragraph>There are no installed extensions.</Paragraph>
            ) : (
              <React.Fragment>
                <Paragraph styled={{ marginTop: 0 }}>
                  Following, you will find the list of extensions that are currently installed.
                </Paragraph>
                <ResourceList
                  items={this.state.installedExtensions}
                  actions={[
                    {
                      icon: 'delete',
                      handler: (e, item) => {
                        this.onRemove(item.name);
                      },
                      label: 'Delete'
                    }
                  ]}
                />
              </React.Fragment>
            )}
          </React.Fragment>
        )}
      </List>
    );
  }
}

export default InstalledList;
