import React from 'react';

import { Button, Card } from 'antd';
import { NavLink } from 'react-router-dom';

import './index.less';

export default function MockerListItem(props) {
  const { mockerItem, mockersPath, curTag, index, clickTag, setActive, setDisable } = props;
  const mockerItemConfig = mockerItem.config;

  return (

    <Card title={`${index + 1}. ${mockerItem.name}`} extra={<NavLink to={`${mockersPath}/${mockerItem.name}`}>
      更多...
    </NavLink>}>

      <div className="detail">
        <p>{mockerItemConfig.description}</p>
      </div>

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

      <br />
      <br />

      <Button.Group>
        {
          mockerItem.mockModuleList.map((item, index) => {
            return (
              <Button key={index}
                      className={item.name === mockerItemConfig.activeModule ? 'active' : ''}
                      icon={item.name === mockerItemConfig.activeModule ? 'check' : ''}
                      onClick={setActive.bind(this, mockerItem.name, item.name)}
              >
                {item.name}
              </Button>
            );
          })
        }
      </Button.Group>

    </Card>
  );
}

