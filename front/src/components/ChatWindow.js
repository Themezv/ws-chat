import React, {Component} from 'react';
import {Container, Row, Col, ListGroup, ListGroupItem} from 'reactstrap';
import RightPanel from './RightPanel';
import {connect} from 'react-redux';
import {appSelectors, appActions} from '../ducks/app';

class ChatWindow extends Component {
    render() {
        console.log('CHAT WINDOW', this.props);
        return (
            <Container fluid className="App">
                <header className="App-header">
                    <h1 className="App-title">Пример реализации чата на websocket</h1>
                    <span>{this.props.clientsCount}</span>
                </header>
                <Row>
                    <Col sm={12} md={6} className="text-left">
                        <ListGroup>
                        {this.props.messages && this.props.messages.map((message, index) =>
                            (
                                <ListGroupItem color="info">
                                    Автор: {message.username} <br/>
                                    Сообщение: {message.message}
                                </ListGroupItem>
                            )
                        )}
                        </ListGroup>
                    </Col>
                    <Col xs={12} sm={12} md={6}> <RightPanel sendMessage={this.props.sendMessage}/> </Col>
                </Row>
            </Container>
        );
    }
}

export default connect(state => ({
    clientsCount: appSelectors.selectClientsCount(state),
    messages: appSelectors.selectMessages(state),
}), {
    sendMessage: appActions.sendMessage,
})(ChatWindow);
