![CI](https://github.com/berlin-church/church-office/workflows/CI/badge.svg?branch=master)

# Church Office

This is the frontend application used by the Berlin.Church.


# Installation

```sh
npm install
```

# Running

Before running this code locally for development, you need to configure the file next.config.js.

```javascript
module.exports = {
  env: {
    auth_domain: 'church-office.eu.auth0.com',
    auth_client_id: 'xxxxx',
    origin: 'http://localhost:3000'
  }
}
```

After installing and setting configuration, you can simply run it via:

```sh
npm run dev
```

# Development

This application uses ReactJS written in Typescript and the authentication is done via Auth0.

# Contributing

1. Fork it (https://github.com/berlin-church/church-office).
2. Create your feature branch (git checkout -b feature/fooBar).
3. Commit your changes (git commit -am 'Add some fooBar').
4. Push to the branch (git push origin feature/fooBar).
5. Create a new Pull Request.
