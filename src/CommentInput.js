import React, {Component} from 'react';
import PropTypes from 'prop-types';
import wrapWithLoadData from "./wrapWithLoadData";
import ThemeSwitch from "./ThemeSwitch";
import {connect} from "./react-redux";

class CommentInput extends Component {
    static contextTypes = {
        store: PropTypes.object
    }

    static propTypes = {
        onSubmit: PropTypes.func,
        data: PropTypes.any,
        saveData: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            username: props.data || [],
            content: '',
            themeColor: ''
        }
    }

    componentWillMount() {
        const {store} = this.context
        this._updateThemeColor()
        store.subscribe(() => this._updateThemeColor())
    }

    componentDidMount() {
        this.textarea.focus();
    }


    handleUsernameChange(event) {
        this.setState({
            username: event.target.value
        })
    }

    handleContentChange(event) {
        this.setState({
            content: event.target.value
        })
    }

    handleSubmit() {
        if (this.props.onSubmit) {
            const {username, content} = this.state;
            const createdTime = new Date().getTime();
            this.props.onSubmit({
                username, content, createdTime
            })
            this.setState({content: ''})
        }
    }

    handleUsernameBlur(event) {
        this.props.saveData(event.target.value)
    }

    _updateThemeColor() {
        const {store} = this.context
        const state = store.getState()
        this.setState({themeColor: state.themeColor})
    }

    render() {
        return (
            <div className='comment-input' style={{borderColor: this.state.themeColor}}>
                <div className='comment-field'>
                    <span className='comment-field-name'>用户名:</span>
                    <div className='comment-field-input'>
                        <input
                            onBlur={this.handleUsernameBlur.bind(this)}
                            value={this.state.username}
                            onChange={this.handleUsernameChange.bind(this)}/>
                    </div>
                </div>
                <div className='comment-field'>
                    <span className='comment-field-name'>评论内容:</span>
                    <div className='comment-field-input'>
                        <textarea
                            ref={(textarea) => this.textarea = textarea}
                            value={this.state.content}
                            onChange={this.handleContentChange.bind(this)}></textarea>
                    </div>
                </div>
                <div className='comment-field-button'>
                    <button onClick={this.handleSubmit.bind(this)}>发布</button>
                </div>
                <ThemeSwitch/>
            </div>
        )
    }
}

CommentInput = wrapWithLoadData(CommentInput, 'username');

export default CommentInput