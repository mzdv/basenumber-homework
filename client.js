/**
 * Created by Milos on 16.12.2014..
 */
var readline = require('readline');
var clc = require('cli-color');
var startSequence = require('./startSequence');
var regexContainer = require('./regexContainer');

var number;
var conversions;
var serverAddress;

//var ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;


var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.setPrompt("READY_FOR_ACTION>");
rl.prompt();

rl
    .on("line", function(line) {
        var message = line.trim().toLowerCase().split(" ");

        switch(message[0]){
            case "hello":
                console.log(clc.greenBright("Hello there!\n"));
                break;

            case "server":
                if (regexContainer.ipRegex.test(message[1])) {
                    serverAddress = message[1];
                    console.log(clc.greenBright("Entered new base server address: " + clc.yellowBright(serverAddress) + '\n'));
                }
                else
                    console.log(clc.redBright("Not a valid IP address!"));
                break;

            case "number":
                number = message[1];
                console.log(clc.greenBright("Entered new number for conversion: " + clc.yellowBright(number) + '\n'));
                break;

            case "conversions":
                conversions = message[1];
                console.log(clc.greenBright("Entered available conversions: " + clc.yellowBright(conversions) + '\n'));
                break;

            case "quit":
                rl.close();
                break;

            case "start":
                var conversion = startSequence(serverAddress, number, conversions);

                console.log(clc.greenBright("Converted number is: ") + clc.blueBright(conversion.convertedNumber) + '\n' +
                            clc.greenBright("Original number was: ") + clc.blueBright(number) + '\n' +
                            clc.greenBright("Conversion was from base system to base system: ") + clc.blueBright(conversion.conversionType) + '\n' +
                            clc.greenBright("Conversion done at server: ") + clc.blueBright(conversion.converterAddress) + '\n');
                break;

            default:            // TO-DO: multiple types of errors defined by a random variable
                console.log(clc.redBright("I'm sorry Dave, I'm afraid I can't do that.\n"));
                break;
        }
        rl.prompt();
    })

    .on("close", function() {
        console.log(clc.greenBright("Good bye!\n"));
        process.exit(0);
    });
