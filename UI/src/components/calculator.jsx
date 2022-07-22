import React, { Component } from 'react';
import OperationField from './Fields/operationField.jsx';
import ResultField from './Fields/resultField.jsx';
import NumberField from './Fields/numberField.jsx';
import ClearField from './Fields/clearField.jsx';
import EvaluationField from './Fields/evaluationField.jsx';
import CommaField from './Fields/commaField.jsx';
import SignField from './Fields/signField.jsx';

class Calculator extends Component {
    state = {
        x: { sign: '+', value: '' },
        y: { sign: '+', value: '' },
        operator: '',
        result: { sign: '+', value: '' },
        error: ''
    };

    dynamicDisplay = () => {
        let { x, y, operator, error, result } = this.state;

        const dynamicString = (
            ((x.value !== '')  ? ((x.sign !== '+') ? x.sign : '') + x.value : '') +
            ((operator !== '') ? " " + operator + ' ' : '') +
            ((y.value !== '')  ? ((y.sign !== '+') ? y.sign : '') + y.value : '')
        );
        
        if (error != '')
            return error;
        
        if (result.value != '')
            return ((result.sign !== '+') ? result.sign : '') + result.value;
        
        if (dynamicString === '')
            return '???';
        
        return dynamicString;
    };

    render() {
        return (
            <div className="container w-50 text-center ">
                <div className="row">
                    <ResultField displayData={this.dynamicDisplay()} />
                </div>
                <div className="row">
                    <NumberField value={7} onNumber={this.handleNumber} />
                    <NumberField value={8} onNumber={this.handleNumber} />
                    <NumberField value={9} onNumber={this.handleNumber} />
                    <OperationField value={'+'} onOperation={this.handleOperation} />
                </div>
                <div className="row">
                    <NumberField value={4} onNumber={this.handleNumber} />
                    <NumberField value={5} onNumber={this.handleNumber} />
                    <NumberField value={6} onNumber={this.handleNumber} />
                    <OperationField value={'-'} onOperation={this.handleOperation} />
                </div>
                <div className="row">
                    <NumberField value={1} onNumber={this.handleNumber} />
                    <NumberField value={2} onNumber={this.handleNumber} />
                    <NumberField value={3} onNumber={this.handleNumber} />
                    <OperationField value={':'} onOperation={this.handleOperation} />
                </div>
                <div className="row">
                    <NumberField value={0} onNumber={this.handleNumber} />
                    <ClearField value={'clear'} onClear={this.handleClear} />
                    <OperationField value={'x'} onOperation={this.handleOperation} />
                    <EvaluationField value={'='} onEvaluation={this.handleEvaluation} />
                </div>
                <div className="row">
                    <div className="col-9"></div>
                    <SignField value={'+/-'} onSignChange={this.handleSignChange} />
                    <CommaField value={'.'} onComma={this.handleComma} />
                </div>
            </div>
        );
    };

    handleSignChange = () => {
        let { x, y, operator, result } = this.state;

        if (result.value !== '') {
            x = result;
        }

        if (y.value === '' && operator === '') {
            x.sign = (x.sign === '+') ? '-' : '+';
        }

        if (operator !== '' && y.value !== '') {
            y.sign = (y.sign === '+') ? '-' : '+';
        }

        this.setState({ x, y });        
    };

    handleComma = () => {
        let state = this.state;

        if (state.result.value !== '') {
            state.x = state.result;
            state.result = { sign: '+', value: '' };
        }

        if (state.y.value == '' && state.operator == '' && !state.x.value.includes("."))
            state.x.value += '.';
        else {
            if (state.x.value !== '' && state.operator !== '' && !state.y.value.includes(".")) {
                state.y.value += '.'
            }
        }
        
        this.setState(state);
    }

    handleClear = () => {
        this.setState({
            x: { sign: '+', value: '' },
            y: { sign: '+', value: '' },
            operator: '',
            result: { sign: '+', value: '' },
            error: ''
        });
    };

    returnEmptyStates = () => {
        return {
            x: { sign: '+', value: '' },
            y: { sign: '+', value: '' },
            operator: '',
            result: { sign: '+', value: '' },
            error: ''
        }
    };

    handleNumber = (number) => {
        let { x, y, operator, error, result } = this.state;

        if (error !== '') {
            error = '';
            this.setState({ error });
        }

        if (result !== '') {
            result.value = '';
            result.sign = '+';
            this.setState({ result });
        }
        
        if (y.value === '' && operator === '') {
            if (x.value === '0' && number === 0)
                return;
            
            if (x.value === '0' && number !== 0) {
                x.value = '' + number;
                this.setState({ x });
                return;
            }
            
            x.value += '' + number;
            this.setState({ x });
        } else {
            if (y.value === '0' && number === 0)
                return;
            
            if (y.value === '0' && number !== 0) {
                x.value = '' + number;
                this.setState({ x });
                return;
            }
            
            y.value += '' + number;
            this.setState({ y });
        }
    };

    handleEvaluation = async () => {
        let {x,y, error, result, operator} = this.state;

        if (x.value === '' || operator === '' || y.value === '')
            return;

        let requestString = x.sign + x.value + "/" + operator + "/" + y.sign + y.value;

        if (x.value.split('.')[0].length > 7 || y.value.split('.')[0].length > 7) {
            ({ x, y, error, result, operator } = this.returnEmptyStates());
            error = "Overflow : max. length 7"
            this.setState({ x, y, error, result, operator });
            return;
        }

        let httpError = false;
        await fetch('/' + requestString)
            .then(response => {
                if (response.status !== 200) httpError = true;
                return response.json();
            }
            )
            .then(m => {
                if (httpError) {
                    ({ x, y, error, result, operator } = this.returnEmptyStates());
                    error = '' + m.message;
                } else {
                    result.value = ('' + m).replace('-', '');
                    result.sign = ('' + m)[0] === '-' ? '-' : '+';

                    x.value = '';
                    y.value = '';
                    operator = '';
                }
                this.setState({ x, y, error, result, operator });
            });
    };

    handleOperation = async (operatorInput) => {
        let { x, y, operator, result } = this.state;

        if (x.value !== '' && y.value === '') {
            operator = operatorInput;
            this.setState({ operator });
            return;
        }

        if (x.value !== '' && operator !== '' && y.value !== '') {
            await this.handleEvaluation();
        }
           
        
        if (result.value !== '') {
            operator = operatorInput;
            x = result;
            y = { sign: '+', value: '' };
            result = { sign: '+', value: '' };
            
            this.setState({ operator, x, y, result });
        }  
    };
}
 
export default Calculator;