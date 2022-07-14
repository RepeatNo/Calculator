package at.adesso.calculator.controllers;

import at.adesso.calculator.DivisionByZeroException;
import at.adesso.calculator.services.CalculatorService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
@Slf4j
public class CalculatorController {

    CalculatorService calculatorService;

    public CalculatorController(CalculatorService calculatorService) {
        this.calculatorService = calculatorService;
    }

    @GetMapping("/add/{x}+{y}")
    Float addFloat(@PathVariable Float x, @PathVariable Float y) {
        log.info("Added: " + x + ";" + y);
        return calculatorService.add(x, y);
    }

    @GetMapping("/subtract/{x}-{y}")
    Float subtractFloat(@PathVariable Float x, @PathVariable Float y) {
        log.info("Subtracted: " + x + ";" + y);
        return calculatorService.subtract(x, y);
    }

    @GetMapping("/multiply/{x}x{y}")
    Float multiplyFloat(@PathVariable Float x, @PathVariable Float y) {
        log.info("Multiplied: " + x + ";" + y);
        return calculatorService.multiply(x, y);
    }

    @GetMapping("/divide/{x}:{y}")
    Float divideFloat(@PathVariable Float x, @PathVariable Float y) throws DivisionByZeroException {
        log.info("Divided: " + x + ";" + y);
        return calculatorService.divide(x, y);
    }
}
