import React from 'react';
import { Tabs, Heading } from '@auth0/cosmos';
import Sandbox from 'sandboxjs';

import ExtensionsList from './components/extensions-list';
import InstalledList from './components/installed-list';
import { Container } from './styles';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: 0 };
  }

  handleSelected(selected) {
    this.setState({ selected });
  }

  componentWillMount() {
    const { extendHostUrl, extendContainer, extendToken } = this.props;

    this.profile = Sandbox.init({
      container: extendContainer,
      url: extendHostUrl,
      token: extendToken
    });
  }

  render() {
    return (
      <Container>
        <Heading size={2}>My extensions gallery</Heading>
        <Tabs onSelect={nextIndex => this.handleSelected(nextIndex)} selected={this.state.selected}>
          <Tabs.Tab label="All Extensions">
            <ExtensionsList {...this.props} profile={this.profile} />
          </Tabs.Tab>
          <Tabs.Tab label="Installed Extensions">
            <InstalledList {...this.props} profile={this.profile} />
          </Tabs.Tab>
        </Tabs>
      </Container>
    );
  }
}

export default App;
