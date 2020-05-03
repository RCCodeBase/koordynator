import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private _http: HttpClient) {}

  //Cheking in Coordinator Details
  async loginCoordinator() {
    return await this._http.get<any>(
      "http://localhost:3000/signin/coordinator"
    );
  }

  AddEvent(event) {
    return this._http.post<any>(
      "http://localhost:3000/coordinator/event",
      event
    );
  }

  loadEvent() {
    return this._http.get<any>("http://localhost:3000/coordinator/event");
  }

  //load one specific event to event page
  loadOneEvent(Eventid) {
    const params = new HttpParams().set("params", Eventid);
    return this._http.get<any>("http://localhost:3000/events", { params });
  }

  //load one specific event for participant Registeration
  loadOneEventDetailsAnonymous(Eventid) {
    const params = new HttpParams().set("params", Eventid);
    return this._http.get<any>("http://localhost:3000/events/anonymous", {
      params,
    });
  }

  //Adding Participant by Coordinator
  addParticipantEvent(participantDetails) {
    return this._http.post<any>(
      "http://localhost:3000/participants",
      participantDetails
    );
  }

  //Load all Participant
  loadAllParticipantEvent(Eventid) {
    const params = new HttpParams().set("params", Eventid);
    return this._http.get<any>("http://localhost:3000/participants/details", {
      params,
    });
  }

  addParticipanttoSetiings(Settings) {
    return this._http.post<any>(
      "http://localhost:3000/events/settings",
      Settings
    );
  }
  saveParticipant(ParticipantDetails) {
    return this._http.post<any>(
      "http://localhost:3000/participants/saveParticipant",
      ParticipantDetails
    );
  }
  //saving Participant Anonymously
  saveParticipantAnonymous(ParticipantDetails) {
    return this._http.post<any>(
      "http://localhost:3000/participants/saveParticipantbyOthers",
      ParticipantDetails
    );
  }

    //sending Mail for invitation
    sendingMail(SendData) {
      return this._http.post<any>(
        "http://localhost:3000/events/inviteOthers",
        SendData
      );
    }
}
