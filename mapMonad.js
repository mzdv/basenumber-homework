/**
 * Created by Milos on 17.12.2014..
 */
var _ = require("lodash");

var mapMonad = function (keyContainer, valueContainer, value) {
    if(_.contains(valueContainer, value)) {
        var iterator = _.chain(valueContainer)
            .countBy()
            .pluck(value);

        container.push(value);
        idStore[_.lastIndexOf(container, value)] = iterator;
    }
    else {
        container.push(value);
        idStore[_.indexOf(container, value)] = 0;
    }
};

module.exports = mapMonad;