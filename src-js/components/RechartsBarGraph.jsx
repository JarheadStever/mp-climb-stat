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
        const { data } = this.props;

        const counts = data.reduce(
            (acc, el) => {
                acc[el['rating-code']] = (acc[el['rating-code']] || 0) + 1;
                return acc;
            },
            {}
        );

        const ticks = Object.entries(counts)
            .map(([key, value]) => {
                return {ratingCode: key, count: value};
            });

        return(
            // TODO: Jared: 4/8/21 add className for CSS formatting if needed
            <ResponsiveContainer className={`RechartsBorder`}>
                <BarChart
                    data={ticks}
                    margin = {margins}
                >
                    <XAxis dataKey="ratingCode">
                        <Label
                            value='Rating Code'
                            position='insideBottom'
                            offset={-10}
                            style={{ textAnchor: 'middle' }}
                        />
                    </XAxis>
                    <YAxis width={40}>
                        <Label
                            value='Number of Ticks'
                            angle={-90}
                            position='insideLeft'
                            style={{ textAnchor: 'middle' }}
                        />
                    </YAxis>
                    <Tooltip />
                    <Bar dataKey="count" />
                </BarChart>
            </ResponsiveContainer>
        );
    }
}
