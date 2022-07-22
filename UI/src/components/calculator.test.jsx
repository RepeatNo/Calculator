import React from 'react';
import { ReactDOM } from 'react';
import { render, screen } from '@testing-library/react';
import Calculator from "./calculator";
import TestRenderer from 'react-test-renderer';


it('clear result', () => {
    let calculator = TestRenderer.create(<Calculator />).getInstance();
    calculator.handleClear()
    expect(calculator.state.result).toEqual({
        x: '',
        y: '',
        operator: '',
        value: '',
        error: ''
    });
});

it('number added', () => {
    let calculator = TestRenderer.create(<Calculator />).getInstance();
    calculator.handleNumber(4)
    expect(calculator.state.result.x).toEqual("4");

    calculator.state.result.operator = "+";

    calculator.handleNumber(4)
    expect(calculator.state.result.y).toEqual("4");

});

it('number added (zero)', () => {
    let calculator = TestRenderer.create(<Calculator />).getInstance();
    calculator.handleNumber(0)
    expect(calculator.state.result.x).toEqual("0");
    calculator.handleNumber(0)
    expect(calculator.state.result.x).toEqual("0");
});

it('zero replaced with number', () => {
    let calculator = TestRenderer.create(<Calculator />).getInstance();
    let exampleNumber = "3";
    calculator.handleNumber(exampleNumber)
    expect(calculator.state.result.x).toEqual(exampleNumber);
});

it('operation added (+)', () => {
    let calculator = TestRenderer.create(<Calculator />).getInstance();
    calculator.handleOperation("+");
    expect(calculator.state.result.operator).toEqual("");

    calculator.handleNumber(1);
    calculator.handleOperation("+");
    expect(calculator.state.result.operator).toEqual("+");
    
    calculator.handleOperation("-");
    expect(calculator.state.result.operator).toEqual("-");

});

it('operation', async () => {
    let calculator = TestRenderer.create(<Calculator />).getInstance();
    calculator.handleNumber(1);
    calculator.handleOperation("+");
    calculator.handleNumber(4);
    await calculator.handleOperation("+")
    expect(calculator.state.result.x).toEqual('5');
    expect(calculator.state.result.operator).toEqual('+');
    expect(calculator.state.result.y).toEqual('');
    expect(calculator.state.result.value).toEqual('');
});

it('evaluation', async () => {
    let calculator = TestRenderer.create(<Calculator />).getInstance();
    calculator.handleNumber(1);
    calculator.handleOperation("+");
    calculator.handleNumber(4);
    await calculator.handleEvaluation()
    expect(calculator.state.result.x).toEqual('');
    expect(calculator.state.result.operator).toEqual('');
    expect(calculator.state.result.y).toEqual('');
    expect(calculator.state.result.value).toEqual('5');
});

it('concatResult', () => {
    let calc = TestRenderer.create(<Calculator />).getInstance();
    calc.state.result.x = "434"
    calc.state.result.value = "1"
    let result = calc.concatResult();
    expect(result).toEqual("1");

    calc.state.result.value = ""

    calc.state.result.x = "3"
    let result21 = calc.concatResult();
    expect(result21).toEqual("3");

    calc.state.result.x = "3"
    calc.state.result.operator = ":"
    let result2 = calc.concatResult();
    expect(result2).toEqual("3 : ");

    calc.state.result.x = "3"
    calc.state.result.operator = ":"
    calc.state.result.y = "3"
    let result3 = calc.concatResult();
    expect(result3).toEqual("3 : 3");
});

it('overflow error', async () => {
    let calculator = TestRenderer.create(<Calculator />).getInstance();
    calculator.handleNumber('99999991');
    calculator.handleOperation("x");
    calculator.handleNumber('99999991');
    await calculator.handleEvaluation()
    expect(calculator.concatResult()).toEqual('Overflow : max. length 7');
});

it('error -> clear', async () => {
    let calculator = TestRenderer.create(<Calculator />).getInstance();
    calculator.handleNumber("0");
    calculator.handleOperation(":");
    calculator.handleNumber("0");

    await calculator.handleEvaluation();

    expect(calculator.concatResult()).toEqual("Division by zero")
    
    calculator.state.result.error = "";

    expect(calculator.concatResult()).toEqual("???")


});