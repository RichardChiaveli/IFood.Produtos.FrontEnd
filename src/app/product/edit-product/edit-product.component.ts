import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import { Product } from "../../model/product.model";
import { ApiService } from "../../service/api.service";

@Component({
  selector: "app-edit-user",
  templateUrl: "./edit-product.component.html",
  styleUrls: ["./edit-product.component.css"],
})
export class EditProductComponent implements OnInit {
  product: Product;
  editForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    if (!JSON.parse(localStorage.getItem("authenticated")))
      this.router.navigate([""]);

    let productId = window.localStorage.getItem("editProductId");
    if (!productId) {
      alert("Ação inválida!");
      this.router.navigate(["list-product"]);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [""],
      description: ["", Validators.required],
      image: [""],
      value: ["", Validators.required],
    });
    this.apiService.getProductById(productId).subscribe((res) => {
      const product = res.data;
      this.editForm.get("id").setValue(product.idProduto);
      this.editForm.get("description").setValue(product.descricao);
      this.editForm.get("value").setValue(Number(product.valor).toFixed(2));
    });
  }

  handleFileInput(files: FileList) {
    this.editForm.get("image").setValue(files.item(0));
  }

  back() {
    this.router.navigate(["list-product"]);
  }

  onSubmit() {
    if (this.editForm.invalid) {
      return;
    }

    let formData = new FormData();
    formData.append("IdProduto", this.editForm.get("id").value);
    formData.append("Descricao", this.editForm.get("description").value);
    formData.append(
      "Valor",
      Number(this.editForm.get("value").value).toFixed(2)
    );
    formData.append("file", this.editForm.get("image").value);

    this.apiService
      .updateProduct(formData)
      .pipe(first())
      .subscribe(
        (data) => {
          if (data.success) {
            alert("Produto atualizado com sucesso.");
            this.router.navigate(["list-product"]);
          } else {
            alert(data.message);
          }
        },
        (error) => {
          alert(error);
        }
      );
  }
}
