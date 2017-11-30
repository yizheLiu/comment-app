import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Comment from "./Comment";

class CommentList extends Component {
    static contextTypes = {
        store: PropTypes.object
    }
    static propTypes = {
        comments: PropTypes.array,
        onDeleteComment: PropTypes.func
    }
    static defaultProps = {
        comments: [],
    }

    constructor() {
        super()
        this.state = {themeColor: ''}
    }

    componentWillMount() {
        const {store} = this.context
        this._updateThemeColor()
        store.subscribe(()=>this._updateThemeColor())
    }

    handleDeletedComment(index) {
        if (this.props.onDeleteComment) {
            this.props.onDeleteComment(index);
        }
    }

    _updateThemeColor() {
        const {store} = this.context
        const state = store.getState()
        this.setState({themeColor: state.themeColor})
    }

    render() {
        return (
            <div style={{borderColor:this.state.themeColor}} className='comment-list'>
                {
                    this.props.comments.map((comment, i) => {
                        return (
                            <Comment
                                key={i}
                                comment={comment}
                                index={i}
                                onDeleteComment={this.handleDeletedComment.bind(this)}/>
                        )
                    })
                }
            </div>
        );
    }
}

export default CommentList;