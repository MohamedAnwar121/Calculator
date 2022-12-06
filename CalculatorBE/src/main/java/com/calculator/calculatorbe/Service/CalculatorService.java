package com.calculator.calculatorbe.Service;

import com.calculator.calculatorbe.Controller.CalculatorRequestBody;
import org.springframework.stereotype.Service;


@Service
public class CalculatorService {

    private CalculatorRequestBody requestBody;

    public CalculatorRequestBody calculateResults(String operand1, String operand2, String operator) {

        requestBody = new CalculatorRequestBody();
        double O1 = 0, O2 = 0, result;

        if (!operand1.equals("Error")) {
            O1 = (!operand1.equals("")) ? Double.parseDouble(operand1) : 0;
            O2 = (!operand2.equals("")) ? Double.parseDouble(operand2) : 0;

            if ((O2 == 0 && operator.equals("/"))
                    || (O1 == 0 && operator.equals("1/x"))
                    || (O1 < 0 && operator.equals("sqrt x"))) {
                requestBody.setOperand1("Error");
                return requestBody;
            }
        }


        switch (operator) {
            case "+":
                result = O1 + O2;
                break;
            case "-":
                result = O1 - O2;
                break;
            case "*":
                result = O1 * O2;
                break;
            case "/":
                result = O1 / O2;
                break;
            case "1/x":
                result = 1 / O1;
                break;
            case "sqrt x":
                result = Math.sqrt(O1);
                break;
            case "x^2":
                result = Math.pow(O1, 2);
                break;
            case "+/-":
                result = -1 * O1;
                break;
            case "%":
                result = O1 / 100;
                break;
            case "CE", "C":
                requestBody.setOperand1("");
                requestBody.setOperator("");
                return requestBody;
            case "=":
                this.checkDouble(O1);
                return requestBody;
            case "delete":
                this.DeleteOperator(operand1, operand2, operator);
                return requestBody;
            default:
                return requestBody;
        }

        this.checkDouble(result);

        return requestBody;
    }

    private void checkDouble(double result) {
        if (Math.floor(result) == Math.ceil(result)) requestBody.setOperand1(String.valueOf((int) result));
        else requestBody.setOperand1(String.valueOf(result));
    }

    private void DeleteOperator(String operand1, String operand2, String operator) {

        if (operand1.length() == 0) {


            if (operand2.length() == 0 || operand2.equals("0")) {
                requestBody.setOperand1(operand1);
                requestBody.setOperator("");
                requestBody.setOperand2(operand2);
                return;
            }

            operand2 = operand2.substring(0, operand2.length() - 1);
            if (operand2.length() == 0) operand2 = "0";


        } else if (operand2.equals("")) {

            operand1 = operand1.substring(0, operand1.length() - 1);
            if (operand1.length() == 0) operand1 = "0";

        }

        requestBody.setOperand1(operand1);
        requestBody.setOperator("");
        requestBody.setOperand2(operand2);
    }
}
