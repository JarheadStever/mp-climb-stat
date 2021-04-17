import * as React from 'react';
import PropTypes from "prop-types";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend, ResponsiveContainer
} from "recharts";
import '../scss/RechartsGraph.scss'

// TODO: Jared: 4/9/21 add support for using graphType input
const supportedTypes = [ 'bar', 'line' ];
let groupedData = {};
//const noMargin = { top: 0, left: 0, right: 0, bottom: 0 };

export default class RechartsBarGraph extends React.Component {

    constructor(props) {
        super(props);
        if (!supportedTypes.includes(this.props.graphType)) {
            throw `type: ${this.props.graphType} not supported, valid types are ${supportedTypes}`;
        }
    }

    // sortStuff(theData) {
    //     for (const tick in theData) {
    //         const grade = tick['rating-code'];
    //         if (!(groupedData[grade])) {
    //             groupedData[grade] = [];
    //         }
    //         groupedData[grade].push(tick);
    //     }
    // }

    render() {
        // TODO: Jared: 4/9/21 add support for sorting via input
        const { graphType, data } = this.props;
        const newStuff = data.reduce(function(out, cur) {
                let r = cur['rating-code'];
                out.codes[r] = (out.codes[r] || 0) + 1;
                return out;
            }, {'codes':{}});
        console.log(newStuff);
        return(
            // TODO: Jared: 4/8/21 add className for CSS formatting if needed
            <ResponsiveContainer className={`RechartsBorder`}>
                <BarChart
                    //width={500}
                    //height={300}
                    data={newStuff.codes}
                    margin= {{ right: 10 }}
                >
                    <XAxis dataKey="codes" />
                    <YAxis width={40} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="codes or something" />
                </BarChart>
            </ResponsiveContainer>
        );
    }
}

RechartsBarGraph.propTypes = {
    graphType: PropTypes.string
};