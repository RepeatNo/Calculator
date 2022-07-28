import React, { Component } from 'react';

class ClearField extends Component{
    render() { 
        return (
            <input className='col btn btn-sm btn-danger m-1' type='button' onClick={() => this.props.onClear()} value={this.props.value} />
        );
    }
}
 
export default ClearField;