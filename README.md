# YesWeCanDrivingSchoolAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## To deploy to Github page

Please check [Angular - Deploy to GitHub Pages](https://angular.io/guide/deployment#deploy-to-github-pages)

1. Run this command to build the application

    `ng build --output-path docs --base-href https://yeswecandrivingschool.ca/`

2. If `index.html` is not directly under docs folder, move all the contents with `index.html` right under the docs folder.

    For example, `docs > browser > index.html (w other files)`, then `docs > index.html (w other files)`

3. make a copy of `docs/index.html` and name it `docs/404.html`.