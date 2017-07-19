import React from 'react';
import { inject, observer } from 'mobx-react';
import { Table, Pagination, Button, Icon } from 'antd';

const { Column } = Table;

const LogTable = inject(stores => ({
    table: stores.logStore.table,
    page: stores.logStore.page,
    action: stores.logStore
 }))(observer(class LogTable extends React.Component {
    pageChange = (page, pageSize) => {
        this.props.action.logSearch({ page: page });
    }
    viewItem = (record) => {
        var modal = require('../ui/modal.js');
        modal.success('系统提示', `当前item的id为${record.id}！`);
    }
    render() {
        const { table, page } = this.props;
        table.list.map(item => item.key = item.id);
        return (
            <div className="log-table">
                <Table dataSource={table.list.slice()} bordered={true} pagination={false}
                    loading={table.loading} size="middle">
                    <Column title="操作时间" dataIndex="operateTime" />
                    <Column title="操作人" dataIndex="operatorName" />
                    <Column title="归属板块" dataIndex="moduleText" />
                    <Column title="楼盘名称" dataIndex="projectName" />
                    <Column title="省" dataIndex="provinceName" />
                    <Column title="市" dataIndex="cityName" />
                    <Column title="动作" dataIndex="operation" />
                    <Column title="操作" render={(record)=> {
                        return (
                            <Button onClick={this.viewItem.bind(this, record)}>
                                查看 <Icon type="double-right" />
                            </Button>
                        )
                        }}
                        />
                </Table>
                <div className="page">
                    <Pagination current={page.current} total={page.total} onChange={this.pageChange} />
                </div>
            </div>
        );
    }
}));

export default LogTable;
