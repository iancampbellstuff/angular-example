import { TestBed, inject } from "@angular/core/testing";
import { ErrorObservable } from "rxjs/observable/ErrorObservable";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";

import { RestService, MockRestService } from "./rest.service";

/**
 * @author icampbell2
 *
 * This unit test specification is used to test the shared ReST service in this application.
 */
describe("RestService", () => {

	const json: {} = {
			"test": "value"
		},
		error: Error = new Error("Test Error");

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: RestService,
					useClass: MockRestService
				}
			]
		});

		const prototype: any = RestService.prototype,
			methodNames: Array<string> = ["post", "get", "put", "delete"];

		spyOn(prototype, "handleData").and.callFake((): any => {
			return json;
		});
		spyOn(prototype, "handleError").and.callFake((): ErrorObservable => {
			return new ErrorObservable(error);
		});
		methodNames.forEach((methodName: string): void => {
			spyOn(prototype, methodName).and.callFake((): Observable<any> => {
				return Observable.of(json);
			});
		});
	});

	// tests
	it("should define the service", inject([RestService], (service: RestService) => {
		expect(service).toBeTruthy();
	}));
	it("should make a POST request", inject([RestService], (service: RestService) => {
		service.post("", json)
			.subscribe((data: any): void => {
				expect(data).toEqual(json);
			});
	}));
	it("should make a GET request", inject([RestService], (service: RestService) => {
		service.get("")
			.subscribe((data: any): void => {
				expect(data).toEqual(json);
			});
	}));
	it("should make a PUT request", inject([RestService], (service: RestService) => {
		service.put("", json)
			.subscribe((data: any): void => {
				expect(data).toEqual(json);
			});
	}));
	it("should make a DELETE request", inject([RestService], (service: RestService) => {
		service.delete("")
			.subscribe((data: any): void => {
				expect(data).toEqual(json);
			});
	}));
});
