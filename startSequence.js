/**
 * Created by Milos on 20.12.2014..
 */
//var net = require("net");

/*var ipRegex = "/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)" +
              "\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)" +
              "\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)" +
              "\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/";*/

startSequence = function(serverAddress, number, conversions) {

    var conversion = {
        convertedNumber: number.toString(),
        conversionType: conversions.toString(),
        converterAddress: serverAddress.toString()
    };

    return conversion;
};

module.exports = startSequence;