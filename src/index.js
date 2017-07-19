require.ensure([], function (require) {
    require('./libs.js');
    require.ensure([], function (require) {
        require('./entry.js');
    }, 'entry');
}, 'libs');
