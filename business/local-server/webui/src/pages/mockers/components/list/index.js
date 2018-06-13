import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Button } from 'antd';

import { loadMockerList } from '../../data/data-mocker-list';
import ListItem from './list-item';

import './index.less';

class MockersList extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      curTag: '全部'
    };
  }

  componentDidMount() {
    this.props.loadMockerList();
  }

  getAllTags() {
    const { list } = this.props;

    let arr = [];

    list.forEach((item) => {
      arr = arr.concat(item.config.tags);
    });

    return _.uniq(arr);
  }

  getFilterList() {
    const { curTag } = this.state;
    const { list } = this.props;

    return list.filter(item => item.config.tags.indexOf(curTag) > -1);
  }

  handleClickTag = (tagName) => {
    this.setState({
      curTag: tagName
    });
  };

  render() {
    const { match } = this.props;
    const { curTag } = this.state;

    const tagList = this.getAllTags();
    const filterList = this.getFilterList();

    return (
      <div className="mockers">
        <div className="tag-wrapper">
          <Button.Group>
            {
              tagList.map((tagName, tagIndex) => {
                return <Button
                  key={tagIndex}
                  className={tagName === curTag ? 'active' : ''}
                  icon="tag"
                  onClick={this.handleClickTag.bind(this, tagName)}>{tagName}</Button>;
              })
            }
          </Button.Group>
        </div>
        <div className="list-wrapper">
          {
            filterList.map((item, index) => {
              return (
                <ListItem key={index}
                          index={index}
                          mockerItem={item}
                          mockersPath={match.url}
                          clickTag={this.handleClickTag}
                />
              );
            })
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { mockerListInfo } = state;

  return {
    isLoaded: mockerListInfo.isLoaded,
    list: mockerListInfo.list
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadMockerList() {
      return dispatch(loadMockerList());
    }

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MockersList);
