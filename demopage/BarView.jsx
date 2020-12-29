import React, { Component } from 'react';

class BarView extends Component{
    constructor(props){
        super(props);
        this.state = {
            time:0
        }
    }
    componentDidMount(){
        setInterval(() => {
            this.setState({
                time:this.state.time+1
            })
        }, 1000);
    }
    render(){
        return (
            <div>
                我是BarView{this.state.time}
            </div>
        )
    }
}

export default BarView;