import * as React from "react";

import BoulderSendsByGrade from "./BoulderSendsByGrade";
import MetricContainer from "./MetricContainer";
import RechartsBarGraph from "./RechartsBarGraph";
import RopeSendsByGrade from "./RopeSendsByGrade";


export default class TicksPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            responseTicks: [],
            filteredTicks: [],
            listHighToLow: true,
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
                    filteredTicks: this.sortRelevantTicks(
                        this.computeRelevantTicks(json,'Lead'),
                        'rating-code'),
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
                ((tick['route-type'] === routeType) && (tick['climb-style'] !== "Attempt")));
        } else if (routeType === 'Lead') {
            relevantTicks = ticks.filter((tick) =>
                ((tick['climb-style'] === "Lead") && (tick['lead-style'] !== "Fell/Hung")));
        }
        return relevantTicks;
    }

    sortRelevantTicks(ticks, metric, highToLow=false) {
        let copy = [...ticks];
        let sortedTicks;
        if (!highToLow) {
            sortedTicks = copy.sort((a, b) => (
                // sort by the metric
                ((a[metric] > b[metric]) - (a[metric] < b[metric]))
                // then by route name
                || ((a['route'] > b['route']) - (a['route'] < b['route']))
            ));
        } else {
            sortedTicks = copy.sort((a, b) => (
                ((a[metric] < b[metric]) - (a[metric] > b[metric]))
                || ((a['route'] > b['route']) - (a['route'] < b['route']))
            ));
        }
        return sortedTicks;
    }

    updateTickType(routeType) {
        const { responseTicks } = this.state;
        const relevantTicks = this.computeRelevantTicks(responseTicks, routeType);
        this.setState((prevState) => (
            {
                ...prevState,
                filteredTicks: this.sortRelevantTicks(relevantTicks, 'rating-code'),
                tickType: routeType
            }
        ))
    }

    invertListSort() {
        this.setState((prevState) => (
            {
                ...prevState,
                listHighToLow: !this.state.listHighToLow
            }
        ))
    }

    render() {
        const { filteredTicks, tickType } = this.state;
        return (
            <>
                <div>
                    <button onClick={() => this.updateTickType('Lead')}>Show my rope sends!</button>
                    <button onClick={() => this.updateTickType('Boulder')}>Show my boulder sends!</button>
                </div>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    maxWidth: 1920,
                    width: '100%',
                    margin: '0px auto',
                }}>
                    <MetricContainer size="sm">
                        <span>You, my friend, are tragically bad at rock climbing.</span>
                    </MetricContainer>
                    <MetricContainer size="sm">
                        <RechartsBarGraph data={filteredTicks} xAxisMetric="rating-code" />
                    </MetricContainer>
                    <MetricContainer size="sm">
                        <RechartsBarGraph data={filteredTicks} xAxisMetric="rating" />
                    </MetricContainer>
                    <MetricContainer size="sm">
                        <RechartsBarGraph data={filteredTicks} xAxisMetric="length" />
                    </MetricContainer>
                    <MetricContainer size="md">
                        <RechartsBarGraph data={filteredTicks} xAxisMetric="rating-code" />
                    </MetricContainer>
                    <MetricContainer size="md">
                        <RechartsBarGraph data={filteredTicks} xAxisMetric="rating" />
                    </MetricContainer>
                    <MetricContainer size="lg">
                        <RechartsBarGraph data={filteredTicks} xAxisMetric="rating" />
                    </MetricContainer>
                    <MetricContainer size="lg">
                        <RechartsBarGraph data={filteredTicks} xAxisMetric="rating-code" />
                    </MetricContainer>
                    <MetricContainer size="sm">
                        <span>I can also mix sm and md metrics</span>
                    </MetricContainer>
                    <MetricContainer size="md">
                        <RechartsBarGraph data={filteredTicks} xAxisMetric="length" />
                    </MetricContainer>
                    <MetricContainer size="sm">
                        <span>Ok I'm done</span>
                    </MetricContainer>
                </div>
                <div>
                    <button onClick={() => this.invertListSort()}>Invert sort</button>
                    {
                        filteredTicks.length === 0 ?
                            false :
                            tickType === 'Lead' ?
                                <RopeSendsByGrade ticks={
                                    this.sortRelevantTicks(
                                        filteredTicks,
                                        'rating-code',
                                        this.state.listHighToLow)
                                }/> :
                                <BoulderSendsByGrade ticks={
                                    this.sortRelevantTicks(filteredTicks,
                                        'rating-code',
                                        this.state.listHighToLow)
                                }/>
                    }
                </div>
            </>
        )
    }
}
