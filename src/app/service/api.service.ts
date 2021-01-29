import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/index";
import { ApiResponse } from "../model/api.response";
import { ApiAuthenticate } from "../model/api.authenticate";
import { environment } from "./../../environments/environment";

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<ApiAuthenticate> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Basic ${window.btoa(`${username}:${password}`)}`,
    });
    let options = { headers: headers };

    return this.http.post<ApiAuthenticate>(environment.loginUrl, {}, options);
  }

  getProducts(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(environment.baseUrl);
  }

  getProductById(id: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(environment.baseUrl + id);
  }

  createProduct(product: FormData): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(environment.baseUrl, product);
  }

  updateProduct(product: FormData): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(environment.baseUrl, product);
  }

  deleteProduct(id: string): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${environment.baseUrl}?ids=${id}`);
  }
}
