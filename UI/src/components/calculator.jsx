import React, { Component } from 'react';
import OperationField from './Fields/operationField.jsx';
import NumberField from './Fields/numberField.jsx';
import ClearField from './Fields/clearField.jsx';
import EvaluationField from './Fields/evaluationField.jsx';
import CommaField from './Fields/commaField.jsx';
import SignField from './Fields/signField.jsx';
import StoreField from './Fields/storeField.jsx';
import FractionField from './Fields/fractionField.jsx';
import Result from './Result.jsx';

class Calculator extends Component {
    state = {
        x: { sign: '+', value: '', denominator: { sign: '+', value: '', active: false } },
        y: { sign: '+', value: '', denominator: { sign: '+', value: '', active: false } },
        operator: '',
        result: { sign: '+', value: '', denominator: { sign: '+', value: '', active: false } },
        error: '',

        storage: [
            { name: 'Storage-1', data: { sign: '+', value: '', denominator: { sign: '+', value: '', active: false } } },
            { name: 'Storage-2', data: { sign: '+', value: '', denominator: { sign: '+', value: '', active: false } } },
            { name: 'Storage-3', data: { sign: '+', value: '', denominator: { sign: '+', value: '', active: false } } },
            { name: 'Storage-4', data: { sign: '+', value: '', denominator: { sign: '+', value: '', active: false } } },
            { name: 'Storage-5', data: { sign: '+', value: '', denominator: { sign: '+', value: '', active: false } } }
        ]
    };

    renderStorage = (number) => {
        return (this.state.storage[number].data.value === '') ? this.state.storage[number].name : this.renderNumber(this.state.storage[number].data)
    };

    returnState = () => { return this.state; }

