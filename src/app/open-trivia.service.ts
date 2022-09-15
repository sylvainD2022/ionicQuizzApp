import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpenTriviaService {

  str: string = '';
  baseUrl: string = 'https://opentdb.com/api.php';
  constructor(private http: HttpClient) {

   }

  async getQuestions(difficulty: string): Promise<any> {
    return new Promise<string>((resolve,reject)=>{
      this.http.get(this.baseUrl + "?amount=10&difficulty=" + difficulty).toPromise().then((result: any)=>{
       if(result.response_code == 0){

         resolve(result.results) ;
       }else{
         reject("Impossible de chagrer les questions : Vérifiez votre connexion internet.");
       }
      });
    });
  }
}
