import React from "react";
import PropTypes from "prop-types";

import "../scss/SimpleMetric.scss"


export default class SimpleMetric extends React.PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        const { title, subtitle, value } = this.props;
        return <div>
            <div className="SimpleMetric-title">{title}</div>
            { subtitle && <div className="SimpleMetric-subtitle">{subtitle}</div> }
            <div className="SimpleMetric-value">{value}</div>
        </div>


    }
}

SimpleMetric.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    value: PropTypes.number.isRequired,
}
