import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { AppComponent } from "./app.component";

/**
 * @author icampbell2
 *
 * This unit test specification is used to test the app component.
 */
describe("AppComponent", () => {

	let fixture: ComponentFixture<AppComponent>,
		app: AppComponent;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule
			],
			declarations: [
				AppComponent
			],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AppComponent);
		app = fixture.componentInstance;
		fixture.detectChanges();
	});

	// tests
	it("should create the app", async(() => {
		expect(app).toBeTruthy();
	}));
	it("should get the current year", async(() => {
		expect(app.currentYear).toEqual(new Date().getFullYear());
	}));
});
