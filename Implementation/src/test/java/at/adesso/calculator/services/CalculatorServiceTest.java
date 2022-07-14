package at.adesso.calculator.services;

import at.adesso.calculator.DivisionByZeroException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.stereotype.Component;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.util.Assert;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class CalculatorServiceTest {

    @Autowired
    private CalculatorService calculatorService;

    @Test
    void addTest() {
        assertEquals(10, calculatorService.add(5.0f, 5.0f));
        assertEquals(10.6f, calculatorService.add(5.5f, 5.1f));
        assertEquals(0.5f, calculatorService.add(-5.0f, 5.5f));
        assertEquals(-5.5f, calculatorService.add(-10.5f, 5.0f));
    }

    @Test
    void subtractTest() {
        assertEquals(0, calculatorService.subtract(5.0f, 5.0f));
        assertEquals(1, calculatorService.subtract(6.0f, 5.0f));
        assertEquals(-5, calculatorService.subtract(0.0f, 5.0f));
        assertEquals(0, calculatorService.subtract(5.5f, 5.5f));
        assertEquals(1, calculatorService.subtract(6.5f, 5.5f));
        assertEquals(-5, calculatorService.subtract(0.5f, 5.5f));
    }

    @Test
    void multiplyTest() {
        assertEquals(5, calculatorService.multiply(1.0f, 5.0f));
        assertEquals(10, calculatorService.multiply(5.0f, 2.0f));
        assertEquals(-10, calculatorService.multiply(-5.0f, 2.0f));

        assertEquals(8.25f, calculatorService.multiply(1.5f, 5.5f));
        assertEquals(13.75f, calculatorService.multiply(5.5f, 2.5f));
        assertEquals(-13.75f, calculatorService.multiply(-5.5f, 2.5f));
    }

    @Test
    void dividendTest() throws DivisionByZeroException {
        assertEquals(0.2f, calculatorService.divide(1f, 5f));
        assertEquals(3, calculatorService.divide(6.0f, 2.0f));
        assertEquals(-3, calculatorService.divide(-6.0f, 2.0f));

        assertEquals(2.2f, calculatorService.divide(5.5f, 2.5f));
        assertEquals(-2.2f, calculatorService.divide(-5.5f, 2.5f));
    }

    @Test
    void divisionByZeroTest() {
        assertThrows(DivisionByZeroException.class, () -> calculatorService.divide(1.5f, 0.0f));
    }
}