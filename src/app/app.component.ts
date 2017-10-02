import { Component } from "@angular/core";

/**
 * @author icampbell2
 *
 * This class is used to represent the app component.
 */
@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"]
})
export class AppComponent {

	currentYear: number;

	/**
	 * This constructor is used to inject dependencies and instantiate the instance.
	 */
	constructor() {
		this.currentYear = new Date().getFullYear();
	}
}
