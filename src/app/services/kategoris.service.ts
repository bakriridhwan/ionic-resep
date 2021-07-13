import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Kategori } from "../kategoris/kategori.model";

@Injectable({
  providedIn : 'root'
})

export class KategorisService {
  apiUrl = 'http://localhost:8000/api';

  constructor(
    private http: HttpClient
  ){}

  getKategoris(): Observable<Kategori[]> {
    return this.http.get<Kategori[]>(`${this.apiUrl}/kategoris`);
  }


  addKategori(kategori: Kategori): Observable<Kategori>{
    return this.http.post<Kategori>(`${this.apiUrl}/kategoris`, kategori);
  }

  updateKategori(kategoriId: number, kategori: Kategori): Observable<Kategori>{
    return this.http.put<Kategori>(
      `${this.apiUrl}/kategoris/${kategoriId}`,
      kategori
    );
  }

  deleteKategori(kategoriId: number): Observable<Kategori> {
    return this.http.delete<Kategori>(`${this.apiUrl}/kategoris/${kategoriId}`);
  }


}
