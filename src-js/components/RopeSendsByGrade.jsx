import * as React from 'react';


export default class RopeSendsByGrade extends React.PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        const { ticks } = this.props;
        return <div>
            <p>Jared's sorted rope sends are:</p>
            {
                ticks.map((tick, index) =>
                    (<div key={`${tick['route']}${index}`}> { tick['route'] } { tick['rating'] } </div>))
            }
        </div>;
    }
}
