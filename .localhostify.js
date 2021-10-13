module.exports = {
   staging: {
      port: 3001,
      target: {
         host: 'https://staging.domain.com',
         matchUrl: '^\\/api.*',
      },
      externalRedirects: [
         {
            match: '/api/auth/callback',
            replace: ['https://staging.domain.com', 'http://localhost:3001'],
         },
      ],
   },
   prod: {
      port: 3002,
      target: {
         host: 'https://prod.domain.com',
         matchUrl: '^\\/api.*',
      },
      externalRedirects: [
         {
            match: '/api/auth/callback',
            replace: ['https://prod.domain.com', 'http://localhost:3002'],
         },
      ],
   },
};
