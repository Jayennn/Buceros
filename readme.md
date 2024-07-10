# Buceros Discord Bot

Buceros is a Discord bot designed to welcome new members to your Discord server with a personalized banner. This README
provides instructions for setting up and running the bot, including how to use Prettier, ESLint, and TypeScript with
pnpm.

## Prerequisites

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/)
- A Discord bot token (You can get one from the [Discord Developer Portal](https://discord.com/developers/applications))

## Installation

1. **Clone the repository**:

    ```bash
    git clone <repository-url>
    cd buceros-discord-bot
    ```

2. **Install dependencies**:

   Use pnpm to install the project dependencies:

    ```bash
    pnpm install
    ```

3. **Set up environment variables**:

   Create a `.env` file in the root of the project and add your Discord bot token and other necessary IDs:

    ```env
    DISCORD_TOKEN=your_discord_token
    WELCOME_CHANNEL_ID=your_welcome_channel_id
    ```

## Configuration

### Prettier

Prettier is used for code formatting. Ensure Prettier is installed and configured:

1. **Install Prettier**:

    ```bash
    pnpm add prettier --save-dev
    ```

2. **Create a Prettier configuration file**:

   Create a `.prettierrc` file in the root of the project:

    ```json
    {
      "semi": true,
      "singleQuote": true,
      "trailingComma": "es5"
    }
    ```

3. **Add Prettier script**:

   Add the following script to your `package.json`:

    ```json
    "scripts": {
      "format": "prettier --write ."
    }
    ```

### ESLint

ESLint is used for linting the code. Ensure ESLint is installed and configured:

1. **Install ESLint**:

    ```bash
    pnpm add eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-prettier eslint-plugin-prettier --save-dev
    ```

2. **Create an ESLint configuration file**:

   Create an `eslint.config.js` file in the root of the project:

    ```javascript
    import { ESLint } from "eslint";

    export default [
      {
        files: ["**/*.ts", "**/*.tsx"],
        parser: "@typescript-eslint/parser",
        plugins: ["@typescript-eslint", "prettier"],
        extends: [
          "eslint:recommended",
          "plugin:@typescript-eslint/recommended",
          "plugin:prettier/recommended"
        ],
        rules: {
          semi: ["error", "always"],
          "prettier/prettier": ["error", { semi: true }]
        },
        env: {
          browser: true,
          es2021: true,
          node: true
        }
      }
    ];
    ```

3. **Add ESLint scripts**:

   Add the following scripts to your `package.json`:

    ```json
    "scripts": {
      "lint": "eslint .",
      "lint:fix": "eslint . --fix"
    }
    ```

### TypeScript

Ensure TypeScript is installed and configured:

1. **Install TypeScript**:

    ```bash
    pnpm add typescript --save-dev
    ```

2. **Create a TypeScript configuration file**:

   Create a `tsconfig.json` file in the root of the project:

    ```json
    {
      "compilerOptions": {
        "target": "ES2020",
        "module": "commonjs",
        "strict": true,
        "esModuleInterop": true,
        "skipLibCheck": true,
        "forceConsistentCasingInFileNames": true
      },
      "include": ["src/**/*"],
      "exclude": ["node_modules"]
    }
    ```

## Running the Bot

1. **Build the project**:

    ```bash
    pnpm run build
    ```

2. **Run the bot**:

    ```bash
    pnpm start
    ```

The bot should now be running and will welcome new members to your Discord server with a personalized banner.

## Usage

- Ensure your bot is invited to your Discord server and has the necessary permissions to send messages in the welcome
  channel.
- Customize the welcome message and banner by modifying the code in `src/index.ts` and `src/helper/createBanner.ts`.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
