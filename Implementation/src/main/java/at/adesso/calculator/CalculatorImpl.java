package at.adesso.calculator;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

@Component
public class CalculatorImpl implements Calculator {
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
    public Float divide(Float x, Float y) {
        if (y == 0) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Division by zero",
                    new DivisionByZeroException("y cannot be 0"));
        }


        return x / y;
    }
}
