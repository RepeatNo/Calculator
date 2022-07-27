package at.adesso.calculator.controllers;

import at.adesso.calculator.DivisionByZeroException;
import at.adesso.calculator.services.CalculatorService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.net.http.HttpResponse;
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

    @GetMapping("/{x}/+/{y}")
    ResponseEntity<Float> add(@PathVariable Float x, @PathVariable Float y) {
        log.info("Added: " + x + ";" + y);
        return ResponseEntity.ok(calculatorService.add(x, y));
    }

    @GetMapping("/{x}/-/{y}")
    ResponseEntity<Float> subtract(@PathVariable Float x, @PathVariable Float y) {
        log.info("Subtracted: " + x + ";" + y);
        return ResponseEntity.ok(calculatorService.subtract(x, y));
    }

    @GetMapping("/{x}/x/{y}")
    ResponseEntity<Float> multiply(@PathVariable Float x, @PathVariable Float y) {
        log.info("Multiplied: " + x + ";" + y);
        return ResponseEntity.ok(calculatorService.multiply(x, y));
    }

    @GetMapping("/{x}/:/{y}")
    Float divide(@PathVariable Float x, @PathVariable Float y) throws DivisionByZeroException {
        log.info("Divided: " + x + ";" + y);
        return calculatorService.divide(x, y);
    }

    @GetMapping("/{x}/%/{y}")
    Float modulo(@PathVariable Float x, @PathVariable Float y) {
        log.info("Modulo: " + x + ";" + y);
        return calculatorService.modulo(x, y);
    }
}
