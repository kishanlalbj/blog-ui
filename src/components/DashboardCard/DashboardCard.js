import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DashboardCard = (props) => {
  const { icon, title, value, backgroundColor } = props;
  return (
    <div>
      <Card
        text='white'
        style={{
          backgroundColor
        }}
      >
        <Card.Body>
          <Row>
            <Col>
              <div>
                <FontAwesomeIcon icon={icon} size='4x'></FontAwesomeIcon>
              </div>

              <span className='metric-title'>{title}</span>
            </Col>
            <Col>
              <div
                style={{
                  marginTop: '25px'
                }}
              >
                <h1>{value}</h1>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DashboardCard;
