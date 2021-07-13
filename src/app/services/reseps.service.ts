import { Resep } from '../reseps/reseps.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn : 'root'
})

export class ResepsService {
  apiUrl = 'http://127.0.0.1:8000/api';


  constructor(private http: HttpClient) {}

  getReseps(): Observable<Resep[]> {
    return this.http.get<Resep[]>(`${this.apiUrl}/reseps`);
  }

  addResep(resep: Resep): Observable<Resep>{
    return this.http.post<Resep>(`${this.apiUrl}/reseps`, resep);
  }

  updateResep(resepId: number, resep: Resep): Observable<Resep>{
    return this.http.put<Resep>(
      `${this.apiUrl}/reseps/${resepId}`,
      resep
    );
  }

  deleteResep(resepId: number): Observable<Resep> {
    return this.http.delete<Resep>(`${this.apiUrl}/reseps/${resepId}`);
  }


}


