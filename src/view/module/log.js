import React from 'react';
import { inject, observer } from 'mobx-react';
import LogFilter from './logFilter.js'
import LogTable from './logTable.js'
import '../css/log.css';

const Log = inject(stores => ({
    action: stores.logStore
}))(observer(class Log extends React.Component {
    componentDidMount() {
        this.props.action.logInit();
    }

    render() {
        return (
            <div className="log">
                <LogFilter />
                <LogTable />
            </div>
        );
    }
}));

export default Log;
