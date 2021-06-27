import axios from 'axios';
import React, { Component } from 'react';
import {
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  Row
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { googleLogin, logoutUser } from '../../actions/auth/authActions';
import CommentForm from '../../components/CommentForm/CommentForm';
import Comments from '../../components/Comments/Comments';
import Footer from '../../components/Footer/Footer';
import FullArticle from '../../components/FullArticle/FullArticle';
import Header from '../../components/Header/Header';
import { API_BASE_URL } from '../../constants';

class Article extends Component {
  state = {
    articleTitle: '',
    articleSubtitle: '',
    articleContent: '',
    author: '',
    createdOn: '',
    comments: [],
    commentText: '',
    anchorEl: null
  };

  fetchArticle = async () => {
    let response = await axios.get(
      `${API_BASE_URL}/articles/${this.props.match.params?.articleId}`
    );

    this.setState({
      ...response.data
    });
  };

  onChangeHandler = (e) => this.setState({ [e.target.name]: e.target.value });

  clearCommentForm = () => {
    this.setState({
      commentText: ''
    });
  };

  confirmDeleteFeedback = (feedback) => {
    this.setState({
      confirmDelete: feedback
    });
  };

  onPostComment = async (e) => {
    e.preventDefault();
    let payload = {
      id: this.props.match.params?.articleId,
      commenterName: this.props.user?.name,
      commentText: this.state.commentText
    };

    await axios.post(`${API_BASE_URL}/articles/comment`, payload);
    this.fetchArticle();
    this.clearCommentForm();
  };

  componentDidMount = () => {
    window.scrollTo(0, 0);
    this.fetchArticle();
  };

  handleReplyToComment = async (commentId, replyObj) => {
    let payload = {
      articleId: this.props.match.params?.articleId,
      commentId: commentId,
      replyObj
    };
    await axios.post(`${API_BASE_URL}/articles/comment/reply`, payload);

    this.fetchArticle();
  };

  handleDeleteComment = async (commentId) => {
    let payload = {
      articleId: this.props.match.params?.articleId,
      commentId
    };

    await axios.delete(`${API_BASE_URL}/articles/comment/delete`, {
      data: payload,
      headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
    });

    this.fetchArticle();
  };

  handleGoogleResponse = (resp) => {
    this.props.handleGoogleLogin(resp.tokenId);
  };

  onLogout = () => {
    this.props.logout();
  };

  render() {
    const {
      articleTitle,
      articleSubtitle,
      articleContent,
      articleCategory,
      createdOn,
      comments,
      commentText
    } = this.state;
    const { isAuthenticated, user } = this.props;

    return (
      <div data-test='article-component'>
        <header>
          <Header
            onLogout={this.onLogout}
            isAuthenticated={isAuthenticated}
            user={user}
            handleGoogleResponse={this.handleGoogleResponse}
          ></Header>
        </header>
        <br></br>
        <article>
          <FullArticle
            articleCategory={articleCategory}
            articleContent={articleContent}
            articleSubtitle={articleSubtitle}
            articleTitle={articleTitle}
            createdOn={createdOn}
          ></FullArticle>
        </article>

        <Container>
          <hr></hr>
          <section>
            <h4>Comments</h4>
            <br></br>
            <div>
              {isAuthenticated ? (
                <CommentForm
                  user={user}
                  commentText={commentText}
                  onChangeHandler={this.onChangeHandler}
                  onPostComment={this.onPostComment}
                ></CommentForm>
              ) : (
                <p>Please login to comment</p>
              )}
            </div>
            {comments.length === 0 ? <p>No Comments yet</p> : null}

            {comments.length > 0
              ? comments.map((comment) => {
                  return (
                    <Comments
                      data-test='comments'
                      key={comment._id}
                      comment={comment}
                      replyToComment={this.handleReplyToComment}
                      deleteComment={this.handleDeleteComment}
                      user={user}
                      isAdmin={user?.role === 'admin' ? true : false}
                      isAuthenticated={isAuthenticated}
                    ></Comments>
                  );
                })
              : null}
          </section>
        </Container>
        <br></br>
        <br></br>
        <Footer data-test='article-footer'></Footer>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = (dispatch) => ({
  handleGoogleLogin: (tokenId) => dispatch(googleLogin(tokenId)),
  logout: () => dispatch(logoutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Article);
