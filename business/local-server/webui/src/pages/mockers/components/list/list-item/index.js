import React from 'react';

import { Button, Card, Col, Row } from 'antd';
import { NavLink } from 'react-router-dom';

import './index.less';

export default function MockerListItem(props) {
  const { mockerItem, mockersPath, curTag, index, clickTag } = props;
  const mockerItemConfig = mockerItem.config;

  return (
    <Row>
      <Col span={24}>
        <Card title={`${index + 1}. ${mockerItem.name}`}>
          <Button.Group>
            {
              mockerItemConfig.tags.map((tagName, tagIndex) => {
                return (
                  <Button
                    key={tagIndex}
                    className={tagName === curTag ? 'active' : ''}
                    icon="tag"
                    onClick={clickTag.bind(this, tagName)}>

                    {tagName}

                  </Button>
                );
              })
            }
          </Button.Group>

          <div className="detail">
            <p>{mockerItemConfig.description}</p>
          </div>

          <NavLink to={`${mockersPath}/${mockerItem.name}`}>
            <Button type="primary"
                    size="large"
                    icon="tool">更多...</Button>
          </NavLink>
        </Card>
      </Col>
    </Row>
  );
}

