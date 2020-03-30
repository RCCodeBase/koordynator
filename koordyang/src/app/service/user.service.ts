import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private _http: HttpClient) {}
  //Registering Coordinator to the Database
  registerCoordinator(coordinatorDetails) {
    return this._http.post<any>(
      "http://localhost:3000/signup/coordinator",
      coordinatorDetails
    );
  }

  //loginig in Coordinator
  loginCoordinator(userLogin): Observable<HttpResponse<any>> {
    return this._http.post<any>(
      "http://localhost:3000/signin/coordinator",
      userLogin,
      { observe: "response", withCredentials: true }
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

//Adding Participant by Coordinator
  addParticipantEvent(participantDetails){
    return this._http.post<any>(
      "http://localhost:3000/participants",
      participantDetails
    );
  }

  //Load all Participant
  loadAllParticipantEvent(Eventid){
    const params = new HttpParams().set("params", Eventid);
    return this._http.get<any>("http://localhost:3000/participants/details", { params });
  }
}
