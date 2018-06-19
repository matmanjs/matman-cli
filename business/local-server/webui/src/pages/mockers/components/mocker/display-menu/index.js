import React from 'react';
import { Menu } from 'antd';

import './index.less';

export default function MockerMenu(props) {
  let { mockerListInfo, match } = props;
  if (!mockerListInfo.isLoaded) {
    return null;
  }

  let { mockerName } = match.params;

  return (
    <div className="mocker-menu">
      <Menu defaultSelectedKeys={[mockerName]} selectedKeys={[mockerName]}>
        {
          mockerListInfo.list.map((item) => {
            return <Menu.Item key={item.name}>{item.name}</Menu.Item>;
          })
        }
      </Menu>
    </div>
  );
}
