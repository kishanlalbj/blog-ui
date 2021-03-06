import axios from 'axios';
import moment from 'moment';
import React, { Component } from 'react';
import {
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  Row,
  NavDropdown
} from 'react-bootstrap';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { googleLogin, logoutUser } from '../../actions/auth/authActions';
import Comments from '../../components/Comments/Comments';
import Footer from '../../components/Footer/Footer';
import { API_BASE_URL } from '../../constants';
class Article extends Component {
  state = {
    articleTitle: '',
    articleSubtitle: '',
    articleContent: '',
    author: '',
    createdOn: '',
    comments: [],
    commentText: ''
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
        <section>
          <div className='hero-container'>
            <Container
              style={{
                padding: '20px'
              }}
            >
              <div
                style={{
                  float: 'left'
                }}
              ></div>

              <div
                style={{
                  float: 'right'
                }}
              >
                {!this.props.isAuthenticated ? (
                  <GoogleLogin
                    clientId={process.env.REACT_APP_CLIENT_ID}
                    onSuccess={this.handleGoogleResponse}
                    onFailure={this.handleGoogleResponse}
                    buttonText='Login'
                    cookiePolicy='single_host_origin'
                  ></GoogleLogin>
                ) : (
                  <div>
                    <NavDropdown
                      alignRight
                      title={
                        <img
                          src={this.props.user?.avatar}
                          width='30'
                          height='30'
                          style={{ borderRadius: '99px' }}
                          alt='avatar'
                        ></img>
                      }
                      id='collasible-nav-dropdown'
                    >
                      {this.props.user.role === 'admin' ? (
                        <>
                          <NavDropdown.Item as={Link} to='/admin'>
                            Dashbord
                          </NavDropdown.Item>

                          <NavDropdown.Item>Profile</NavDropdown.Item>
                          <NavDropdown.Item>Drafts</NavDropdown.Item>
                          <NavDropdown.Divider />
                        </>
                      ) : null}
                      <NavDropdown.Item onClick={this.onLogout}>
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  </div>
                )}
              </div>
            </Container>
            <div className='logo-box'>
              <h1 data-test='article-title'>{articleTitle}</h1>
              <h4 data-test='article-subtitle'>{articleSubtitle}</h4>
              &nbsp;&nbsp;
              <span data-test='article-author'></span>
            </div>

            <div className='custom-shape-divider-bottom-1613237233'>
              <svg
                data-test='hero-svg'
                data-name='Layer 1'
                xmlns='https://www.w3.org/2000/svg'
                viewBox='0 0 1200 120'
                preserveAspectRatio='none'
              >
                <path
                  d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z'
                  opacity='.25'
                  className='shape-fill'
                ></path>
                <path
                  d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z'
                  opacity='.5'
                  className='shape-fill'
                ></path>
                <path
                  d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z'
                  className='shape-fill'
                ></path>
              </svg>
            </div>
          </div>
        </section>
        <br></br>
        <br></br>

        <Container>
          <article>
            <span data-test='article-createdOn'>
              <p className='chip'>{articleCategory}</p>
              &nbsp;&nbsp;&nbsp;
              <span
                style={{
                  color: '#b7b7b7'
                }}
              >
                {moment(createdOn).format('LL')}
              </span>
            </span>
            <div
              data-test='article-content'
              dangerouslySetInnerHTML={{ __html: articleContent }}
            ></div>
          </article>

          <hr></hr>
          <section>
            <h4>Comments</h4>
            <br></br>
            <div>
              {isAuthenticated ? (
                <Form>
                  <Row>
                    <Col md={{ span: 1 }}>
                      <img
                        src={user?.avatar}
                        style={{ borderRadius: '99px' }}
                        alt='avatar'
                        width='50'
                        height='50'
                        title={user?.name}
                      ></img>
                    </Col>
                    <Col md={{ span: 11, offset: 0 }}>
                      <FormGroup>
                        <FormControl
                          as='textarea'
                          cols={4}
                          rows={5}
                          name='commentText'
                          value={commentText}
                          onChange={this.onChangeHandler}
                          placeholder='Your Comment'
                        ></FormControl>
                      </FormGroup>
                      <FormGroup>
                        <button
                          className='btn-custom'
                          onClick={this.onPostComment}
                        >
                          Comment
                        </button>
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
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
