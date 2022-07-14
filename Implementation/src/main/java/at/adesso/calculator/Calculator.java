package at.adesso.calculator;

public interface Calculator {
    public Float add(Float x, Float y);

    public Float subtract(Float x, Float y);

    public Float multiply(Float x, Float y);

    public Float divide(Float x, Float y) throws DivisionByZeroException;
}
