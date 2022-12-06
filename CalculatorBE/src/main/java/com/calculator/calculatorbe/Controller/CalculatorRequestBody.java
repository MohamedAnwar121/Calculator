package com.calculator.calculatorbe.Controller;


public class CalculatorRequestBody {


    String operand1;
    String operator;
    String operand2;

    public CalculatorRequestBody(){
        this.operand1 = "";
        this.operator = "";
        this.operand2 = "";
    }

    public CalculatorRequestBody(String operand1, String operand2, String operator) {
        this.operand1 = operand1;
        this.operator = operator;
        this.operand2 = operand2;
    }

    public String getOperand1() {
        return operand1;
    }

    public void setOperand1(String operand1) {
        this.operand1 = operand1;
    }

    public String getOperand2() {
        return operand2;
    }

    public void setOperand2(String operand2) {
        this.operand2 = operand2;
    }

    public String getOperator() {
        return operator;
    }

    public void setOperator(String operator) {
        this.operator = operator;
    }
}
