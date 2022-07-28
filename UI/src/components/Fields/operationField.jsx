import React, { Component } from 'react';

class OperationField extends Component{
    render() { 
        return (
            <input className='col btn btn-sm btn-info m-1' type='button' onClick={() => this.props.onOperation(this.props.value)} value={this.props.value} />
        );
    }
}
 
export default OperationField;