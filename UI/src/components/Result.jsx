import React, { Component } from 'react';

class Result extends Component {
    state = this.props.state;
    render() { 
        return (
            this.whatToRender()            
        );
    }

    whatToRender = () => {
        let { error, result, x, operator, y } = this.props.state;

        if (error !== '') {
            return (<div className="col-auto">
                <div>{error}</div>
            </div>);
        }

        if (result.value !== '') {
            return (this.renderNumber(result));
        }

        if (x.value !== '' && (y.value !== '' || y.denominator.active === true)) {
            return (
                <div className="row justify-content-end text-center align-items-center">
                    {this.renderNumber(x)}
                    {this.renderOperator(operator)}
                    {this.renderNumber(y)}
                </div>
            )
        }

        if ((x.value !== '' && (y.value === '' || y.denominator.active === false)) || x.denominator.active === true) {
            return (
                <div className="row justify-content-end text-center align-items-center">
                    {this.renderNumber(x)}
                    {this.renderOperator(operator)}
                </div>
            )
        }

        return (
            <div className="col-auto">
                <div>0</div>
            </div>
        );
    };

    renderValue = (object) => {
        return (object.value === '') ? "[ ]" : "" + ((object.sign === '+') ? '' : '-') + object.value
    };

    renderNumber = (number) => {
        if (number.denominator.active === false) {
            return (
                <div className="col-auto">
                    <div>{this.renderValue(number)}</div>
                </div>
            )
        }
        return (
            <div className="col-auto">
                <div className="border-bottom border-primary">{this.renderValue(number)}</div>
                <div>{this.renderValue(number.denominator)}</div>
            </div>
        );
    };

    renderOperator = (operator) => {
        if (operator !== '') {
            return (
                <div className="col-auto">
                    {operator}
                </div>
            )
        }
    };
}
 
export default Result;