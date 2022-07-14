package at.adesso.calculator.services;

import at.adesso.calculator.Calculator;
import at.adesso.calculator.CalculatorImpl;
import at.adesso.calculator.DivisionByZeroException;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
public class CalculatorService implements Calculator {

    private CalculatorImpl calculator;

    public CalculatorService(CalculatorImpl calculator) {
        this.calculator = calculator;
    }

    public Float add(Float x, Float y) {
        return calculator.add(x, y);
    }

    public Float subtract(Float x, Float y) {
        return calculator.subtract(x, y);
    }

    public Float multiply(Float x, Float y) {
        return calculator.multiply(x, y);
    }

    public Float divide(Float x, Float y) throws DivisionByZeroException {
        return calculator.divide(x, y);
    }
}
