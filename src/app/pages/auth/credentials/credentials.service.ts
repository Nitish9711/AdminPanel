import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { Credentials } from "./credentials.model";

import {environment} from "../../../../environments/environment";
const BACKEND_URL = environment.apiUrl + "user/createUser/";

@Injectable({ providedIn: "root" })
export class CredentialsService {
  private credentials: Credentials[] = [];


  constructor(private http: HttpClient, private router: Router) {}

  createUser(credential) {
    

    const userData: Credentials = { email: credential.email, password: credential.password };
    console.log(credential);
    console.log(BACKEND_URL);
    
    this.http
    .post(
      BACKEND_URL,
      userData
    )
    .subscribe(temp => {

      console.log(temp);

  });


  }

}