    render() {
        return (
            <div className="container col text-center">
                <div className="row text-end font-monospace" style={{ fontSize: "25px" }}>
                    <div>
                        <Result state={this.state} />
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
                    <FractionField value={'÷'} onFraction={this.handleFraction} />
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

    handleFraction = () => {
        let { x, y, operator, result } = this.state;

        if (result.value !== '') {
            x = { ...result };
            result = { sign: '+', value: '', denominator: { sign: '+', value: '', active: false } }
        }

        if (y.value === '' && operator === '') {
            x.denominator.active = !x.denominator.active;
        } else {
            if (operator !== '') {
                y.denominator.active = !y.denominator.active;
            }
        }

        this.setState({ x, y, result });
    }

    handleStore = (index) => {
        let { x, y, storage, result, operator } = this.state;

        if (result.value !== '') {
            x = { ...result };
            result = { sign: '+', value: '', denominator: { sign: '+', value: '', active: false } }
        }

        //Return value
        if (storage[index].data.value !== '') {
            if (operator !== '' && x.value !== '') {
                y = { ...storage[index].data };
                
            } else {
                if (operator === '' && y.value === '') {
                    x = { ...storage[index].data };
                }
            }
            storage[index].data = { sign: '+', value: '', denominator: { sign: '+', value: '', active: false } };
        } else {
            //Store value
            if (y.value !== ''
                && ((y.denominator.active === true && y.denominator.value !== '')
                    || y.denominator.active === false)) {
                storage[index].data = { ...y };
            } else {
                if (x.value !== '' && y.value === ''
                    && ((x.denominator.active === true && x.denominator.value !== '')
                        || x.denominator.active === false)) {
                    storage[index].data = { ...x };
                }
            }
        }
        this.setState({ x, y, storage, result, operator });
    };

    handleSignChange = () => {
        let { x, y, operator, result } = this.state;

        if (result.value !== '') {
            x = { ...result };
            result = { sign: '+', value: '', denominator: { sign: '+', value: '', active: false } }
        }

        if (y.value === '' && operator === '') {
            if (x.denominator.active) {
                x.denominator.sign = (x.denominator.sign === '+') ? '-' : '+';
            } else {
                x.sign = (x.sign === '+') ? '-' : '+';
            }
        }

        if (operator !== '' && y.value !== '') {
           if (y.denominator.active) {
                y.denominator.sign = (y.denominator.sign === '+') ? '-' : '+';
            } else {
                y.sign = (y.sign === '+') ? '-' : '+';
            }
        }

        this.setState({ x, y, result });
    };

    handleComma = () => {
        let state = this.state;

        if (state.result.value !== '') {
            state.x = { ...state.result };
            state.result = { sign: '+', value: '', denominator: { sign: '+', value: '', active: false } };
        }

        if (state.y.value === '' && state.operator === '' && !state.x.value.includes("."))
            if (state.x.value === '') {
                state.x.value = '0.';
            } else {
                state.x.value += '.';
            }
        else {
            if (state.x.value !== '' && state.operator !== '' && !state.y.value.includes(".")) {
                if (state.y.value === '') {
                    state.y.value = '0.';
                } else {
                    state.y.value += '.';
                }
            }
        }
        
        this.setState(state);
    };

    handleClear = () => {
        if (this.state.y.value !== '') {
            this.setState({
                y: { sign: '+', value: '', denominator: { sign: '+', value: '', active: false } }
            });
        } else {
            this.setState({
                x: { sign: '+', value: '', denominator: { sign: '+', value: '', active: false } },
                y: { sign: '+', value: '', denominator: { sign: '+', value: '', active: false } },
                operator: '',
                result: { sign: '+', value: '', denominator: { sign: '+', value: '', active: false } },
                error: ''
            });
        }
    };

    returnEmptyStates = () => {
        return {
            x: { sign: '+', value: '', denominator: { sign: '+', value: '', active: false } },
            y: { sign: '+', value: '', denominator: { sign: '+', value: '', active: false } },
            operator: '',
            result: { sign: '+', value: '', denominator: { sign: '+', value: '', active: false } },
            error: ''
        }
    };

    handleNumber = (number) => {
        let { x, y, operator, error, result } = this.state;

        if (error !== '') {
            error = '';
            this.setState({ error });
        }

        if (result.value !== '') {
            result = { sign: '+', value: '', denominator: { sign: '+', value: '', active: false } }
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

            if (x.value === '0' && number === 0)
                return;
            
            if (x.value === '0' && number !== 0) {
                x.value = '' + number;
                this.setState({ x });
                return;
            }
            
            if (x.denominator.active === true) {
                x.denominator.value += '' + number;
            } else {
                x.value += '' + number;
            }
            
            this.setState({ x });
        } else {
            if (y.value === '0' && number === 0)
                return;
            
            if (y.value === '0' && number !== 0) {
                y.value = '' + number;
                this.setState({ y });
                return;
            }

            if (y.denominator.value === '0' && number === 0)
                return;
            
            if (y.denominator.value === '0' && number !== 0) {
                y.denominator.value = '' + number;
                this.setState({ y });
                return;
            }
            
            if (y.denominator.active === true) {
                y.denominator.value += '' + number;
            } else {
                y.value += '' + number;
            }
            this.setState({ y });
        }
    };

    handleEvaluation = async () => {
        let {x,y, error, result, operator} = this.state;

        if (x.value === '' || operator === '' || y.value === '')
            return;
       
        if (x.denominator.active === true) {
            let tmp = await this.calculateFraction(x);
            x = { ...tmp };
        }
            
        
        if (y.denominator.active === true){
            let tmp = await this.calculateFraction(y);
            y = { ...tmp };
        }
        
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

                    x = { sign: '+', value: '', denominator: { sign: '+', value: '', active: false } }
                    y = { sign: '+', value: '', denominator: { sign: '+', value: '', active: false } }
                    operator = '';
                }
                this.setState({ x, y, error, result, operator });
            });
    };

    calculateFraction = async (number) => {
        let { x, y, error, result, operator } = this.state;
        
        let requestString = number.sign + number.value + "/"
            + ":"
            + "/" + number.denominator.sign + number.denominator.value;
        
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
                    this.setState({ x, y, error, result, operator });
                    return null;
                } else {
                    number = {
                        sign: ('' + m)[0] === '-' ? '-' : '+',
                        value: ('' + m).replace('-', ''),
                        denominator: { sign: '+', value: '', active: false }
                    }
                }
            });
        return number;
    }

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
            y = { sign: '+', value: '', denominator: { sign: '+', value: '', active: false } };
            result = { sign: '+', value: '', denominator: { sign: '+', value: '', active: false } };
            
            this.setState({ operator, x, y, result });
        }  
    };

    renderValue = (object) => {
        return (object.value === '') ? "[ ]" : "" + ((object.sign === '+') ? '' : '-') + object.value
    };

    renderNumber = (number) => {
        if (number.value === '')
            return "";
        if (number.denominator.active === false) {
            return (
                this.renderValue(number)
            )
        }
        return (this.renderValue(number) + "/" + this.renderValue(number.denominator));
    };
}
 
export default Calculator;