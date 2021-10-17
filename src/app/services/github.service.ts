import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { CLIENT_ID, CLIENT_SECRET } from '../CREDENTIALS/cred';
import { Observable, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/operator/map'

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private httpClient:HttpClient) { }
   
   //for github profile
   public getProfile(searchQuery:any):Observable<any>{
     let dataURL = 'https://api.github.com/users/${searchQuery}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}';
     return this.httpClient.get<any>(dataURL).pipe(
       //retry(count 1),
       catchError(this.handleErrors)
     )
   }
   public handleErrors(error:HttpErrorResponse){
     let errorMessage:string;
     if(error.error instanceof ErrorEvent){
       errorMessage = 'MESSAGE: ${error.error.message}';
     }
     else{
       errorMessage = 'STATUS: ${error.status} MESSAGE : ${error.message}';
     }
     return throwError(errorMessage)
   }

 //get github repos
   public getRepos(searchQuery:any):Observable<any[]>{
    let dataURL = 'https://api.github.com/users/${searchQuery}/repos?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}';
    return this.httpClient.get<any>(dataURL).pipe(
      //retry(count 1),
      catchError(this.handleErrors)
    )
  }

}
 