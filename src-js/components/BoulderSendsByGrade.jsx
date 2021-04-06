import * as React from 'react';

export default class BoulderSendsByGrade extends React.PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        const {ticks} = this.props;
        const filteredTicks = ticks.filter((tick) =>
            ((tick['route-type'] === "Boulder") && (tick['style'] !== "Attempt")))
        filteredTicks.sort((a, b) => (a['rating-code'] < b['rating-code']) ? 1
            : (a['rating-code'] === b['rating-code']) ? ((a['route'] > b['route']) ? 1 : -1) : -1);
        return <div>
            <p>Jared's sorted boulder sends are:</p>
            {
                filteredTicks.map((tick, index) =>
                    (<div key={`${tick['route']}${index}`}> {tick['route']} {tick['rating']} </div>))
            }
        </div>;
    }
}
