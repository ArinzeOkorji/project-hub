# ProjectHub

![All Projects](./src/assets/screen-shots/all-projects.png)

## Live preview

Click [here](https://new-project-hub.netlify.app/projects) to visit the live preview of ProjectHub

## Overview

This project built using
- Angular v19.
- Angular Material (main UI library).
- Bootstrap (supporting UI library. Used mainly for its utility classes such as d-flex, row, margin & paddings etc).
- In-memory-web-api for mock RESTful features. Used because it is well suited for angular.

Considering this version of angular by default uses standalone components, there are no modules in this app. However, all routed components are lazy-loaded.

Angular Material's drag-drop cdk handles task status updates.

All projects/tasks you create are stored in the device's local storage. This ensures persisitence of data.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.9.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
