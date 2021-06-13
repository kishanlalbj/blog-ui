import React, { useState } from 'react';
import {
  Container,
  Form,
  FormControl,
  FormLabel,
  Col,
  Button
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/auth/authActions';
import Header from '../../components/Header/Header';
import ReactQuill, { Quill } from 'react-quill';
import * as Emoji from 'quill-emoji';

import 'react-quill/dist/quill.snow.css';
import 'quill-emoji/dist/quill-emoji.css';
import './ArticleBuilder.scss';

Quill.register('modules/emoji', Emoji);
const Font = Quill.import('formats/font');
Font.whitelist = ['Monospace'];

// const Size = Quill.import('attributors/style/size');
// Size.whitelist = ['14px', '16px', '18px'];

Quill.register(Font, true);
// Quill.register(Size, true);

const modules = {
  toolbar: [
    [
      //   { size: ['14px', '16px', '18px'] },
      { font: [] },
      { header: [1, 2, false, 'Emojiss'] }
    ],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' }
    ],
    ['link', 'image'],
    ['clean'],
    ['emoji']
  ]
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'emoji'
];

const ArticleBuilder = (props) => {
  const { user, isAuthenticated, logout } = props;
  const [newarticle, setNewArticle] = useState({
    articleTitle: '',
    articleSubTitle: '',
    category: '',
    articleContent: 'Abaseas'
  });

  const handleEditorChange = (value) => {
    console.log(value);
    setNewArticle({
      ...newarticle,
      articleContent: value
    });
  };

  return (
    <div>
      <Header
        onLogout={logout}
        isAuthenticated={isAuthenticated}
        user={user}
      ></Header>

      <Container>
        <h2>Build Article</h2>

        <Form>
          <Form.Row>
            <Col>
              <FormLabel>Article Title</FormLabel>
              <FormControl placeholder='Article Title'></FormControl>
            </Col>

            <Col>
              <FormLabel>Article Subtitle</FormLabel>
              <FormControl placeholder='Article Title'></FormControl>
            </Col>
          </Form.Row>
          <br></br>
          <Form.Row>
            <Col md={6}>
              <FormLabel>Category</FormLabel>
              <FormControl as='select'>
                <option>Choose</option>
              </FormControl>
            </Col>
            <Col>
              <br></br>
              <button
                className='btn-custom'
                onClick={(e) => e.preventDefault()}
              >
                New Category
              </button>
            </Col>
          </Form.Row>
          <br></br>
          <Form.Row>
            <Col>
              <FormLabel>Content</FormLabel>

              <ReactQuill
                value={newarticle.articleContent}
                onChange={(e) => handleEditorChange(e)}
                theme='snow'
                style={{ height: '500px' }}
                modules={{
                  ...modules,
                  'emoji-toolbar': true,
                  'emoji-textarea': true,
                  'emoji-shortname': true
                }}
                formats={formats}
                placeholder='Your Content Here'
              ></ReactQuill>
            </Col>
          </Form.Row>
          <br></br>
          <br></br>
          <Form.Row>
            <Col>
              <Button>Publish</Button>
              <Button>Publish</Button>
              <Button>Publish</Button>
            </Col>
          </Form.Row>
        </Form>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  articles: state.articles.articles,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logoutUser())
});
export default connect(mapStateToProps, mapDispatchToProps)(ArticleBuilder);
