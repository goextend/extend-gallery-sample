import React from 'react';
import Axios from 'axios';
import { Image, Heading } from '@auth0/cosmos';
import Bluebird from 'bluebird';
import _ from 'lodash';

import Loader from '../loader';
import CardList from '../card-list';
import { Logo, Details, Container } from './styles';
import InstallationDialog from '../installation-dialog';

class ExtensionsList extends React.Component {
  state = {
    loading: true,
    installing: false,
    installationContext: null,
    extensions: []
  };

  componentWillMount() {
    const { extensionsSource, profile } = this.props;

    this.profile = profile;

    Bluebird.all([
      this.profile.listWebtasks({ meta: { type: 'extension' } }),
      Axios.get(extensionsSource)
    ]).then(result => {
      const extensions = result[1].data;
      const webtasks = result[0];

      _.forEach(extensions, extension => {
        const wt = _.find(webtasks, webtask => webtask.claims.jtn === _.kebabCase(extension.title));

        if (wt) {
          extension.installed = true;
          extension.url = wt.url;
        }
      });

      this.setState({
        loading: false,
        extensions
      });
    });
  }

  didInstall(wt) {
    this.setState(state => {
      const extension = _.find(
        state.extensions,
        extension => _.kebabCase(extension.title) === wt.claims.jtn
      );

      extension.installed = true;
      extension.url = wt.url;

      return state;
    });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.installing ? (
          <InstallationDialog
            profile={this.profile}
            extension={this.state.installationContext}
            onClose={() => {
              this.setState({ installing: false });
            }}
            didInstall={wt => {
              this.didInstall(wt);
            }}
          />
        ) : null}

        {this.state.loading ? (
          <Loader text="Loading extensions" />
        ) : (
          <CardList
            onItemClick={(evt, extension) => {
              if (!extension.installed) {
                this.setState({
                  installing: true,
                  installationContext: extension
                });
              }
            }}
            columns={3}
            items={this.state.extensions}
            renderItem={(item, idx) => (
              <CardList.Item padding="none" checked={item.installed}>
                <a href={item.url} target="_blank">
                  <Container alignVertical="center">
                    <Logo>
                      <Image height="50px" source={item.logo} />
                    </Logo>
                    <Details>
                      <Heading size={4}>{item.title}</Heading>
                    </Details>
                  </Container>
                </a>
              </CardList.Item>
            )}
          />
        )}
      </React.Fragment>
    );
  }
}

export default ExtensionsList;
