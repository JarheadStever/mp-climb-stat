import * as React from 'react';
import BoulderSendsByGrade from "./BoulderSendsByGrade";
import RopeSendsByGrade from "./RopeSendsByGrade";
import MetricContainer from "./MetricContainer";
import SimpleMetric from "./SimpleMetric";


export default class TicksPage extends React.Component {

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
            })
            .catch((error) => {
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
            <>
                { filteredTicks.length !== 0 &&
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                        maxWidth: 1920,
                        width: '100%',
                        margin: '0px auto',
                    }}>
                        <MetricContainer size="sm">
                            <SimpleMetric
                                title="Hardest Grade"
                                subtitle={`The hardest ${tickType === 'Lead' ? 'lead' : 'bouldering'} grade you have sent`}
                                value={filteredTicks[0]['rating']}
                            />
                        </MetricContainer>
                        <MetricContainer size="sm">
                            <SimpleMetric
                                title="Number of Routes"
                                subtitle="The total number of routes that meet the selected filters"
                                value={filteredTicks.length.toString()}
                            />
                        </MetricContainer>
                        <MetricContainer size="sm">
                            <span>This is even more text</span>
                        </MetricContainer>
                        <MetricContainer size="sm">
                            <span>Ok I'll stop</span>
                        </MetricContainer>
                        <MetricContainer size="md">
                            <span>Look I'm medium sized</span>
                        </MetricContainer>
                        <MetricContainer size="md">
                            <span>Look I'm also medium sized</span>
                        </MetricContainer>
                        <MetricContainer size="lg">
                            <span>I'm large</span>
                        </MetricContainer>
                        <MetricContainer size="sm">
                            <span>I can also mix sm and md metrics</span>
                        </MetricContainer>
                        <MetricContainer size="md">
                            <span>I'm chonky</span>
                        </MetricContainer>
                        <MetricContainer size="sm">
                            <span>Ok I'm done</span>
                        </MetricContainer>
                    </div>
                }

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
            </>
        )
    }
}
