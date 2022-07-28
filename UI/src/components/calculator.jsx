import React, { Component } from 'react';
import OperationField from './Fields/operationField.jsx';
import NumberField from './Fields/numberField.jsx';
import ClearField from './Fields/clearField.jsx';
import EvaluationField from './Fields/evaluationField.jsx';
import CommaField from './Fields/commaField.jsx';
import SignField from './Fields/signField.jsx';
import StoreField from './Fields/storeField.jsx';
import FractionField from './Fields/fractionField.jsx';

class Calculator extends Component {
    state = {
        x: { sign: '+', value: '' },
        y: { sign: '+', value: '' },
        operator: '',
        result: { sign: '+', value: '' },
        error: '',

        storage: [
            { name: 'Storage-1', value: '' },
            { name: 'Storage-2', value: '' },
            { name: 'Storage-3', value: '' },
            { name: 'Storage-4', value: '' },
            { name: 'Storage-5', value: '' }
        ]
    };

    renderStorage = (number) => {
        return (this.state.storage[number].value === '') ? this.state.storage[number].name : this.state.storage[number].value
    };

    render() {
        return (
            <div className="container col text-center">
                {/*
                    <div className="row col-6 justify-content-center align-items-center">
                        <div className="col">
                            <div className="border-bottom border-primary">12</div>
                            <div>4</div>
                        </div>
                        <div className="col">
                            x
                        </div>
                        <div className="col">
                            <div className="border-bottom border-primary">3</div>
                            <div>4</div>
                        </div>
                    </div> 
                */}
                <div className="row text-end font-monospace" style={{ fontSize: "25px" }}>
                    <div>
                        {this.dynamicDisplay()}
                    </div>
                </div>
                <div className="row">
                    <StoreField value={this.renderStorage(0)} index={0} onStore={this.handleStore} />
                    <StoreField value={this.renderStorage(1)} index={1} onStore={this.handleStore} />
                    <StoreField value={this.renderStorage(2)} index={2} onStore={this.handleStore} />
                    <StoreField value={this.renderStorage(3)} index={3} onStore={this.handleStore} />
                    <StoreField value={this.renderStorage(4)} index={4} onStore={this.handleStore} />
                </div>
                <div className="row">
                    <NumberField value={7} onNumber={this.handleNumber} />
                    <NumberField value={8} onNumber={this.handleNumber} />
                    <NumberField value={9} onNumber={this.handleNumber} />
                    <FractionField value2={'÷'} onFraction={this.handleFraction} />
                    <OperationField value={'%'} onOperation={this.handleOperation} />
                </div>
                <div className="row">
                    <NumberField value={4} onNumber={this.handleNumber} />
                    <NumberField value={5} onNumber={this.handleNumber} />
                    <NumberField value={6} onNumber={this.handleNumber} />
                    <OperationField value={':'} onOperation={this.handleOperation} />
                    <OperationField value={'x'} onOperation={this.handleOperation} />
                    
                </div>
                <div className="row">
                    <NumberField value={1} onNumber={this.handleNumber} />
                    <NumberField value={2} onNumber={this.handleNumber} />
                    <NumberField value={3} onNumber={this.handleNumber} />
                    <OperationField value={'-'} onOperation={this.handleOperation} />
                    <OperationField value={'+'} onOperation={this.handleOperation} />
                </div>
                <div className="row">
                    <SignField value={'+/-'} onSignChange={this.handleSignChange} />
                    <NumberField value={0} onNumber={this.handleNumber} />
                    <CommaField value={'.'} onComma={this.handleComma} />
                    <ClearField value={'clear'} onClear={this.handleClear} />
                    <EvaluationField value={'='} onEvaluation={this.handleEvaluation} />
                </div>
            </div>
        );
    };

    dynamicDisplay = () => {
        let { x, y, operator, error, result } = this.state;

        const dynamicString = (
            ((x.value !== '')  ? ((x.sign !== '+') ? x.sign : '') + x.value : '') +
            ((operator !== '') ? " " + operator + ' ' : '') +
            ((y.value !== '')  ? ((y.sign !== '+') ? y.sign : '') + y.value : '')
        );
        
        if (error !== '')
            return error;
        
        if (result.value !== '')
            return ((result.sign !== '+') ? result.sign : '') + result.value;
        
        if (dynamicString === '')
            return '0';
        
        return dynamicString;
    };

    handleStore = (index) => {
        let { x, y, storage } = this.state;

        //Return value
        if (storage[index].value !== '') {
            if (this.state.y.value === '' && this.state.operator !== '' && this.state.x.value !== '') {
                y.value = "" + storage[index].value;
                
            } else {
                if (this.state.x.value === '') {
                    x.value = "" + storage[index].value;
                }
            }
            storage[index].value = "";
        } else {
            //Store value
            if (this.state.y.value !== '') {
                storage[index].value = this.state.y.value;
            } else {
                if (this.state.x !== '') {
                    storage[index].value = this.state.x.value;
                }
            }
        }
        this.setState({ x, y, storage });
    };

    handleSignChange = () => {
        let { x, y, operator, result } = this.state;

        if (result.value !== '') {
            x = { ...result };
            result = { sign: '+', value: '' }
        }

        if (y.value === '' && operator === '') {
            x.sign = (x.sign === '+') ? '-' : '+';
        }

        if (operator !== '' && y.value !== '') {
            y.sign = (y.sign === '+') ? '-' : '+';
        }

        this.setState({ x, y, result });
    };

    handleComma = () => {
        let state = this.state;

        if (state.result.value !== '') {
            state.x = { ...state.result };
            state.result = { sign: '+', value: '' };
        }

        if (state.y.value === '' && state.operator === '' && !state.x.value.includes("."))
            state.x.value += '.';
        else {
            if (state.x.value !== '' && state.operator !== '' && !state.y.value.includes(".")) {
                state.y.value += '.'
            }
        }
        
        this.setState(state);
    }

    handleClear = () => {
        if (this.state.y.value !== '') {
            this.setState({
                y: { sign: '+', value: '' }
            });
        } else {
            this.setState({
                x: { sign: '+', value: '' },
                y: { sign: '+', value: '' },
                operator: '',
                result: { sign: '+', value: '' },
                error: ''
            });
        }
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
       
        let requestString = x.sign + x.value + "/"
            + ((operator === '%') ? operator + "25" : operator)
            + "/" + y.sign + y.value;

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
            x = { ...result };
            y = { sign: '+', value: '' };
            result = { sign: '+', value: '' };
            
            this.setState({ operator, x, y, result });
        }  
    };
}
 
export default Calculator;