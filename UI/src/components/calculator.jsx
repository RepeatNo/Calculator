import React, { Component } from 'react';
import OperationField from './Fields/operationField.jsx';
import ResultField from './Fields/resultField.jsx';
import NumberField from './Fields/numberField.jsx';
import ClearField from './Fields/clearField.jsx';
import EvaluationField from './Fields/evaluationField.jsx';

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
            </div>
        );
    };

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

    handleNumber = (number) => {
        let result = this.state.result;
        if (result.error !== '') {
            result.error = '';
        }
        
        if (this.state.result.y === '' && this.state.result.operator === '') {
            if (this.state.result.x === '0' && number === 0)
                return;
            
            if (this.state.result.x === '0' && number !== 0) {
                result.x = '' + number;
                this.setState({ result });
                return;
            }
            
            result.x = this.state.result.x + '' + number;
            this.setState({ result });
        } else {
            if (this.state.result.y === '0' && number === 0)
                return;
            
            if (this.state.result.y === '0' && number !== 0) {
                result.x = '' + number;
                this.setState({ result });
                return;
            }
            
            result.y = this.state.result.y + '' + number;
            this.setState({ result });
        }

      
    };

    handleEvaluation = async () => {
        if (this.state.result.x === '' || this.state.result.operator === '' || this.state.result.y === '')
            return;
        
        let requestString = this.state.result.x.trim() + "/" + this.state.result.operator + "/" + this.state.result.y;
        let result = this.state.result;
        
        console.log(this.state.result.x.length);

        if (this.state.result.x.length > 7 || this.state.result.x.length > 7) {
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
                    this.handleClear();
                    result = this.state.result;
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