import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";

// modules
import { AppRoutingModule } from "./app-routing.module";

// components
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";

// services
import { RestService } from "./services/rest.service";

/**
 * @author icampbell2
 *
 * This class is used to define a module for the application.
 */
@NgModule({
	declarations: [
		// components
		AppComponent,
		HomeComponent
	],
	imports: [
		// modules
		BrowserModule,
		AppRoutingModule,
		HttpModule
	],
	providers: [
		// services
		RestService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
