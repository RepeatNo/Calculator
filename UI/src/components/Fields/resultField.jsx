import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class ResultField extends Component {
    state = {  } 
    render() { 
        return (
            <h2 className='text-end h-100'>{this.props.displayData}</h2>
        );
    }
}
 
export default ResultField;