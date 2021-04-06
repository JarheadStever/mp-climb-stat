import * as React from 'react';
import PropTypes from 'prop-types';

import '../scss/MetricContainer.scss'

const supportedSizes = [ 'sm', 'md', 'lg' ];

export default class MetricContainer extends React.Component {

    constructor(props) {
        super(props);
        if (!supportedSizes.includes(this.props.size)) {
            throw `size ${this.props.size} is not supported, supported sizes are ${supportedSizes}`;
        }
    }

    render() {
        const { size, children } = this.props;
        return <div className={`MetricContainer-${size}`}>
            { children }
        </div>;
    }
}

MetricContainer.propTypes = {
    size: PropTypes.string
};