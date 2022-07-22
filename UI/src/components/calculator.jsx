import React, { Component } from 'react';
import OperationField from './Fields/operationField.jsx';
import ResultField from './Fields/resultField.jsx';
import NumberField from './Fields/numberField.jsx';
import ClearField from './Fields/clearField.jsx';
import EvaluationField from './Fields/evaluationField.jsx';
import CommaField from './Fields/commaField.jsx';

class Calculator extends Component {
    state = {
        result: {
            x: '',
            y: '',
            operator: '',
            value: '',
            error: ''
        }
    };

    concatResult = () => {
        const resultString = ((this.state.result.x !== '') ? this.state.result.x : '')
            + ((this.state.result.operator !== '') ? " " + this.state.result.operator + ' ' : '')
            + ((this.state.result.y !== '') ? this.state.result.y : '');
        
        if (this.state.result.error != '')
            return this.state.result.error;
        
        if (this.state.result.value != '')
            return this.state.result.value;
        
        if (resultString === '')
            return '???';
        
        return resultString;
    };

    render() {
        return (
            <div className="container w-50 text-center ">
                <div className="row">
                    <ResultField displayData={this.concatResult()} />
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
                    <div className="col-3"></div>
                    <div className="col-3"></div>
                    <div className="col-3"></div>
                    <CommaField value={'.'} onComma={this.handleComma} />
                </div>
            </div>
        );
    };

    handleComma = () => {
        let { x, y, operator, value, error } = this.state.result; 

        if (y == '' && operator == '')
            x += x + '.';
    }

    handleClear = () => {
        this.setState({
            result: {
                x: '',
                y: '',
                operator: '',
                value: '',
                error: ''
            }
        });
    };

    returnEmptyResult = () => {
        return {
            x: '',
            y: '',
            operator: '',
            value: '',
            error: ''
            
        }
    };

    handleNumber = (number) => {
        let result = this.state.result;
        if (result.error !== '') {
            result.error = '';
        }
        
        if (result.x === '' && result.operator === '') {
            if (result.x === '0' && number === 0)
                return;
            
            if (result.x === '0' && number !== 0) {
                result.x = '' + number;
                this.setState({ result });
                return;
            }
            
            result.x += '' + number;
            this.setState({ result });
        } else {
            if (result.y === '0' && number === 0)
                return;
            
            if (result.y === '0' && number !== 0) {
                result.x = '' + number;
                this.setState({ result });
                return;
            }
            
            result.y += '' + number;
            this.setState({ result });
        }

      
    };

    handleEvaluation = async () => {
        if (this.state.result.x === '' || this.state.result.operator === '' || this.state.result.y === '')
            return;
        
        let requestString = this.state.result.x.trim() + "/" + this.state.result.operator + "/" + this.state.result.y;
        let result = this.state.result;

        if (this.state.result.x.length > 7 || this.state.result.x.length > 7) {
            result = this.returnEmptyResult();
            result.error = "Overflow : max. length 7"
            this.setState({ result });
            return;
        }

        let error = false;
        await fetch('/' + requestString)
            .then(response => {
                if (response.status !== 200) error = true;
                return response.json();
            }
            )
            .then(m => {
                if (error) {
                    result = this.returnEmptyResult();
                    result.error = '' + m.message;
                } else {
                    result.value = '' + m;
                    result.x = '';
                    result.y = '';
                    result.operator = '';
                    this.setState({ result });
                }
                this.setState({ result });
            });
    };

    handleOperation = async (operator) => {
        if (this.state.result.x !== '' && this.state.result.y === '') {
            let result = this.state.result;
            result.operator = operator;
            this.setState({ result });
            return;
        }

        if (this.state.result.x !== '' && this.state.result.operator !== '' && this.state.result.y !== '') {
            await this.handleEvaluation();
        }
           
        
        if (this.state.result.value !== '') {
            let result = this.state.result;
            result.operator = operator;
            result.x = result.value;
            result.y = '';
            result.value = '';
            this.setState({ result });
        }
        
    };
}
 
export default Calculator;