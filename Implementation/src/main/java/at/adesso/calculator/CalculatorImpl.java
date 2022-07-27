package at.adesso.calculator;

import at.adesso.calculator.entities.LoggingType;
import at.adesso.calculator.entities.OperationType;
import at.adesso.calculator.services.LoggingService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

@Component
public class CalculatorImpl implements Calculator {
    private final LoggingService loggingService;

    public CalculatorImpl(LoggingService loggingService) {
        this.loggingService = loggingService;
    }

    @Override
    public Float add(Float x, Float y) {
        return x + y;
    }

    @Override
    public Float subtract(Float x, Float y) {
        return x - y;
    }

    @Override
    public Float multiply(Float x, Float y) {
        return x * y;
    }

    @Override
    public Float divide(Float x, Float y) throws DivisionByZeroException {
        if (y == 0) {
            loggingService.log(x, y, null, OperationType.DIVIDE, LoggingType.ERROR);
            throw new DivisionByZeroException("Y ZERO");
        }
        return x / y;
    }

    @Override
    public Float modulo(Float x, Float y) {
        return x % y;
    }
}
