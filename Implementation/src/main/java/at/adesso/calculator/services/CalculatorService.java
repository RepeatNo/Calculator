package at.adesso.calculator.services;

import at.adesso.calculator.Calculator;
import at.adesso.calculator.CalculatorImpl;
import at.adesso.calculator.DivisionByZeroException;
import at.adesso.calculator.entities.LoggingType;
import at.adesso.calculator.entities.OperationType;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class CalculatorService implements Calculator {

    private final CalculatorImpl calculator;
    private final LoggingService loggingService;


    public CalculatorService(CalculatorImpl calculator, LoggingService loggingService) {
        this.calculator = calculator;
        this.loggingService = loggingService;
    }

    public Float add(Float x, Float y) {
        Float result = calculator.add(x, y);
        loggingService.log(x, y, result, OperationType.ADD, LoggingType.INFO);
        return result;
    }

    public Float subtract(Float x, Float y) {
        Float result = calculator.subtract(x, y);
        loggingService.log(x, y, result, OperationType.SUBTRACT, LoggingType.INFO);
        return result;
    }

    public Float multiply(Float x, Float y) {
        Float result = calculator.multiply(x, y);
        loggingService.log(x, y, result, OperationType.MULTIPLY, LoggingType.INFO);
        return result;
    }

    public Float divide(Float x, Float y) throws DivisionByZeroException {
        Float result = calculator.divide(x, y);
        loggingService.log(x, y, result, OperationType.DIVIDE, LoggingType.INFO);
        return result;
    }

    @Override
    public Float modulo(Float x, Float y) {
        Float result = calculator.modulo(x, y);
        loggingService.log(x, y, result, OperationType.MODULO, LoggingType.INFO);
        return result;
    }
}
