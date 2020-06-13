import React from 'react';
import { Button, List, message } from 'antd';
import Panel from '../Panel';
import moment from 'moment';
import { connect } from 'dva';
import EventView from '@/components/EventView';
import styles from './index.less';

export default class EventList extends React.Component {
  onChange = (page) => {
    if (this.props.onChange) {
      this.props.onChange(page);
    }
  };

  render() {
    const { data, style = {} } = this.props;
    const { list, pagination } = data;
    return (
      <>
        <Panel title="" style={{ ...style }}>
          <List
            dataSource={list}
            split={false}
            style={{ marginLeft: '15px' }}
            pagination={{
              pageSize: pagination.pageSize,
              current: pagination.current,
              onChange: this.onChange,
              total: pagination.total,
            }}
            renderItem={(item) => {
              return (
                <List.Item className={styles.listItem}>
                  <div style={{ width: '100%' }}>
                    <EventView data={item} />
                    <div className={styles.date}>
                      {moment(item.create_time * 1000).fromNow()}{' '}
                      {moment(item.create_time * 1000).format('YYYY-MM-DD HH:mm:ss')}
                    </div>
                  </div>
                </List.Item>
              );
            }}
          />
        </Panel>
      </>
    );
  }
}
