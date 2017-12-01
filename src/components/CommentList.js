import React, {Component} from 'react';
import PropTypes from 'prop-types'
import Comment from "./Comment";

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

export default CommentList;