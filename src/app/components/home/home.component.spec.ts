import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HomeComponent } from "./home.component";

/**
 * @author icampbell2
 *
 * This unit test specification is used to test the home component.
 */
describe("HomeComponent", () => {

	let component: HomeComponent,
		fixture: ComponentFixture<HomeComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [HomeComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(HomeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	// tests
	it("should create the component", async(() => {
		expect(component).toBeTruthy();
	}));
});
