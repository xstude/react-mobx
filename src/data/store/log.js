import { extendObservable } from 'mobx';
import format from '../../lib/format.js';

const hostApi = 'http://www.easy-mock.com/mock/596ccc11a1d30433d8359503/api';

class Log {
    constructor() {
        extendObservable(this, {
            filter: {
                provinceId: '-1',
                provinceName: '全部',
                provinceList: [],
                cityId: '',
                cityName: '',
                cityList: [],
                projectName: '',
                module: '-1',
                moduleText: '全部',
                moduleList: [
                    {
                      "key": -1,
                      "value": "全部"
                    },
                    {
                      "key": 0,
                      "value": "楼盘管理"
                    },
                    {
                      "key": 1,
                      "value": "spider数据校对"
                    },
                    {
                      "key": 2,
                      "value": "新建楼盘审核"
                    },
                    {
                      "key": 3,
                      "value": "楼盘信息审核"
                    },
                    {
                      "key": 4,
                      "value": "spider楼盘更新监控"
                    },
                    {
                      "key": 5,
                      "value": "楼盘点评审核"
                    },
                    {
                      "key": 6,
                      "value": "点评审核记录"
                    }
                ],
                operatorName: '',
                startTime: '',
                endTime: '',
                page: 0,
                pageSize: 10
            },
            table: {
                loading: false,
                list: []
            },
            page: {
                current: 1,
                total: 0
            }
        });
    }

    logGetCity(provinceItem) {
        let _this = this;
        fetch(hostApi + '/city/list?provinceId=' + provinceItem.key)
            .then(res => res.json())
            .then(data => {
                _this.filter.cityList = data.data;
                _this.filter.cityList.unshift({ cityId: -1, cityName: '全部' });
            })
            .catch(e => console.log(e));
    }

    logSearch(params) {
        let _this = this;

        let filter = Object.assign({}, _this.filter, params);

        let fn = function () {
            let qdata = {};
            if (!params || !params.page) {
                filter.page = 1;
            }
            qdata.page = filter.page;
            qdata.pageSize = filter.pageSize;
            if (filter.provinceName && filter.provinceName !== '全部') {
                qdata.provinceName = filter.provinceName;
            }
            if (filter.cityName && filter.cityName !== '全部') {
                qdata.cityName = filter.cityName;
            }
            if (filter.module && filter.module !== '-1') {
                qdata.module = filter.module;
            }
            if (filter.operatorName) {
                qdata.operatorName = filter.operatorName;
            }
            if (filter.projectName) {
                qdata.projectName = filter.projectName;
            }
            if (filter.startTime) {
                qdata.startTime = +new Date(filter.startTime);
            }
            if (filter.endTime) {
                qdata.endTime = +new Date(filter.endTime);
            }
            let querystring = require('querystring');
            return querystring.stringify(qdata);
        };

        let qs = fn();

        _this.table.loading = true;
        fetch(hostApi + '/record/list?' + qs)
            .then(res => res.json())
            .then(data => {
                let fn = function (mid) {
                    let mtext = '';
                    _this.filter.moduleList.forEach(item => {
                        if (item.key === mid) {
                            mtext = item.value;
                        }
                    });
                    return mtext;
                };
                try {
                    _this.page.total = data.data.total;
                    _this.page.current = filter.page;
                    _this.filter = filter;
                    _this.table.list = data.data.list.map(item => {
                        item.operateTime = format.dateToString(item.operateTime);
                        item.moduleText = fn(item.module);
                        return item;
                    });
                } catch(e) {
                    console.log('系统提示', '数据加载失败！');
                } finally {
                    _this.table.loading = false;
                }
            })
            .catch(e => console.log(e));
    }

    logInit() {
        let _this = this;
        fetch(hostApi + '/city/province')
            .then(res => res.json())
            .then(data => {
                _this.filter.provinceList = data.data;
                _this.filter.provinceList.unshift({ provinceId: -1, provinceName: '全部' });
                _this.logSearch();
            })
            .catch(e => console.log(e));
    }
}

export default new Log();
