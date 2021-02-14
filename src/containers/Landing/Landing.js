import {
  faArrowAltCircleRight,
  faArrowAltCircleLeft
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';

import ArticleList from '../../components/ArticlesList/ArticleList';
import Hero from '../../components/Hero/Hero';
import './Landing.scss';

const Landing = () => {
  const [articles] = useState([
    {
      title: 'The Reality',
      subtitle: 'The boy who faced reality for first time',
      tag: 'Life',
      createdOn: Date.now(),
      content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
                It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`
    },
    {
      title: 'World is One',
      subtitle: 'Citizens of the world',
      tag: 'Travel',
      createdOn: Date.now(),
      content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
                It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`
    },
    {
      title: 'Crushed Zoom',
      subtitle: 'New age fashion',
      tag: 'Fashion',
      createdOn: Date.now(),
      content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
                It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`
    },
    {
      title: '96',
      subtitle: 'Comeback lets see',
      tag: 'Romance',
      createdOn: Date.now(),
      content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
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
          <ArticleList articles={articles}></ArticleList>
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

export default Landing;
