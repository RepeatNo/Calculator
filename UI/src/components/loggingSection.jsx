import React, { Component } from 'react';

class LoggingSection extends Component {
    state = { logs: [] } 
    componentDidMount() {
        this.fetchLogs(5)
    }
    render() { 
        return (
            <section className="row m-5">
                <div className="col-12">
                    <table className="table table-dark">
                        <thead>
                            <tr>
                                <th scope="col">Date</th>
                                <th scope="col">x</th>
                                <th scope="col">Operator</th>
                                <th scope="col">y</th>
                                <th scope="col">Result</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.logs.map(entry => {
                                return (<tr>
                                    <th>{entry.date}</th>
                                    <th>{entry.input1}</th>
                                    <th>{entry.operationType}</th>
                                    <th>{entry.input2}</th>
                                    <th>{entry.result}</th>
                                </tr>)
                            })}
                        </tbody>
                    </table>
                </div>
                <button className="btn btn-primary btn-small" onClick={() => this.fetchLogs(5)}>Refresh</button>
            </section>
        );
    }

    fetchLogs = async (count) => {
        await fetch('/logs/' + count)
            .then(response => response.json())
            .then(m => {
                let logs = m;
                this.setState({ logs });
            });
    }
}
 
export default LoggingSection;