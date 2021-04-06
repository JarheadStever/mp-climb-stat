import * as React from 'react';
import * as ReactDOM from 'react-dom'
import BoulderSendsByGrade from "./components/BoulderSendsByGrade";
import RopeSendsByGrade from "./components/RopeSendsByGrade";


class TicksPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            responseTicks: [],
            filteredTicks: [],
            tickType: '',
        };
    }

    componentDidMount() {
        // TODO: 4/3/21 Refactor
        fetch("/ticks", {
            method: 'GET',
            credentials: 'include'
        })
            .then((response) => response.json())
            .then((json) => {
                this.setState( (prevState) => ({
                    ...prevState,
                    responseTicks: json,
                    filteredTicks: this.computeRelevantTicks(json,'Lead'),
                    tickType: 'Lead'
                }));
            }).catch((error) => {
            console.log(error);
        });
    }

    computeRelevantTicks(ticks, routeType) {
        let relevantTicks;
        if (routeType === 'Boulder') {
            relevantTicks = ticks.filter((tick) =>
                ((tick['route-type'] === routeType) && (tick['style'] !== "Attempt")));
        } else if (routeType === 'Lead') {
            relevantTicks = ticks.filter((tick) =>
                ((tick['style'] === "Lead") && (tick['lead-style'] !== "Fell/Hung")));
        }
        return relevantTicks.sort((a, b) => (b['rating-code']) - a['rating-code']);
    }

    updateTickType(routeType) {
        const { responseTicks } = this.state;
        const relevantTicks = this.computeRelevantTicks(responseTicks, routeType);
        this.setState((prevState) => (
            {
                ...prevState,
                filteredTicks: relevantTicks,
                tickType: routeType
            }
        ))
    }

    render() {
        const { filteredTicks, tickType } = this.state;
        return (
            <div>
                <button onClick={() => this.updateTickType('Lead')}>Show my rope sends!</button>
                <button onClick={() => this.updateTickType('Boulder')}>Show my boulder sends!</button>
                {
                    filteredTicks.length === 0 ?
                        false :
                        tickType === 'Lead' ?
                            <RopeSendsByGrade ticks={filteredTicks}/> :
                            <BoulderSendsByGrade ticks={filteredTicks}/>
                }
            </div>
        )
    }
}

ReactDOM.render(<TicksPage/>, document.getElementById('content'));
