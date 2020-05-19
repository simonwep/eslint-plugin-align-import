const alignImport = require('./rules/align-import');
const trimImport = require('./rules/trim-import');

module.exports = {
    rules: {
        'align-import': alignImport,
        'trim-import': trimImport
    }
};
