import React, { Component } from 'react';

class FractionField extends Component{
    render() { 
        return (
            <input className='col btn btn-sm btn-info m-1' type='button' onClick={() => this.props.onEvaluation()} value={this.props.value} />
        );
    }
}
 
export default FractionField;