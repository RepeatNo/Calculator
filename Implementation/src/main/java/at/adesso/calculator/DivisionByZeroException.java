package at.adesso.calculator;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST, code = HttpStatus.BAD_REQUEST, reason = "Division by zero")
public class DivisionByZeroException extends Exception {
    public DivisionByZeroException(String message) {
        super("DivisionByZero - " + message);
    }
}
