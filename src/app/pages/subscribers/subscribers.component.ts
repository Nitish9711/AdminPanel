import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { mimeType } from "../../shared/mime-type.validator";
import { Subscription } from 'rxjs';

import { Subscriber } from "./subscriber.model";
import { Subscribe } from "./subscribe.model";
import {SubscribersService } from "./subscriber.service";


@Component({
  moduleId: module.id,
  selector: 'subscribers-cmp',
  templateUrl: 'subscribers.component.html',
  styleUrls: ['./subscribers.component.css']
})
export class SubscribersComponent implements OnInit {
  form: FormGroup;
  isLoading = false;
  imagePreview: string;
  constructor(private modalService: NgbModal, public subscribersService: SubscribersService,) {}
  private subscribersSub: Subscription;
  subscribers: Subscriber[] = [];
  subscriber: Subscriber;
  closeResult = '';


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

  ngOnInit():void{
    this.isLoading = false;
    this.form = new FormGroup(
      {
        subject: new FormControl(null, {
          validators: [Validators.required, Validators.minLength(3)]
        }),
        content: new FormControl(null, {validators: [Validators.required]}),

        image: new FormControl(null, {
          validators: [Validators.required],
          asyncValidators: [mimeType]
        })
      }
    )

    this.subscribersService.getSubscriber()
    this.subscribersSub = this.subscribersService.getSubscriberUpdateListener()
      .subscribe((subscribers: Subscriber[]) => {
        this.isLoading = false;
        this.subscribers = subscribers;
      });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSendMail(event: Event){
    // console.log(this.form.value);
    this.isLoading = true;
    let mailContent = {

      "subject": this.form.value.subject,
      "content": this.form.value.content,
      "image": this.form.value.image
    }

      this.subscribersService.sendMail(mailContent,this.form.value.image);

      this.isLoading = false;
    this.form.reset();
  }

    }

