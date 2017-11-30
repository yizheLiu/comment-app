import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Comment from "./Comment";
import {connect} from "./react-redux";

class CommentList extends Component {

    static propTypes = {
        comments: PropTypes.array,
        onDeleteComment: PropTypes.func,
        themeColor: PropTypes.string
    }

    static defaultProps = {
        comments: [],
        themeColor: ''
    }

    constructor() {
        super()
        this.state = {themeColor: ''}
    }

    handleDeletedComment(index) {
        if (this.props.onDeleteComment) {
            this.props.onDeleteComment(index);
        }
    }


    render() {
        return (
            <div style={{borderColor: this.props.themeColor}} className='comment-list'>
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

const mapStatePros = (state) => {
    return {themeColor: state.themeColor }
}
CommentList = connect(mapStatePros)(CommentList)
export default CommentList;