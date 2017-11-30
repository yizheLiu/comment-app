import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";

import wrapWithLoadData from "./wrapWithLoadData";
import {Provider} from "./react-redux";

class CommentApp extends Component {
    static propTypes = {
        data: PropTypes.any,
        saveData: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            comments: props.data || [],
            themeColor: 'black'
        }
    }


    handleDeleteComment(index) {
        console.log(index);
        const comments = this.state.comments;
        comments.splice(index, 1);
        this.setState({comments});
        this.props.saveData(comments);
    }


    handleSubmitComment(comment) {
        if (!comment) return;
        if (!comment.username) return alert('请输入用户名');
        if (!comment.content) return alert('请输入评论内容');
        const comments = this.state.comments;
        comments.push(comment);
        this.setState({comments});
        this.props.saveData(comments);
    }

    render() {
        return (
            <Provider store={store}>
                <div className='wrapper'>
                    <CommentInput
                        onSubmit={this.handleSubmitComment.bind(this)}/>
                    <CommentList
                        comments={this.state.comments}
                        onDeleteComment={this.handleDeleteComment.bind(this)}/>
                </div>
            </Provider>
        );
    }
}

CommentApp = wrapWithLoadData(CommentApp, 'comments')
export default CommentApp;

function createStore(reducer) {
    let state = null
    const listeners = []
    const subscribe = (listener) => listeners.push(listener)
    const getState = () => state
    const dispatch = (action) => {
        state = reducer(state, action)
        listeners.forEach((listener) => listener())
    }
    dispatch({})
    return {getState, dispatch, subscribe}
}

const themeReducer = (state, action) => {
    if (!state)
        return {
            themeColor: 'red'
        }
    switch (action.type) {
        case 'CHANGE_COLOR':
            return {...state, themeColor: action.themeColor}
        default:
            return state
    }
}

const store = createStore(themeReducer)



