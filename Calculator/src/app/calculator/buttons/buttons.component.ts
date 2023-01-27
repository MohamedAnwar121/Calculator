import {Component, Output, OnInit, EventEmitter} from '@angular/core';
import {SpringBootHandlerService} from "../springBootService/spring-boot-handler.service";

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})

export class ButtonsComponent implements OnInit {
  @Output() operationEmitter = new EventEmitter<Operation>();
  operation!: Operation;
  gotResult: boolean;
  gotUnaryOperand : boolean;
  gotDotO1: boolean;
  gotDotO2: boolean;

  constructor(private service: SpringBootHandlerService) {
    this.operation = {
      operand1: '0',
      operator: '',
      operand2: ''
    };
    this.gotResult = false;
    this.gotDotO1 = false;
    this.gotDotO2 = false;
    this.gotUnaryOperand = false;
  }

  ngOnInit(): void {}

  onNumberClick(number: string) {
    if (this.operation.operand1 === '0' && number == '0' ||
      this.operation.operator != '' && number == '0' && this.operation.operand2 == '0') return;


    if(this.gotUnaryOperand){
      this.operation.operand2 = '0';
      this.gotUnaryOperand = false;
    }

    if (this.gotResult) {
      this.operation = {operand1: '0', operator: '', operand2: ''};
      this.gotResult = false;
    }


    if (this.operation.operator === '') {

      if (number == '.' && !this.gotDotO1) {
        this.operation.operand1 = this.operation.operand1.concat(number);
        this.gotDotO1 = true;
      } else if (number != '.') {
        this.operation.operand1 = (this.operation.operand1 == '0')
          ? number : this.operation.operand1.concat(number);
      }

    } else {

      if (number == '.' && !this.gotDotO2) {
        this.operation.operand2 = (this.operation.operand2 == '') ? '0.' : this.operation.operand2.concat(number);
        this.gotDotO2 = true;
      } else if (number != '.') {
        this.operation.operand2 = (this.operation.operand2 == '0') ? number : this.operation.operand2.concat(number);
      }
    }

    this.sendOperationToScreen();
  }

  onOperatorClick(operator: string) {

    if (operator == 'C' || operator == 'CE') {
      this.service.POSTRequest(
        {operand1: this.operation.operand1, operator: operator, operand2: this.operation.operand2})
        .subscribe(responseData => {
          this.operation = responseData;
          this.gotResult = true;
          this.gotDotO1 = false;
          this.gotDotO2 = false;
          this.sendOperationToScreen();
          return;
        });
    }


    if (operator == 'delete') {
      this.service.POSTRequest(
        (this.operation.operator == '') ?
          {operand1: this.operation.operand1, operator: operator, operand2: ''} :
          {operand1: '', operator: operator, operand2: this.operation.operand2}
      ).subscribe(responseData => {
        this.gotUnaryOperand = false;
        this.operation = (responseData.operand1 != '') ? responseData :
          {operand1 : this.operation.operand1 ,operator :this.operation.operator , operand2 : responseData.operand2};
        this.modifyGotDot(this.operation.operand1,this.operation.operand2);
        this.sendOperationToScreen();
        return;
      });
    }


    if (this.operation.operator === '') {

      this.operation.operator = operator;

      if (this.operation.operator == 'x^2' ||
        this.operation.operator == '1/x' ||
        this.operation.operator == 'sqrt x' ||
        this.operation.operator == '+/-' ||
        this.operation.operator == '%' ||
        this.operation.operator == '=') {

        this.service.POSTRequest(this.operation).subscribe(responseData => {
          this.operation = responseData;
          this.gotResult = true;
          this.gotDotO1 = false;
          this.gotDotO2 = false;
          this.sendOperationToScreen();
        });
      } else {
        this.gotResult = false;
        this.sendOperationToScreen();
      }
    } else {

      if (operator == '=') {
        this.service.POSTRequest(this.operation).subscribe(responseData => {
          this.operation = responseData;
          this.gotResult = true;
          this.gotDotO1 = false;
          this.gotDotO2 = false;
          this.sendOperationToScreen();
        });
      }

      if (operator == 'x^2' || operator == '1/x' || operator == 'sqrt x' || operator == '+/-' || operator == '%') {
        this.service.POSTRequest(
          {
            operand1:
              (this.operation.operand2 == '') ? this.operation.operand1 : this.operation.operand2,
            operator: operator, operand2: ''
          }
        ).subscribe(responseData => {
          /*if (this.operation.operand2 == '') this.gotResult = true;*/
          this.operation = /*(this.operation.operand2 == '') ? responseData :*/
            {operand1 : this.operation.operand1 , operator : this.operation.operator , operand2 : responseData.operand1};

          console.log(this.operation);
          //this.gotResult = true;
          this.gotUnaryOperand = true;
          this.gotDotO1 = false;
          this.gotDotO2 = false;
          this.sendOperationToScreen();
        });
      }


      if ((operator == '+' || operator == '-' || operator == '/' || operator == '*')
        && this.operation.operand2 == '') {
        this.operation = {operand1: this.operation.operand1, operator: operator, operand2: ''};
        this.sendOperationToScreen();
        return;
      }


      if (operator == '+' || operator == '-' || operator == '/' || operator == '*') {

        this.service.POSTRequest(this.operation).subscribe(responseData => {
          this.operation = {operand1: responseData.operand1, operator: operator, operand2: ''};
          this.modifyGotDot(this.operation.operand1,this.operation.operand2);
          this.sendOperationToScreen();
        });
      }
    }
  }

  sendOperationToScreen() {
    this.operationEmitter.emit(this.operation);
  }

  modifyGotDot(operand1: string, operand2: string) {
    this.gotDotO1 = operand1.includes('.');
    this.gotDotO2 = operand2.includes('.');
  }
}
