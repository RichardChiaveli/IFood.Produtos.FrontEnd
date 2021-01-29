import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ApiService } from "../../service/api.service";

@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.css"],
})
export class AddProductComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService
  ) {}

  addForm: FormGroup;

  ngOnInit() {
    if (!JSON.parse(localStorage.getItem("authenticated")))
      this.router.navigate([""]);

    this.addForm = this.formBuilder.group({
      description: ["", Validators.required],
      value: ["", Validators.required],
      image: ["", Validators.required],
    });
  }

  handleFileInput(files: FileList) {
    this.addForm.get("image").setValue(files.item(0));
  }

  back() {
    this.router.navigate(["list-product"]);
  }

  onSubmit() {
    if (this.addForm.invalid) {
      return;
    }
    let formData = new FormData();
    formData.append("Descricao", this.addForm.get("description").value);
    formData.append(
      "Valor",
      Number(this.addForm.get("value").value).toFixed(2)
    );
    formData.append("file", this.addForm.get("image").value);
    this.apiService.createProduct(formData).subscribe(() => {
      this.router.navigate(["list-product"]);
    });
  }
}
