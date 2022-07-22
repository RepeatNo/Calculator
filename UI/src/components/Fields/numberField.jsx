import React, { Component } from 'react';

class NumberField extends Component{
    render() { 
        return (
            <input className='col btn btn-sm btn-primary m-1' type='button' onClick={() => this.props.onNumber(this.props.value)} value={this.props.value} />
        );
    }
}
 
export default NumberField;