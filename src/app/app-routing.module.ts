import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./components/home/home.component";

const routes: Routes = [
	{
		path: "home",
		component: HomeComponent
	},
	{
		path: "",
		pathMatch: "full",
		redirectTo: "/home"
	},
	{
		path: "**",
		component: HomeComponent
	}
];

/**
 * @author icampbell2
 *
 * This class is used to define a routing module for the application.
 */
@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
