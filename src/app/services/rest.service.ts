import { Injectable, ReflectiveInjector } from "@angular/core";
import { Http, RequestOptionsArgs, Headers, Response, BaseRequestOptions } from "@angular/http";
import { MockBackend } from "@angular/http/testing";
import { Observable } from "rxjs/Observable";
import { ErrorObservable } from "rxjs/observable/ErrorObservable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/first";
import "rxjs/add/observable/throw";
import "rxjs/add/observable/of";

/**
 * @author icampbell2
 *
 * This class is used to reuse HTTP ReST calls across the application.
 */
@Injectable()
export class RestService {

	private baseURL: string;
	private requestOptionsArgs: RequestOptionsArgs;

	/**
	 * This constructor is used to instantiate the instance, and inject dependencies as instance members.
	 *
	 * @param http an Angular service used to make ReST calls
	 * @todo set base URL
	 */
	constructor(private http: Http) {
		this.baseURL = "";

		const headers: Headers = new Headers();
		headers.set("Content-Type", "application/json");
		headers.set("Accept", "*/*");

		this.requestOptionsArgs = {
			headers,
			withCredentials: true
		};
	}

	/**
	 * This private method is used internally to join the passed path to the base URL.
	 *
	 * @param path a string path to be joined with the base URL
	 * @return a string URL to be used in a ReST call
	 */
	private join(path: string): string {
		return path.startsWith("/")
			? `${this.baseURL}${path}`
			: `${this.baseURL}/${path}`;
	}

	/**
	 * This private method is used internally to handle Response data.
	 *
	 * @param data response data of type any to be handled
	 * @return the handled data
	 */
	private handleData(data: any): any {
		if (data instanceof Response) {
			const response: Response = data as Response;

			try {
				const json: JSON = response.json();
				return json;

			} catch (e) {
				return response.text();
			}
		}

		return data;
	}

	/**
	 * This method is used to handle Response errors.
	 *
	 * @param error a response error to throw
	 * @return an error observable to be handled
	 */
	private handleError(error: Error): ErrorObservable {
		return Observable.throw(error);
	}

	/**
	 * This method is used to make an HTTP POST request, for create operations.
	 *
	 * @param path a string path to be requested
	 * @param json an optional JSON object to be passed
	 * @return an observable to be handled
	 */
	post(path: string, json?: {}): Observable<any> {
		return this.http
			.post(this.join(path), JSON.stringify(json), this.requestOptionsArgs)
			.map(this.handleData)
			.catch(this.handleError);
	}

	/**
	 * This method is used to make an HTTP GET request, for read operations.
	 *
	 * @param path a string path to be requested, including path params
	 * @return an observable to be handled
	 */
	get(path: string): Observable<any> {
		return this.http
			.get(this.join(path), this.requestOptionsArgs)
			.map(this.handleData)
			.catch(this.handleError);
	}

	/**
	 * This method is used to make an HTTP PUT request, for update operations.
	 *
	 * @param path a string path to be requested
	 * @param json a JSON object to be passed
	 * @return an observable to be handled
	 */
	put(path: string, json: {}): Observable<any> {
		return this.http
			.put(this.join(path), JSON.stringify(json), this.requestOptionsArgs)
			.map(this.handleData)
			.catch(this.handleError);
	}

	/**
	 * This method is used to make an HTTP DELETE request, for delete operations.
	 *
	 * @param path a string path to be requested, including path params
	 * @return an observable to be handled
	 */
	delete(path: string): Observable<any> {
		return this.http
			.delete(this.join(path), this.requestOptionsArgs)
			.map(this.handleData)
			.catch(this.handleError);
	}
}

/**
 * @author icampbell2
 *
 * This class is used to mock HTTP ReST calls across the application.
 *
 * *Usage:*
 *
 * `{ provide: RestService, useClass: MockRestService }`
 *
 * @extends RestService a shared service in this application
 */
export class MockRestService extends RestService {

	private static injector: ReflectiveInjector = ReflectiveInjector.resolveAndCreate([
		MockBackend, BaseRequestOptions,
		{
			provide: Http,
			deps: [MockBackend, BaseRequestOptions],
			useFactory: (mockBackend: MockBackend, baseRequestOptions: BaseRequestOptions): Http => new Http(mockBackend, baseRequestOptions)
		}
	]);

	/**
	 * This constructor is used to instantiate the instance.
	 */
	constructor() {
		super(MockRestService.injector.get(Http));
	}
}
