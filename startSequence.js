/**
 * Created by Milos on 20.12.2014..
 */
var net = require("net");
var clc = require("cli-color");

var conversion;

startSequence = function (number, wantedConversion, conversionServer) {

    var client = net.connect({
        host: conversionServer,
        port: 1944
    }, function () {
        console.log(clc.greenBright("Sending to conversion server."));

        var payload = {
            number: number,
            conversion: wantedConversion
        };

        client.write(JSON.stringify(payload));
    });

    client.on("data", function (data) {
        conversion = data;

        var ack = net.connect({
            host: baseServer,
            port: 1389
        }, function () {
            var payload = {
                message: "VOZI_ME_ZA_SURCIN_PREKO_LEDINA",
                data: conversion,
                address: ack.localAddress,
                number: number,
                conversion: wantedConversion,
                convertedNumber: JSON.parse(conversion).convertedNumber
            };

            ack.write(JSON.stringify(payload));
        });
    });


    //var conversion = {
    //    convertedNumber: number.toString(),
    //    conversionType: wantedConversion.toString(),         // same here as below
    //    converterAddress: serverAddress.toString()      // this is a monkeypatch so I could test the program. This should return the converted server address
    //};

    return conversion;

};

module.exports = startSequence;