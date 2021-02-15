import {
  faArrowAltCircleRight,
  faArrowAltCircleLeft
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Container, Row } from 'react-bootstrap';

import ArticlesList from '../../components/ArticlesList/ArticleList';
import Hero from '../../components/Hero/Hero';
import './Landing.scss';

const Landing = () => {
  const [articles] = useState([
    {
      articleTitle: 'The Reality',
      articleSubtitle: 'The boy who faced reality for first time',
      articleCategory: 'Life',
      createdOn: '123123213',
      articleContent: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
                It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`
    },
    {
      articleTitle: 'World is One',
      articleSubtitle: 'Citizens of the world',
      articleCategory: 'Travel',
      createdOn: '123123213',
      articleContent: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
                It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`
    },
    {
      articleTitle: 'Crushed Zoom',
      articleSubtitle: 'New age fashion',
      articleCategory: 'Fashion',
      createdOn: '123123213',
      articleContent: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
                It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`
    },
    {
      articleTitle: '96',
      articleSubtitle: 'Comeback lets see',
      articleCategory: 'Romance',
      createdOn: '123123213',
      articleContent: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`
    }
  ]);
  return (
    <div data-test='landing'>
      <Hero></Hero>
      <Container>
        <Row style={{ height: '100%' }}>
          <ArticlesList articles={articles}></ArticlesList>
        </Row>
        <div className='pagination-buttons'>
          <FontAwesomeIcon
            className='btn-icon'
            color={'#a11692'}
            icon={faArrowAltCircleLeft}
            size='2x'
          ></FontAwesomeIcon>

          <FontAwesomeIcon
            className='btn-icon'
            color={'#a11692'}
            icon={faArrowAltCircleRight}
            size='2x'
          ></FontAwesomeIcon>
        </div>
      </Container>
    </div>
  );
};

const mapStateFromProps = (state) => ({
  articles: state.articles
});

export default connect(mapStateFromProps, null)(Landing);
