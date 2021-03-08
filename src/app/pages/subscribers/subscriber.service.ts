import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { Subscriber } from "./subscriber.model";

import {environment} from "../../../environments/environment";
const BACKEND_URL = environment.apiUrl + "subscriber/";
const BACKEND_URL2 = environment.apiUrl + "sendMail/";

@Injectable({ providedIn: "root" })
export class SubscribersService {
  private subscribers: Subscriber[] = [];
  private subscribersUpdated = new Subject<Subscriber[]>();


  constructor(private http: HttpClient, private router: Router) {}



  getSubscriber() {
    return this.http
    .get<{ message: string; subscribers: any }>(BACKEND_URL)
    .pipe(
      map(subscriberData => {
        return subscriberData.subscribers.map(subscriber => {
          // console.log(lecture);
          return {
            name: subscriber.name,
            phone: subscriber.phone,
            email: subscriber.email
          };
        });
      })
    )
    .subscribe(transformedPosts => {
      this.subscribers = transformedPosts;

      // console.log(this.lectures);
      this.subscribersUpdated.next([...this.subscribers]);
    });

  }

  getSubscriberUpdateListener() {
    return this.subscribersUpdated.asObservable();
  }

  addSubscriber(subscriber) {
    const subscriberData = new FormData();
    subscriberData.append("title", subscriber.name);
    subscriberData.append("description", subscriber.phone);
    subscriberData.append("status", subscriber.email);
    console.log(subscriber);
    // competitionData.append("imagePath", competition.image, competition.name);


// console.log(competition);

    this.http
      .post(
        BACKEND_URL,
        subscriber
      )
      .subscribe(temp => {


        console.log(temp["b"]);

        this.subscribers.push(temp["b"]);
        this.subscribersUpdated.next([...this.subscribers]);

    });
  }

  sendMail(mailContent, image:File) {
    const mailData = new FormData();
    mailData.append("subject", mailContent.subject);
    mailData.append("content", mailContent.content);
    mailData.append("imagePath", mailContent.image, mailContent.subject);
    console.log(mailContent);

    this.http
      .post(
        BACKEND_URL2,
        mailData
      ) .subscribe(temp => {

        // console.log(responseData)
        // // console.log("dkfsa" );
        // console.log(temp["b"]);
        console.log(temp);

        // this.subscribers.push(temp["b"]);
        // this.subscribersUpdated.next([...this.subscribers]);

    });;
  }

}
