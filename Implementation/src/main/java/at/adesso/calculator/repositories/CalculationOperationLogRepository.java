package at.adesso.calculator.repositories;

import at.adesso.calculator.entities.CalculationOperationLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CalculationOperationLogRepository extends JpaRepository<CalculationOperationLog, Long> {
    List<CalculationOperationLog> findAllByIdIsNotNullOrderByIdDesc();
}