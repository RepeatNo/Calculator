package at.adesso.calculator;

public class DivisionByZeroException extends Exception {
    public DivisionByZeroException(String message) {
        super("DivisionByZero - " + message);
    }
}
