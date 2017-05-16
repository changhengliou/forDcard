import React, {Component} from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {connect, Provider} from 'react-redux';
import Logger from 'redux-logger';
import './index.css';
import {reducer, actionCreators} from './store.js';
import {List} from 'immutable';

class Todo extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        var msgStyle = this.props.hasFinished ? {textDecoration: 'line-through'} : {textDecoration: 'inherit'};
        return this.props.editable
            ? (
                <div style={{marginBottom: '6px'}}>
                    <input style={{verticalAlign: 'center'}}
                           type="checkbox" 
                           checked={this.props.hasFinished} 
                           onChange={()=>this.props.onCheckChange(this.props.index)}/>
                    <input className='msg'
                        type="text"
                        value={this.props.msg}
                        onChange={(e) => {this.props.onMsgChange(this.props.index, e.target.value)}}/>
                    <button
                        style={{width: '30%'}} 
                        className="btn btn-3-group btn_info"
                        onClick={() => this.props.onMsgConfirm(this.props.index)}>Confirm</button>
                </div>
            )
            : (
                <div style={{marginBottom: '6px'}}>
                    <input style={{verticalAlign: 'center'}}
                           type="checkbox" 
                           checked={this.props.hasFinished} 
                           onChange={()=>this.props.onCheckChange(this.props.index)}/>
                    <div style={{display: 'inline'}}>
                        <span className='msg'
                              style={msgStyle}
                              onClick={() => {this.props.onMsgClick(this.props.index)}}>
                            {this.props.msg}
                        </span>
                        <button style={{width: '30%'}} 
                            className='btn btn_danger'
                            onClick={()=>this.props.onDeleteClick(this.props.index)}>Delete</button>
                    </div>
                </div>
            );
    }
}

class ToDoApp extends Component {
    render() {
        var todo = this.props.todo;
        return (
            <div className='container'>
                <div>
                    <h3>Hello Dcard, sorry for late!</h3>
                    <p>Checkbox means todo has been already done, so you can clear that by adding clear</p>
                    <p>You can directly click todo text and modify the text inside.</p>
                    <p>For convenience, Redux logger is still at developer console, even if this is a production build version.</p>
                    <ul>
                        {todo.map((i) => {
                            return <li><Todo
                                index={i.index}
                                msg={i.msg}
                                editable={i.editable}
                                hasFinished={i.hasFinished}
                                onCheckChange={this.props.onCheckChange}
                                onMsgClick={this.props.onMsgClick}
                                onMsgChange={this.props.onMsgChange}
                                onMsgConfirm={this.props.onMsgConfirm}
                                onDeleteClick={this.props.onDeleteClick}/></li>
                        })}
                    </ul>
                </div>
                <div>
                    <button className='btn btn-2-group btn_info' onClick={()=>this.props.onAddClick()}>Add</button>
                    <button className='btn btn-2-group btn_default' onClick={()=>this.props.onClearClick()}>Clear</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {todo: state.todo};
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddClick: () => {
            dispatch(actionCreators.onAddClick());
        },
        onDeleteClick: (id) => {
            dispatch(actionCreators.onDeleteClick(id));
        },
        onClearClick:(id) => {
            dispatch(actionCreators.onClearClick(id));
        },
        onMsgClick: (id) => {
            dispatch(actionCreators.onMsgClick(id));
        },
        onMsgChange: (id, value) => {
            dispatch(actionCreators.onMsgChange(id, value));
        },
        onMsgConfirm: (id) => {
            dispatch(actionCreators.onMsgConfirm(id));
        },
        onCheckChange: (id) => {
            dispatch(actionCreators.onCheckChange(id));
        }
    };
}

const ReduxToDo = connect(mapStateToProps, mapDispatchToProps)(ToDoApp);

class App extends Component {
    render() {
        return (
            <Provider store={createStore(reducer, applyMiddleware(thunk, Logger))}>
                <ReduxToDo/>
            </Provider>
        );
    }
}

export default ToDoApp;

render(
    <App/>, document.getElementById('react-app'));
