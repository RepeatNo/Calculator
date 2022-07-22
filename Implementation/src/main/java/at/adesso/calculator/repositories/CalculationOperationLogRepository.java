package at.adesso.calculator.repositories;

import at.adesso.calculator.entities.CalculationOperationLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CalculationOperationLogRepository extends JpaRepository<CalculationOperationLog, Long> {
}