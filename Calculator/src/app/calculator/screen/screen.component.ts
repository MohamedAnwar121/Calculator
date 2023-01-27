import {Component, DoCheck, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.css']
})
export class ScreenComponent implements OnInit, DoCheck {
  @Input() operation!: Operation;
  upperString: string = '';
  lowerString: string = '0';

  constructor() {}

  ngOnInit(): void {
    this.operation = {
      operand1: '0',
      operator: '',
      operand2: ''
    };
    this.upperString = '';
    this.lowerString = '0';
  }

  ngDoCheck() {

    if (this.operation.operand1 === 'Error'){
      this.lowerString = 'Error';
    }

    // C && CE behaviour
    if (JSON.stringify(this.operation) === JSON.stringify({operand1: '', operator: '', operand2: ''})) {
      this.lowerString = '0';
      this.upperString = '';
    }


    if (this.operation.operator === '' && this.operation.operand1 != '')
      this.lowerString = String(this.operation.operand1);
    else {
      if (this.operation.operand2 !== '') this.lowerString = String(this.operation.operand2);
      else if (this.operation.operand1 !== '') this.lowerString = String(this.operation.operand1);
    }


    if (this.operation.operator != 'CE'
      && this.operation.operator != 'C'
      && this.operation.operator != 'x^2'
      && this.operation.operator != '1/x'
      && this.operation.operator != 'sqrt x'
      && this.operation.operator != '+/-'
      && this.operation.operator != '%'
      && this.operation.operator != '='
    && this.operation.operator != 'delete') {
      this.upperString = (this.operation.operand1 != '' && this.operation.operator == '' && this.operation.operand2 == '')
        ? '' : this.operation.operand1 + ' ' + this.operation.operator + ' ' + this.operation.operand2;
    }
  }

}
