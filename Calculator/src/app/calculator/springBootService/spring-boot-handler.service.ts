import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SpringBootHandlerService implements OnInit {
  url!: string
  operation: Operation;

  constructor(private http: HttpClient) {
    this.url = "http://localhost:8080/api/calculations/calculator"
    this.operation = {
      operand1: '',
      operator: '',
      operand2: ''
    };
  }

  ngOnInit() {}

  POSTRequest(operation: Operation) :Observable<Operation>{
    return this.http.post<Operation>(this.url, operation)
  }
}



