package at.adesso.calculator.controllers;

import at.adesso.calculator.entities.CalculationOperationLog;
import at.adesso.calculator.repositories.CalculationOperationLogRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@Slf4j
public class LoggingController {

    private final CalculationOperationLogRepository calculationOperationLogRepository;

    public LoggingController(CalculationOperationLogRepository calculationOperationLogRepository) {
        this.calculationOperationLogRepository = calculationOperationLogRepository;
    }

    @GetMapping("/logs/{count}")
    ResponseEntity<List<CalculationOperationLog>> getLogging(@PathVariable int count) {
        return ResponseEntity.ok(
                calculationOperationLogRepository
                        .findAllByIdIsNotNullOrderByIdDesc
                                ()
                        .stream()
                        .limit(count)
                        .collect(Collectors.toList())
        );
    }
}
