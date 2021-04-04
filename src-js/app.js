import * as React from 'react';
import * as ReactDOM from 'react-dom'

class TicksPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ticks: [] };
        console.log("flag")
    }

    componentDidMount() {
        // TODO: 4/3/21 Refactor
        fetch("/ticks", {
            method: 'GET',
            credentials: 'include'
        })
            .then((response) => response.json())
            .then((json) => {
                this.setState( (prevState) => ({ ...prevState, ticks: json }));
            }).catch((error) => {
                console.log(error);
            });
    }

    render() {
        const { ticks } = this.state;
        return <RopeSendsByGrade ticks={ticks}/>;
    }
}


class RopeSendsByGrade extends React.PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        const { ticks } = this.props;
        const filteredTicks = ticks.filter((tick) => ((tick.style === "Lead") && (tick['lead-style'] !== "Fell/Hung")))
        return <div>
            {
                    filteredTicks.map((tick, index) => (<div key={`${tick.route}${index}`}> { tick.route } </div>))
            }
        </div>;
    }
}

ReactDOM.render(<TicksPage/>, document.getElementById('content'));
