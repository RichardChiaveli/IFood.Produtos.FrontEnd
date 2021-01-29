import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { AddProductComponent } from "./product/add-product/add-product.component";
import { ListProductComponent } from "./product/list-product/list-product.component";
import { EditProductComponent } from "./product/edit-product/edit-product.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "add-product", component: AddProductComponent },
  { path: "list-product", component: ListProductComponent },
  { path: "edit-product", component: EditProductComponent },
  { path: "", component: LoginComponent },
];

export const routing = RouterModule.forRoot(routes);
