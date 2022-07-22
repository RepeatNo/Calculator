package at.adesso.calculator.services;

import at.adesso.calculator.Calculator;
import at.adesso.calculator.CalculatorImpl;
import at.adesso.calculator.DivisionByZeroException;
import at.adesso.calculator.entities.CalculationOperationLog;
import at.adesso.calculator.entities.LoggingType;
import at.adesso.calculator.entities.OperationType;
import at.adesso.calculator.repositories.CalculationOperationLogRepository;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class CalculatorService implements Calculator {

    private final CalculatorImpl calculator;

    private final CalculationOperationLogRepository calculationOperationLogRepository;

    public CalculatorService(CalculatorImpl calculator, CalculationOperationLogRepository calculationOperationLogRepository) {
        this.calculator = calculator;
        this.calculationOperationLogRepository = calculationOperationLogRepository;
    }

    public Float add(Float x, Float y) {
        Float result = calculator.add(x, y);
        Log(x, y, result, OperationType.ADD, LoggingType.INFO);
        return result;
    }

    public Float subtract(Float x, Float y) {
        Float result = calculator.subtract(x, y);
        Log(x, y, result, OperationType.SUBTRACT, LoggingType.INFO);
        return result;
    }

    public Float multiply(Float x, Float y) {
        Float result = calculator.multiply(x, y);
        Log(x, y, result, OperationType.MULTIPLY, LoggingType.INFO);
        return result;
    }

    public Float divide(Float x, Float y) {
        Float result = calculator.divide(x, y);
        Log(x, y, result, OperationType.DIVIDE, LoggingType.INFO);
        return result;
    }

    private void Log(Float input1, Float input2, Float result, OperationType operationType, LoggingType loggingType) {
        CalculationOperationLog log = new CalculationOperationLog();
        log.setDate(new Date());
        log.setInput1(input1);
        log.setInput2(input2);
        log.setResult(result);
        log.setLoggingType(loggingType);
        log.setOperationType(operationType);
        calculationOperationLogRepository.save(log);
    }
}
