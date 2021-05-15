import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { Subscription } from 'rxjs';

import { Credentials } from "./credentials.model";
import { CredentialsService } from "./credentials.service";
import { DatePipe, getLocaleDateFormat } from '@angular/common';


@Component({
  moduleId: module.id,
  selector: 'credentials-cmp',
  templateUrl: 'credentials.component.html',
  styleUrls: ['credentials.component.css']

})

export class CredentialsComponent implements OnInit {
  closeResult = '';
  form: FormGroup;

  constructor(private modalService: NgbModal, public credentialsService: CredentialsService,) {}
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }

  }
 
  ngOnInit(): void
  {

    this.form = new FormGroup(
      {
        email: new FormControl(null, {
          validators: [Validators.required, Validators.minLength(3)]
        }),
        password: new FormControl(null, {validators: [Validators.required]}),
      }
    )

  }

  onCreateUser(event: Event){
    if (this.form.invalid) {
      return;
    }
    event.preventDefault();

    let credential = {
      "email": this.form.value.email,
      "password": this.form.value.password,
    }
    
      this.credentialsService.createUser(credential);
  
    
    this.form.reset();
  }
  

}
