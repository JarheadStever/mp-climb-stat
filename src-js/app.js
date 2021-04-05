import * as React from 'react';
import * as ReactDOM from 'react-dom'
import BoulderSendsByGrade from "./components/BoulderSendsByGrade";
import RopeSendsByGrade from "./components/RopeSendsByGrade";

class TicksPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ticks: [],
            showBoulder: false,
            showRope: false
        };
        this.showBoulderSends = this.showBoulderSends.bind(this);
        this.showRopeSends = this.showRopeSends.bind(this);
    }

    componentDidMount() {
        // TODO: 4/3/21 Refactor
        fetch("/ticks", {
            method: 'GET',
            credentials: 'include'
        })
            .then((response) => response.json())
            .then((json) => {
                this.setState( (prevState) => ({ ...prevState, ticks: json }));
            }).catch((error) => {
                console.log(error);
            });
    }

    showBoulderSends() {
        this.setState((prevState) => ({ ...prevState, showBoulder: true, showRope: false }));
    }

    showRopeSends() {
        this.setState((prevState) => ({ ...prevState, showRope: true, showBoulder: false }));
    }

    render() {
        const { ticks } = this.state;
        return (
            <div>
                <button onClick={this.showRopeSends}>Show my rope sends!</button>
                <button onClick={this.showBoulderSends}>Show my boulder sends!</button>
                {this.state.showRope && <RopeSendsByGrade ticks={ticks}/>}
                {this.state.showBoulder && <BoulderSendsByGrade ticks={ticks}/>}
            </div>
        )
        // return <RopeSendsByGrade ticks={ticks}/>;
    }
}

ReactDOM.render(<TicksPage/>, document.getElementById('content'));
