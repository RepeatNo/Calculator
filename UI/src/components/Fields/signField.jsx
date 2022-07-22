import React, { Component } from 'react';

class SignField extends Component{
    render() { 
        return (
            <input className='col btn btn-sm btn-primary m-1' type='button' onClick={() => this.props.onSignChange()} value={this.props.value} />
        );
    }
}
 
export default SignField;