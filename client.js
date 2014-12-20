/**
 * Created by Milos on 16.12.2014..
 */
var readline = require("readline");
var clc = require("cli-color");
var _ = require("lodash");

var startSequence = require('./startSequence');
var regexContainer = require('./regexContainer');

var possibleConversionTypes = ["10.16", "16.10", "8.4", "4.8", "2.10", "10.2", "5.7", "7.5"];

var number;
var wantedConversion;
var serverAddress;

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
                if (regexContainer.numberRegex.test(message[1])) {
                    number = message[1];
                    console.log(clc.greenBright("Entered new number for conversion: " + clc.yellowBright(number) + '\n'));
                }
                else
                    console.log(clc.redBright("Not a supported number!"));
                break;

            case "conversions": // TODO: setup_conversions which sets up the conversions FOR THIS SERVER
                if(_.isUndefined(message[1])){   // TODO: include this in the above examples
                    console.log(clc.greenBright("Possible conversions to choose from: \n"));
                    console.log(clc.greenBright("1) 10 to 16\n"));
                    console.log(clc.greenBright("2) 16 to 10\n"));
                    console.log(clc.greenBright("3) 8 to 4\n"));
                    console.log(clc.greenBright("4) 4 to 8\n"));
                    console.log(clc.greenBright("5) 2 to 10\n"));
                    console.log(clc.greenBright("6) 10 to 2\n"));
                    console.log(clc.greenBright("7) 5 to 7\n"));
                    console.log(clc.greenBright("8) 7 to 5\n"));
                }
                else if(regexContainer.conversionRegex.test(message[1])) {
                    wantedConversion = possibleConversionTypes[message[1]];

                    var dismemberedConversion = wantedConversion.split('.');
                    console.log(clc.greenBright("Entered new conversion: " + clc.yellowBright(dismemberedConversion[0] + " to " + dismemberedConversion[1]) + '\n'));
                }
                else
                    console.log(clc.redBright("Not a valid conversion!"));
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

            default:            // TODO: multiple types of errors defined by a random variable
                console.log(clc.redBright("I'm sorry Dave, I'm afraid I can't do that.\n"));
                break;
        }
        rl.prompt();
    })

    .on("close", function() {
        console.log(clc.greenBright("Good bye!\n"));
        process.exit(0);
    });
