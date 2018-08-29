import React from 'react';
import { Dialog, Heading, Paragraph, Code, Stack, Image, Form } from '@auth0/cosmos';
import _ from 'lodash';

import { ImageBG, ExtensionInfo } from './styles';

class InstallationDialog extends React.Component {
  state = {
    values: {},
    errors: {}
  };

  validate(cb) {
    const { extension } = this.props;

    this.setState(state => {
      const { values, errors } = state;

      _.mapKeys(extension.secrets, (secret, key) => {
        if (secret.required && _.isEmpty(values[key])) {
          errors[key] = 'This field is required';
        }
      });

      return state;
    }, cb);
  }

  onInstall() {
    this.validate(() => {
      const { values, errors } = this.state;
      const { profile, extension, onClose, didInstall } = this.props;

      if (_.keys(errors).length === 0) {
        profile
          .createWebtask({
            name: _.kebabCase(extension.title),
            secrets: values,
            meta: {
              type: 'extension',
              'wt-node-dependencies': extension.dependencies,
              logo: extension.logo,
              version: extension.version
            },
            url: extension.source
          })
          .then(wt => {
            didInstall(wt);
            onClose();
          });
      }
    });
  }

  render() {
    const { extension } = this.props;

    return (
      <Dialog
        open
        width={600}
        title="Install Extension"
        onClose={() => this.props.onClose()}
        actions={[
          new Dialog.Action(
            'Install',
            () => {
              this.onInstall();
            },
            'primary'
          )
        ]}
      >
        <Stack widths={[20, 80]}>
          <ImageBG>
            <Image width={70} source={extension.logo} />
          </ImageBG>
          <ExtensionInfo>
            <Heading size={3}>{extension.title}</Heading>
            <Paragraph>{extension.description}</Paragraph>
            Version: <Code>{extension.version}</Code>
          </ExtensionInfo>
        </Stack>

        <Form layout="label-on-top" style={{ marginTop: 34 }}>
          <Form.FieldSet label="Configuration">
            {Object.keys(extension.secrets).map(key => {
              const secret = extension.secrets[key];

              return (
                <Form.TextInput
                  helpText={secret.description}
                  required={secret.required}
                  key={key}
                  label={key}
                  type={secret.type}
                  placeholder={secret.placeholder}
                  error={this.state.errors[key]}
                  onChange={e => {
                    const value = e.target.value;

                    this.setState(state => {
                      const { values, errors } = state;

                      if (!values[key]) {
                        values[key] = {};
                      }

                      delete errors[key];

                      values[key] = value;
                      return state;
                    });
                  }}
                />
              );
            })}
          </Form.FieldSet>
        </Form>
      </Dialog>
    );
  }
}

export default InstallationDialog;
