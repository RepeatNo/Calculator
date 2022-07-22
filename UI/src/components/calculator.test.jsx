import React from 'react';
import { ReactDOM } from 'react';
import { render, screen } from '@testing-library/react';
import Calculator from "./calculator";
import TestRenderer from 'react-test-renderer';


it('clear result', () => {
    let calculator = TestRenderer.create(<Calculator />).getInstance();
    calculator.handleClear()
    expect(calculator.state).toEqual({
        x: { sign: '+', value: '' },
        y: { sign: '+', value: '' },
        operator: '',
        result: { sign: '+', value: '' },
        error: ''
    });
});

it('number added', () => {
    let calculator = TestRenderer.create(<Calculator />).getInstance();
    calculator.handleNumber(4)
    expect(calculator.state.x.value).toEqual("4");

    calculator.state.operator = "+";

    calculator.handleNumber(4)
    expect(calculator.state.x.value).toEqual("4");

});

it('number added (zero)', () => {
    let calculator = TestRenderer.create(<Calculator />).getInstance();
    calculator.handleNumber(0)
    expect(calculator.state.x.value).toEqual("0");
    calculator.handleNumber(0)
    expect(calculator.state.x.value).toEqual("0");
});

it('zero replaced with number', () => {
    let calculator = TestRenderer.create(<Calculator />).getInstance();
    let exampleNumber = "3";
    calculator.handleNumber(exampleNumber)
    expect(calculator.state.x.value).toEqual(exampleNumber);
});

it('operation added (+)', () => {
    let calculator = TestRenderer.create(<Calculator />).getInstance();
    calculator.handleOperation("+");
    expect(calculator.state.operator).toEqual("");

    calculator.handleNumber(1);
    calculator.handleOperation("+");
    expect(calculator.state.operator).toEqual("+");
    
    calculator.handleOperation("-");
    expect(calculator.state.operator).toEqual("-");

});

it('operation', async () => {
    let calculator = TestRenderer.create(<Calculator />).getInstance();
    calculator.handleNumber(1);
    calculator.handleOperation("+");
    calculator.handleNumber(4);
    await calculator.handleOperation("+")
    expect(calculator.state.x.value).toEqual('5');
    expect(calculator.state.operator).toEqual('+');
    expect(calculator.state.y.value).toEqual('');
    expect(calculator.state.result.value).toEqual('');
});

it('evaluation', async () => {
    let calculator = TestRenderer.create(<Calculator />).getInstance();
    calculator.handleNumber(1);
    calculator.handleOperation("+");
    calculator.handleNumber(4);
    await calculator.handleEvaluation()
    expect(calculator.state.x.value).toEqual('');
    expect(calculator.state.operator).toEqual('');
    expect(calculator.state.x.value).toEqual('');
    expect(calculator.state.result.value).toEqual('5');
});

it('dynamicDisplay', () => {
    let calc = TestRenderer.create(<Calculator />).getInstance();
    calc.state.x.value = "434"
    calc.state.result.value = "1"
    let result = calc.dynamicDisplay();
    expect(result).toEqual("1");

    calc.state.result.value = ""

    calc.state.x.value = "3"
    let result2 = calc.dynamicDisplay();
    expect(result2).toEqual("3");

    calc.state.x.value = "3"
    calc.state.operator = ":"
    let result3 = calc.dynamicDisplay();
    expect(result3).toEqual("3 : ");

    calc.state.x.value = "3"
    calc.state.operator = ":"
    calc.state.y.value = "3"
    let result4 = calc.dynamicDisplay();
    expect(result4).toEqual("3 : 3");
});

it('overflow error', async () => {
    let calculator = TestRenderer.create(<Calculator />).getInstance();
    calculator.handleNumber('99999991');
    calculator.handleOperation("x");
    calculator.handleNumber('99999991');
    await calculator.handleEvaluation()
    expect(calculator.dynamicDisplay()).toEqual('Overflow : max. length 7');

    let calculator2 = TestRenderer.create(<Calculator />).getInstance();
    calculator2.handleNumber('9999999');
    calculator2.handleOperation("x");
    calculator2.handleNumber('99999991');
    await calculator2.handleEvaluation()
    expect(calculator2.dynamicDisplay()).toEqual('Overflow : max. length 7');

    let calculator4 = TestRenderer.create(<Calculator />).getInstance();
    calculator4.handleNumber('1.77777777777777777');
    calculator4.handleOperation("+");
    calculator4.handleNumber('0');
    await calculator4.handleEvaluation()
    expect(calculator4.dynamicDisplay()).toEqual('1.7777778');
});

it('error -> clear', async () => {
    let calculator = TestRenderer.create(<Calculator />).getInstance();
    calculator.handleNumber("0");
    calculator.handleOperation(":");
    calculator.handleNumber("0");

    await calculator.handleEvaluation();

    expect(calculator.dynamicDisplay()).toEqual("Division by zero")

    calculator.handleNumber("1");

    expect(calculator.dynamicDisplay()).toEqual("1");
    expect(calculator.state.y.value).toEqual("");
    calculator.handleNumber("1");
    expect(calculator.state.x.value).toEqual("11");
    expect(calculator.state.operator).toEqual("");
    expect(calculator.state.y.value).toEqual("");

    calculator.state.x.value = ""

    expect(calculator.dynamicDisplay()).toEqual("???")
});

it('decimal numbers impl', async () => {
    let calculator = TestRenderer.create(<Calculator />).getInstance();

    calculator.handleNumber("2");
    calculator.handleComma();
    calculator.handleNumber("3");
    expect(calculator.state.x.value).toEqual("2.3")

    let calculator2 = TestRenderer.create(<Calculator />).getInstance();

    calculator2.handleNumber("2.123123");
    calculator2.handleOperation("+");
    calculator2.handleNumber("32");
    calculator2.handleComma();
    calculator2.handleNumber("3");
    expect(calculator2.state.y.value).toEqual("32.3")

let calculator3 = TestRenderer.create(<Calculator />).getInstance();

    calculator3.handleNumber("2.123123");
    calculator3.handleOperation("x");
    calculator3.handleNumber("32");
    calculator3.handleComma();
    calculator3.handleNumber("312312");
    expect(calculator3.state.y.value).toEqual("32.312312")
    await calculator3.handleEvaluation();
    expect(calculator3.state.result.value).toEqual("68.60301")
})

it('sign change', async () => {
    let calculator = TestRenderer.create(<Calculator />).getInstance();

    calculator.handleNumber("2");
    calculator.handleSignChange();
    calculator.handleNumber("3");
    expect(calculator.dynamicDisplay()).toEqual("-23")

    calculator.handleOperation('-');

    calculator.handleNumber("2");
    calculator.handleSignChange();
    expect(calculator.dynamicDisplay()).toEqual("-23 - -2")

    await calculator.handleEvaluation();
    expect(calculator.dynamicDisplay()).toEqual("-21")
})
