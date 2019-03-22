# GtrDemoMaterialDesign

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.4.

This project is currently under construction!
Not yet Finished! You are welcome to pull down the application and examine its progress. It needs proper layout and styling applied.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Angular application using Material Design and Reactive Forms

The application contains a side-screen menu that represents `Guitar Brands` (currently five guitar brands). Selecting one of the brand names will display a list of those guitars that fall under that particular brand. Having selected a brand of guitar there is a link to view the details of a particular guitar or you may place the guitar into edit mode. When a guitar is in edit mode all of the fields have validation associated with them. This controls the enable/disable of the `Save` button. `Add Guitar` fields also have validation associated with those fields.

### Features
* Material Design style application.
* All editable forms have validation.
* Communication between components via `BehaviorSubject` multi-cast delegate.
* Guitar data `angular-in-memory-web-api` `InMemoryDbService` uses http to `put`, `post`, `get` and `delete` guitar data.
