import * as React from 'react';
import * as ReactDOM from 'react-dom'

class Component extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { input: "" };
    }

    render() {
        const onSubmit = () => {
            alert(`You submitted: ${this.state.input}`);
        }

        return <div>
            <h1>MP Climb Stat</h1>
            <form onSubmit={onSubmit}>
                <input type="text"
                       id="input"
                       name="input"
                       onChange={(event) => this.setState( { input: event.target.value })}
                />
                <input type="submit" value="Submit"/>
            </form>
        </div>;
    }
}

ReactDOM.render(<Component/>, document.getElementById('content'));
