import React, { Component } from 'react';

class CommaField extends Component{
    render() { 
        return (
            <input className='col btn btn-sm btn-info m-1' type='button' onClick={() => this.props.onComma()} value={this.props.value} />
        );
    }
}
 
export default CommaField;