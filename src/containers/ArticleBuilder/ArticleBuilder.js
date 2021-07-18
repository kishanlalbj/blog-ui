import {
  Breadcrumbs,
  Button,
  Container,
  FormControl,
  Grid,
  Link,
  Paper,
  Snackbar,
  TextField,
  Typography
} from '@material-ui/core';
import { Publish, Remove, Save } from '@material-ui/icons';
import axios from 'axios';
import * as Emoji from 'quill-emoji';
import 'quill-emoji/dist/quill-emoji.css';
import { useEffect, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import { connect } from 'react-redux';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { logoutUser } from '../../actions/auth/authActions';
import { API_BASE_URL } from '../../constants';
import './ArticleBuilder.scss';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';

Quill.register('modules/emoji', Emoji);
const Font = Quill.import('formats/font');
Font.whitelist = ['Monospace'];

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
  console.log(props);
  const { id } = useParams();

  const fetchArticle = async () => {
    let resp = await axios.get(`${API_BASE_URL}/articles/${id}`);
    let {
      articleTitle,
      articleSubtitle,
      articleContent,
      articleCategory
    } = resp.data;
    setArticleTitle(articleTitle);
    setArticleSubtitle(articleSubtitle);
    setArticleCategory(articleCategory);
    setArticleContent(articleContent);
  };

  useEffect(() => {
    if (props.mode === 'edit') fetchArticle(id);
  }, []);

  const [articleTitle, setArticleTitle] = useState('');
  const [articleSubtitle, setArticleSubtitle] = useState('');
  const [articleCategory, setArticleCategory] = useState('');
  const [articleContent, setArticleContent] = useState('');
  const [invalidFields, setInvalidFields] = useState(false);
  const [alert, setAlert] = useState({
    state: false,
    error: false,
    message: ''
  });
  const history = useHistory();

  const handleAlertClose = () => {
    setAlert({ state: false, error: false, message: '' });
  };

  const editArticle = async (headers, article) => {
    await axios.post(
      `${API_BASE_URL}/articles/update`,
      { id, ...article },
      headers
    );
  };

  const createNewArticle = async (headers, article) => {
    await axios.post(`${API_BASE_URL}/articles/add`, article, headers);
  };

  const handleAction = async (isDraft) => {
    if (articleTitle && articleSubtitle && articleCategory && articleContent) {
      const article = {
        articleTitle,
        articleSubtitle,
        articleCategory,
        articleContent,
        isPrivate: isDraft
      };

      try {
        let headers = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
          }
        };

        if (props.mode === 'edit') {
          editArticle(headers, article);
          history.push('/admin/drafts');
        } else {
          createNewArticle(headers, article);
          history.push('/admin');
        }

        setAlert({
          state: true,
          error: false,
          message: 'Article Saved successfully'
        });
      } catch (error) {
        setAlert({
          state: true,
          error: true,
          message: 'Unable to save article'
        });
      }
    } else {
      setInvalidFields(true);
    }
  };

  return (
    <div>
      <Container>
        {props.mode !== 'edit' ? (
          <Breadcrumbs>
            <Link button component={RouterLink} color='inherit' to='/admin/'>
              Articles
            </Link>
            <Link
              button
              component={RouterLink}
              color='inherit'
              to='/admin/articles/new'
            >
              New
            </Link>
          </Breadcrumbs>
        ) : (
          <Breadcrumbs>
            <Link button component={RouterLink} color='inherit' to='/admin/'>
              Drafts
            </Link>
            <Link
              button
              component={RouterLink}
              color='inherit'
              to={`/admin/drafts/edit/${id}`}
            >
              Edit
            </Link>
          </Breadcrumbs>
        )}
        <br></br>
        <Paper style={{ padding: '20px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Typography variant='h5'>
              {props.mode === 'edit' ? 'Edit ' : 'New '} Article
            </Typography>
            <div>
              <Button
                color='primary'
                variant='contained'
                onClick={() => handleAction(false)}
              >
                <Publish /> &nbsp; Publish
              </Button>
              &nbsp; &nbsp;
              <Button
                variant='outlined'
                color='secondary'
                onClick={() => handleAction(true)}
              >
                <Save></Save> &nbsp; Save
              </Button>
              &nbsp; &nbsp;
              <RouterLink to='/admin'>
                <Button color='warning' variant='outlined'>
                  <Remove /> &nbsp; Discard
                </Button>
              </RouterLink>
            </div>
          </div>
          <br></br>
          <form>
            <Grid container spacing={3}>
              <Grid item md={12}>
                <FormControl fullWidth>
                  <TextField
                    error={invalidFields}
                    required
                    placeholder='Title'
                    label='Title'
                    variant='outlined'
                    size='small'
                    onChange={(e) => setArticleTitle(e.target.value)}
                    value={articleTitle}
                  ></TextField>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    error={invalidFields}
                    required
                    placeholder='SubTitle'
                    label='SubTitle'
                    variant='outlined'
                    size='small'
                    onChange={(e) => setArticleSubtitle(e.target.value)}
                    value={articleSubtitle}
                  ></TextField>
                </FormControl>
              </Grid>

              <Grid item md={12}>
                <FormControl fullWidth>
                  <TextField
                    required
                    error={invalidFields}
                    placeholder='Category'
                    label='Category'
                    variant='outlined'
                    size='small'
                    onChange={(e) => setArticleCategory(e.target.value)}
                    value={articleCategory}
                  ></TextField>
                </FormControl>
              </Grid>

              <Grid item md={12}>
                <ReactQuill
                  value={articleContent}
                  onChange={(val) => setArticleContent(val)}
                  theme='snow'
                  modules={{
                    ...modules,
                    'emoji-toolbar': true,
                    'emoji-textarea': true,
                    'emoji-shortname': true
                  }}
                  formats={formats}
                  placeholder='Your Content Here'
                ></ReactQuill>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>

      <Snackbar
        open={alert.state}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        autoHideDuration={6000}
        onClose={handleAlertClose}
        message={alert.message}
      ></Snackbar>
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
