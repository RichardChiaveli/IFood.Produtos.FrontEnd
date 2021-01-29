import { Component, OnInit, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { Product } from "../../model/product.model";
import { ApiService } from "../../service/api.service";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-list-product",
  templateUrl: "./list-product.component.html",
  styleUrls: ["./list-product.component.css"],
})
export class ListProductComponent implements OnInit {
  products: Product[];

  constructor(
    private router: Router,
    private apiService: ApiService,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    if (!JSON.parse(localStorage.getItem("authenticated")))
      this.router.navigate([""]);

    this.apiService.getProducts().subscribe((data) => {
      this.products = data.data.map(
        ({ idProduto, descricao, imagem, valor }) => ({
          idProduto,
          descricao,
          imagem: this.domSanitizer.bypassSecurityTrustUrl(imagem),
          valor: Number(valor).toLocaleString("pt-BR", {
            style: "decimal",
            minimumFractionDigits: 2,
            currency: "BRL",
          }),
        })
      );
    });
  }

  deleteProduct(product: Product): void {
    this.apiService.deleteProduct(product.idProduto).subscribe(() => {
      this.products = this.products.filter((u) => u !== product);
    });
  }

  editProduct(product: Product): void {
    window.localStorage.removeItem("editProductId");
    window.localStorage.setItem("editProductId", product.idProduto.toString());
    this.router.navigate(["edit-product"]);
  }

  addProduct(): void {
    this.router.navigate(["add-product"]);
  }
}
