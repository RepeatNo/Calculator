import React, { Component } from 'react';

class EvaluationField extends Component{
    render() { 
        return (
            <input className='col btn btn-sm btn-primary m-1' type='button' onClick={() => this.props.onEvaluation()} value={this.props.value} />
        );
    }
}
 
export default EvaluationField;