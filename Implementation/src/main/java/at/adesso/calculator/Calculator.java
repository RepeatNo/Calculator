package at.adesso.calculator;

public interface Calculator {
    Float add(Float x, Float y);

    Float subtract(Float x, Float y);

    Float multiply(Float x, Float y);

    Float divide(Float x, Float y) throws DivisionByZeroException;

    Float modulo(Float x, Float y);
}
