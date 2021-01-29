import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "IFood.Produtos.FrontEnd";
  constructor(private router: Router) {}

  showLogoutButton() {
    return !JSON.parse(localStorage.getItem("authenticated"))
  }

  deslogar() {
    this.router.navigate([""]);
    localStorage.setItem("authenticated", JSON.stringify(false));
  }
}
