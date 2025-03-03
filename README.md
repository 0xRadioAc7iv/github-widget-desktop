# Github Widget Desktop

A Basic Github Widget for Desktop. It fetches your github account's contribution data from the last 6 months and shows it in a way similar to github

## Setup

1. Create a Github PAT if you don't already have one (with `user:read` permission)

2. Create a .dev.vars file and put your Github Personal Access Token into it like this

   ```bash
   GITHUB_PAT="YOUR GITHUB PERSONAL ACCESS TOKEN GOES HERE"
   ```

3. Install Worker Dependencies

   ```bash
   cd worker
   npm i
   ```

4. Setup Secret

   ```bash
   wrangler secret put GITHUB_PAT
   ```

5. Run Locally or Deploy Worker

   ```bash
   wrangler dev
   ```

   ```bash
   wrangler deploy
   ```

6. Setup App

   ```bash
   cd app
   npm i
   ```

7. Create .env and enter Worker URL & your Github Username

   ```bash
   WORKER_URL="YOUR WORKER URL GOES HERE"
   GITHUB_USERNAME="YOUR GITHUB USERNAME GOES HERE"
   ```

8. Build for your OS (You need MacOS to build for mac)

- Windows

```bash
npm run build:win
```

- Linux

```bash
npm run build:linux
```

- MacOS

```bash
npm run build:mac
```

9. The final executable will be created at the directory "app/dist/{your-os}-unpacked/"

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
