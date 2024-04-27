# Itemania

## Setting up and Running the Application

- Install dependencies

```bash
pnpm install
```

- Add your environment variables as can be seen in *.env.example* to *.env:*

```bash
API_HOST=http://myhost
SECRET_KEY=my-secret-key
```

- Start the development server:

```bash
pnpm run dev
```

You could also build and server the application for optimization.

## Design

The app is built using Next.js app router approach, which is the most recent and recommended one. As we can see, on the top level, we are including configuration files that handle linting, environment variables, package management and so on. Within the /src directory lies the bulk of the application. In the /app directory we have the main pages and layouts of our application. We have main components and UI components defined within the /components directory. Within /actions we have server actions that handle form submissions. Within the /utils directory we can see some utility functions that handle different tasks like validating access tokens. We also have interface/type/schema definitions within the /lib directory.
