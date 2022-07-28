import React, { Component } from 'react';

class StoreField extends Component{
    render() { 
        return (
            <input
                className='col btn btn-sm btn-secondary m-1'
                type='button'
                onClick={() => this.props.onStore(this.props.index)}
                value={this.props.value}
            />
        );
    }
}
 
export default StoreField;