import { Component, OnInit } from "@angular/core";

/**
 * @author icampbell2
 *
 * This class is used to represent the home component.
 *
 * @implements OnInit
 */
@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {

	/**
	 * This constructor is used to inject dependencies and instantiate the instance.
	 */
	constructor() { }

	/**
	 * This method is used as a lifecycle hook for the initialization of this component.
	 *
	 * @override OnInit
	 */
	ngOnInit(): void {
	}

}
