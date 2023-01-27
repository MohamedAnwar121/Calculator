import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  operation! : Operation;
  constructor() {
    this.operation = {
      operand1: '',
      operator: '',
      operand2: ''
    };
  }

  ngOnInit(): void {}

  setULStrings(operation : Operation){
    this.operation = operation;
  }
}
