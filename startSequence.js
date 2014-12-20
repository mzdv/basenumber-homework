/**
 * Created by Milos on 20.12.2014..
 */
//var net = require("net");



startSequence = function(serverAddress, number, conversions) {

    var conversion = {
        convertedNumber: number.toString(),
        conversionType: conversions.toString(),         // same here as below
        converterAddress: serverAddress.toString()      // this is a monkeypatch so I could test the program. This should return the converted server address
    };

    return conversion;
};

module.exports = startSequence;