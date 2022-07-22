package at.adesso.calculator.services;

import at.adesso.calculator.entities.CalculationOperationLog;
import at.adesso.calculator.entities.LoggingType;
import at.adesso.calculator.entities.OperationType;
import at.adesso.calculator.repositories.CalculationOperationLogRepository;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class LoggingService {
    private final CalculationOperationLogRepository calculationOperationLogRepository;

    public LoggingService(CalculationOperationLogRepository calculationOperationLogRepository) {
        this.calculationOperationLogRepository = calculationOperationLogRepository;
    }


    public void log(Float input1, Float input2, Float result, OperationType operationType, LoggingType loggingType) {
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
