import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { Sponsor } from "./sponsor.model";


import {environment} from "../../../environments/environment";
const BACKEND_URL = environment.apiUrl + "sponsors/";

@Injectable({ providedIn: "root" })
export class SponsorsService {
  private sponsors: Sponsor[] = [];
  private sponsorsUpdated = new Subject<Sponsor[]>();


  constructor(private http: HttpClient, private router: Router) {}

  getSponsors() {
    this.http
    .get<{ message: string; sponsors: any }>(BACKEND_URL)
    .pipe(
      map(sponsorData => {
        return sponsorData.sponsors.map(sponsor => {
          
          return {
            _id: sponsor._id,
            sponsorName: sponsor.sponsorName,
            imagePath: sponsor.imagePath,
            status: sponsor.status,
            sponsorTitle: sponsor.sponsorTitle,
            year: sponsor.year,
            link: sponsor.link
          };
        });
      })
    )
    .subscribe(transformedPosts => {
      this.sponsors = transformedPosts;
     
      this.sponsorsUpdated.next([...this.sponsors]);
    });

  }

  getSponsorUpdateListener() {
    return this.sponsorsUpdated.asObservable();
  }

  findSponsor(id: string) {
    return this.http.get<{
        _id: string,
        sponsorName: string,
        imagePath: string,
        status: boolean,
        sponsorTitle: string,
        year: string,
        link: string
    }>(
      BACKEND_URL+ id
    );
  }


  addSponsor(sponsor, image:File) {
    const sponsorData = new FormData();
    sponsorData.append("sponsorName", sponsor.sponsorName);
    sponsorData.append("imagePath", sponsor.image, sponsor.name);
    sponsorData.append("status", sponsor.status);
    sponsorData.append("sponsorTitle", sponsor.sponsorTitle);
    sponsorData.append("year", sponsor.year);
    sponsorData.append("link", sponsor.link);

     

    this.http
      .post(
        BACKEND_URL,
        sponsorData
      )
      .subscribe(temp => {
       
       

        this.sponsors.push(temp["b"]);
        this.sponsorsUpdated.next([...this.sponsors]);

    });
  }

  deleteSponsor(sponsorId: string) {
    this.http
      .delete(BACKEND_URL+ sponsorId)
      .subscribe(() => {
        const updatedLectures = this.sponsors.filter(sponsor => sponsor._id !== sponsorId);
        this.sponsors = updatedLectures;
        this.sponsorsUpdated.next([...this.sponsors]);
      });
  }


  updateSponsor(sponsor, image: File | string) {
    let SponsorData: Sponsor | FormData;
    if (typeof image === "object") {
    SponsorData = new FormData();
    SponsorData.append("sponsorName", sponsor.sponsorName);
    SponsorData.append("imagePath", sponsor.image, sponsor.name);
    SponsorData.append("status", sponsor.status);
    SponsorData.append("sponsorTitle", sponsor.sponsorTitle);
    SponsorData.append("year", sponsor.year);
    SponsorData.append("link", sponsor.link);
    }
    else {
        SponsorData = {
            _id: sponsor._id,
            sponsorName: sponsor.sponsorName,
            imagePath: sponsor.imagePath,
            status: sponsor.status,
            sponsorTitle: sponsor.sponsorTitle,
            year: sponsor.year,
            link: sponsor.link
      };
    }
    this.http
      .put(BACKEND_URL + sponsor._id, SponsorData)
      .subscribe(temp => {
        const updatedSponsor = [...this.sponsors];
        const oldPostIndex = updatedSponsor.findIndex(p => p._id === sponsor._id);
      
        updatedSponsor[oldPostIndex] = temp["b"];
        this.sponsors = updatedSponsor;
       
        this.sponsorsUpdated.next([...this.sponsors]);
        }

      );
  }

}
