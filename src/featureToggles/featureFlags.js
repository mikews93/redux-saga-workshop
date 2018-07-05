const featureFlags = {
  ec_credentialing: {
    enabled: process.env.REACT_APP_TF_ECCREDENTIALING && JSON.parse(process.env.REACT_APP_TF_ECCREDENTIALING),
    description: 'Evercheck Credentialing Project',
    creationDate: '11/17/2017',
    author: 'Jesus Restrepo'
  },
  ec_dev_token: {
    enabled: process.env.REACT_APP_TOKEN_DEV && JSON.parse(process.env.REACT_APP_TOKEN_DEV),
    description: 'Evercheck Credentialing Token App',
    creationDate: '02/21/2018',
    author: 'Juan Bedoya'
  },
  ec_token_blacklist: {
    enabled: process.env.REACT_APP_TOKEN_BLACKLIST,
    description: 'Send jwt to blacklist after logout',
    creationDate: '05/25/2018',
    author: 'Miguel Blanco'
  },
  ec_hr: {
    enabled: process.env.REACT_APP_HR_DESIGN && JSON.parse(process.env.REACT_APP_HR_DESIGN),
    description: 'Evercheck HR Redisign Project',
    creationDate: '05/09/2018',
    author: 'Miguel Blanco'
  },
  ecc_tv_token_fake_development: {
    enabled: process.env.REACT_APP_ECC_TV_FAKE_TOKEN && JSON.parse(process.env.REACT_APP_ECC_TV_FAKE_TOKEN),
    description: 'Evercheck Credentialing fake TrueVault token for development environment',
    creationDate: '05/29/2018',
    author: 'Moises Castellar'
  }

};

export default featureFlags;
