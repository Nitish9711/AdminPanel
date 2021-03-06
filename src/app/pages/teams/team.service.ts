import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { Team } from "./team.model";


import {environment} from "../../../environments/environment";
const BACKEND_URL = environment.apiUrl + "teams/";


@Injectable({ providedIn: "root" })
export class TeamsService {
  private teams: Team[] = [];
  private teamUpdated = new Subject<Team[]>();


  constructor(private http: HttpClient, private router: Router) {}

  getTeams() {
    this.http
    .get<{ message: string; teams: any }>(BACKEND_URL)
    .pipe(
      map(teamData => {
        return teamData.teams.map(team => {
         
          return {
            _id: team._id,
            name: team.name,
            designation: team.designation,
            imagePath: team.imagePath,
            linkedin: team.linkedin,
            mailId: team.mailId,
            contact: team.contact
          };
        });
      })
    )
    .subscribe(transformedPosts => {
      this.teams = transformedPosts;
      
      this.teamUpdated.next([...this.teams]);
    });

  }

  getTeamUpdateListener() {
    return this.teamUpdated.asObservable();
  }

  findTeam(id: string) {
    return this.http.get<{
        _id: string,
        name: string,
        designation: string
        imagePath: string,
        linkedin: string
        mailId: string,
        contact: string,
    }>(
      BACKEND_URL + id
    );
  }


  addTeam(team, image:File) {
    const teamData = new FormData();
    teamData.append("name", team.name);
    teamData.append("designation", team.designation);
    teamData.append("imagePath", team.image, team.name);
    teamData.append("linkedin", team.linkedin);
    teamData.append("mailId", team.mailId);
    teamData.append("contact", team.contact);


    this.http
      .post(
        BACKEND_URL,
        teamData
      )
      .subscribe(temp => {
       

        this.teams.push(temp["b"]);
        this.teamUpdated.next([...this.teams]);

    });
  }

  deleteTeam(teamId: string) {
    this.http
      .delete(BACKEND_URL + teamId)
      .subscribe(() => {
        const updatedTeams = this.teams.filter(lecture => lecture._id !== teamId);
        this.teams = updatedTeams;
        this.teamUpdated.next([...this.teams]);
      });
  }


  updateTeam(team, image: File | string) {
    let TeamData: Team | FormData;
    if (typeof image === "object") {
        TeamData = new FormData();
        TeamData.append("name", team.name);
        TeamData.append("designation", team.designation);
        TeamData.append("imagePath", team.image, team.name);
        TeamData.append("linkedin", team.linkedin);
        TeamData.append("mailId", team.mailId);
        TeamData.append("contact", team.contact);
    }
    else {
      TeamData = {
        _id: team._id,
        name: team.name,
        designation: team.designation,
        imagePath: team.imagePath,
        linkedin: team.linkedin,
        mailId: team.mailId,
        contact: team.contact
      };
    }
    this.http
      .put(BACKEND_URL + team._id, TeamData)
      .subscribe(temp => {
        const updatedTeams = [...this.teams];
        const oldPostIndex = updatedTeams.findIndex(p => p._id === team._id);
       
        updatedTeams[oldPostIndex] = temp["b"];
        this.teams = updatedTeams;
      
        this.teamUpdated.next([...this.teams]);
        }

      );
  }

}
