const express = require('express');
const path = require('path');

require('dotenv').config({
  path: path.resolve(path.join(__dirname, '../.env'))
});

const env = {
  EXTENSIONS_SOURCE: process.env.EXTENSIONS_SOURCE,
  EXTEND_HOST_URL: process.env.EXTEND_HOST_URL,
  EXTEND_CONTAINER: process.env.EXTEND_CONTAINER,
  EXTEND_TOKEN: process.env.EXTEND_TOKEN
};
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/extensions.json', (req, res) => {
  // The source can be hosted in a S3 bucket and since the webtask
  // will be created pointing to the URL if the code is updated the
  // webtask will be updated. Also, we are using the same source for
  // all extension but in real world each extension will have
  // their own code
  const sourceUrl = 'https://gist.githubusercontent.com/jcenturion/ce82e367ab1ded2915232871f596dc20/raw/c75d588ee66a0e2d44f80123eec68f41d8fc6d51/sample.js';

  res.json([
    {
      title: 'Extension 1',
      source: sourceUrl,
      logo: 'https://cdn.auth0.com/extensions/assets/extension.svg',
      version: '1.0.0',
      author: 'extend',
      description: 'This is the really cool extension 1.',
      keywords: ['my-sass', 'extension'],
      secrets: {
        SECRETE_EXTENSION_1_1: {
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          placeholder: 'secret1',
          type: 'text'
        },
        SECRETE_EXTENSION_1_2: {
          description: 'Sed lorem tortor, ullamcorper sit amet quam nec.',
          required: true,
          type: 'password'
        }
      },
      dependencies: '{"body-parser":"1.18.2","express":"4.16.2","webtask-tools":"3.4.0"}'
    },
    {
      title: 'Extension 2',
      source: sourceUrl,
      logo: 'https://cdn.auth0.com/extensions/assets/extension.svg',
      version: '1.0.0',
      author: 'extend',
      description: 'This is the really cool extension 2.',
      keywords: ['my-sass', 'extension'],
      secrets: {
        SECRETE_EXTENSION_2_1: {
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          placeholder: 'secret1',
          type: 'text'
        },
        SECRETE_EXTENSION_2_2: {
          description: 'Sed lorem tortor, ullamcorper sit amet quam nec.',
          required: true,
          type: 'password'
        }
      },
      dependencies: '{"body-parser":"1.18.2","express":"4.16.2","webtask-tools":"3.4.0"}'
    },
    {
      title: 'Extension 3',
      source: sourceUrl,
      logo: 'https://cdn.auth0.com/extensions/assets/extension.svg',
      version: '1.0.0',
      author: 'extend',
      description: 'This is the really cool extension 3.',
      keywords: ['my-sass', 'extension'],
      secrets: {
        SECRETE_EXTENSION_3_1: {
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          placeholder: 'secret1',
          type: 'text'
        },
        SECRETE_EXTENSION_3_2: {
          description: 'Sed lorem tortor, ullamcorper sit amet quam nec.',
          required: true,
          type: 'password'
        }
      },
      dependencies: '{"body-parser":"1.18.2","express":"4.16.2","webtask-tools":"3.4.0"}'
    },
    {
      title: 'Extension 4',
      source: sourceUrl,
      logo: 'https://cdn.auth0.com/extensions/assets/extension.svg',
      version: '1.0.0',
      author: 'extend',
      description: 'This is the really cool extension 4.',
      keywords: ['my-sass', 'extension'],
      secrets: {
        SECRETE_EXTENSION_4_1: {
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          placeholder: 'secret1',
          type: 'text'
        },
        SECRETE_EXTENSION_4_2: {
          description: 'Sed lorem tortor, ullamcorper sit amet quam nec.',
          required: true,
          type: 'password'
        }
      },
      dependencies: '{"body-parser":"1.18.2","express":"4.16.2","webtask-tools":"3.4.0"}'
    }
  ]);
});

// Route for the SPA
app.get('*', (req, res) => {
  res.render('index', {
    extensionsSource: env.EXTENSIONS_SOURCE,
    extendHostUrl: env.EXTEND_HOST_URL,
    extendContainer: env.EXTEND_CONTAINER,
    extendToken: env.EXTEND_TOKEN
  });
});

module.exports = app;
