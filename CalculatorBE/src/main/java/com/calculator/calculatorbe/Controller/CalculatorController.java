package com.calculator.calculatorbe.Controller;

import com.calculator.calculatorbe.Service.CalculatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin()
@RequestMapping("/api/calculations")
@RestController
public class CalculatorController {

    private final CalculatorService calculatorService;

    @Autowired
    public CalculatorController(CalculatorService calculatorService) {
        this.calculatorService = calculatorService;
    }

    @PostMapping("/calculator")
    public ResponseEntity<CalculatorRequestBody> calculator(@RequestBody CalculatorRequestBody body){
        CalculatorRequestBody result = calculatorService.calculateResults(body.operand1,body.operand2,body.operator);
        return ResponseEntity.ok(result);
    }

}
