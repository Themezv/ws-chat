import React, {Component} from 'react';
import {Button, Input, InputGroup, InputGroupAddon, InputGroupButton} from 'reactstrap';


class RightPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            message: '',
        };
        this.sendHandler = this.sendHandler.bind(this);
    }

    sendHandler(){
        const {username, message} = this.state;
        if(username.length > 0 && message.length > 0){
            this.props.sendMessage({username, message})
        }
    }

    render() {
        return (
            <div>
                <InputGroup>
                    <InputGroupAddon>@</InputGroupAddon>
                    <Input onChange={(e) => {this.setState({username: e.target.value})}} placeholder="username"/>
                </InputGroup>
                <InputGroup>
                    <Input onChange={(e) => {this.setState({message: e.target.value})}} placeholder="text"/>
                    <InputGroupButton onClick={this.sendHandler} color="success">Отправить</InputGroupButton>
                </InputGroup>
            </div>
        );
    }
}

export default RightPanel;
