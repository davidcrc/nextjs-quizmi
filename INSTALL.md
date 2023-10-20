# Setup

```bash
yarn create next-app
```

# ESlint

```bash
yarn add -D eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-next eslint-plugin-jsx-a11y
```

- update .eslintrc.json

```json
{
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "plugins": ["react", "react-hooks", "prettier", "@typescript-eslint"],
  "extends": ["eslint:recommended", "next", "next/core-web-vitals", "prettier"],
  "rules": {
    "indent": ["error", 2],
    // "quotes": ["error", "double"],
    "semi": ["error", "always"],
    "react/no-unescaped-entities": "off",
    "no-unused-vars": "error"
  },
  "overrides": [
    {
      "files": ["*.ts", "*.tsx"],
      "rules": {
        "no-undef": "off"
      }
    }
  ]
}
```

- create .prettierrc.js

```js
module.exports = {
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
  printWidth: 120,
  tabWidth: 2,
};
```

- also , you can add to package.json

```json
{
  "scripts": {
    // ...
    "format": "next lint  --fix"
  }
}
```

```bash
npx eslint .
```

# Husky ( use nde > 16)

```bash
yarn add -D husky lint-staged
```

```bash
npx husky install
```

```bash
npx husky add .husky/pre-commit "npx --no-install lint-staged"
```

### To options for staged

1.- add to package.json:

```json
{
  // ...
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["npm run lint"]
  }
}
```

2.- before remove "--no-install" from 'pre-commit', then create lint-staged.config.js

```js
module.exports = {
  '*.{js,ts,tsx}': ['eslint --fix'],
};
```

# Imports

```bash
yarn add -D eslint-plugin-import eslint-plugin-unused-imports
```

- update eslintrc.json

```json
{
  // ...
  "plugins": [..., "import", "unused-imports"],
  // ...
  "rules": {
    // "no-unused-vars": "error",
    // Disables the rule disallowing named exports used as a default export
    "import/no-named-as-default": 0,
    // Enables the rule detecting unused imports
    "unused-imports/no-unused-imports": 1,
    // Configures the rule detecting unused variables and imports
    "unused-imports/no-unused-vars": [
      // ... unused variables and imports configuration ...
      "error",
      {
        // Apply the rule to all variables
        "vars": "all",
        // Do not apply the rule to function arguments
        "args": "none",
        // Ignore the rest siblings of a destructured object
        "ignoreRestSiblings": true
      }
    ],
    // Configures the order and formatting of import statements
    "import/order": [
      // ... import order configuration ...
      "error",
      {
        // Configure the alphabetization settings
        "alphabetize": {
          // Enforce ascending alphabetical order
          "order": "asc",
          // Do not ignore the case while sorting
          "caseInsensitive": false
        },
        // Enforce newlines between different groups and inside groups of imports
        "newlines-between": "always-and-inside-groups",
        // Warn when there is an import statement that is not part of any group
        "warnOnUnassignedImports": true
      }
    ],
    "import/no-extraneous-dependencies": [
      // ... extraneous dependencies configuration ...
      "error",
      {
        // Specify the file patterns where devDependencies imports are allowed
        "devDependencies": [
          // Allow devDependencies imports in test and spec files
          "**/*.test.{ts,js}",
          "**/*.spec.{ts,js}",
          // Allow devDependencies imports in the "test" folder
          "./test/**.{ts,js}",
          // Allow devDependencies imports in the "scripts" folder
          "./scripts/**/*.{ts,js}"
        ]
      }
    ]
  }
}
```

<!--  -->

# Add shadcn/ui

- https://ui.shadcn.com/docs/installation/next

- In neccesary add componet by component

```bash
npx shadcn-ui@latest init
```

- Options: yes > NewYork > Slate > src/app/globals.css > yes > Intro > Intro > Intro > yes > yes

```bash
npx shadcn-ui@latest add button
```

# Add Prisma

```bash
yarn add -D prisma
```

```bash
yarn add @prisma/client
```

```bash
npx prisma init
```

- to push

```bash
npx prisma db push
```

- create connect prisma on lib/db.ts

<!--  -->

# Add NexAuth

```bash
yarn add next-auth
```

- setup config in lib/nextAuth.ts

```bash
yarn add @next-auth/prisma-adapter
```

- For typescript purposes add: environment.d.ts

```ts
namespace NodeJS {
  interface ProcessEnv {
    NEXTAUTH_SECRET: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
  }
}
```

- Create a project on google consle
  => Api
  => credentials
  => Pantalla de consentimiento (Externos)
  => fill forms (just necessary) , keep saving
  => Publish App.

- create credentiasl:
  => Create Oauth client ID
  => web application
  => create name
  => Javascript origins ( http://localhost:3000 )
  => Authorised redirect URIs (http://localhost:3000/api/auth/callback/google)
  +> create.

- then create: src/app/api/auth/[...auth]/route.ts

```ts
import NextAuth from 'next-auth/next';

import { authOptions } from '@/lib/nextAuth';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
```
