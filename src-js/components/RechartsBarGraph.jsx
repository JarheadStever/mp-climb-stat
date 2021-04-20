import * as React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Label
} from "recharts";
import "../scss/RechartsGraph.scss"


// maybe move margins into <BarChart> later
const margins = { top: 0, left: 5, right: 10, bottom: 15 };

export default class RechartsBarGraph extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        // TODO: Jared: 4/9/21 add support for sorting by input parameters
        const { data, xAxisMetric } = this.props;
        //const xAxisDataKey = xAxisMetric.replace(/-./g, x=>x[1].toUpperCase());
        const xAxisLabel = xAxisMetric
            .split('-')
            .map(x => x[0].toUpperCase() + x.substr(1))
            .join(' ');

        const counts = data.reduce(
            (acc, el) => {
                acc[el[xAxisMetric]] = (acc[el[xAxisMetric]] || 0) + 1;
                return acc;
            },
            {}
        );

        const ticks = Object.entries(counts)
            .map(([key, value]) => {
                return {xKey: key, Number: value};
            });

        return(
            // TODO: Jared: 4/8/21 add className for CSS formatting if needed
            <ResponsiveContainer className={`RechartsBorder`}>
                <BarChart
                    data={ticks}
                    margin={margins}
                >
                    <XAxis dataKey="xKey">
                        <Label
                            value={xAxisLabel}
                            position='insideBottom'
                            offset={-10}
                            style={{ textAnchor: 'middle' }}
                        />
                    </XAxis>
                    <YAxis width={40}>
                        <Label
                            value='Number of Sends'
                            angle={-90}
                            position='insideLeft'
                            style={{ textAnchor: 'middle' }}
                        />
                    </YAxis>
                    <Tooltip label="xKey" labelFormatter={(x) => xAxisLabel + ": " + x} />
                    <Bar dataKey="Number" />
                </BarChart>
            </ResponsiveContainer>
        );
    }
}
