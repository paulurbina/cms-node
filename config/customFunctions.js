module.exports = {
    selectOptions: function(status, options) {
        return options.fn(this).replace(new RegExp('value=\"'+status+'\"'), '$selected="selected"');
    }
};