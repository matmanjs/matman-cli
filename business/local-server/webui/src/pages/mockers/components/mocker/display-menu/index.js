import React from 'react';
import { Icon, Menu } from 'antd';

import './index.less';

export default function MockerReadme(props) {

  return (
    <div className="mocker-menu">
      <Menu defaultSelectedKeys={['1']}>
        <Menu.Item key="1">Option 1</Menu.Item>
        <Menu.Item key="2">Option 2</Menu.Item>
      </Menu>
    </div>
  );
}
