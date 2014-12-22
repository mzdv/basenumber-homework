/**
 * Created by Milos on 16.12.2014..
 */
var readline = require("readline");
var clc = require("cli-color");
var _ = require("lodash");
var net = require("net");

var startSequence = require('./startSequence');
var regexContainer = require('./regexContainer');

var possibleConversionTypes = ["10 => 16", "16 => 10", "8 => 4", "4 => 8", "2 => 10", "10 => 2", "5 => 7", "7 => 5"];

var serverAddress;
var number;
var wantedConversion;
var possibleConversions = [];
var conversionServer;

const DELIMETER = '|';

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    completer: function(line) {
        var completions = ["hello", "status", "base_server ", "address ", "number ", "wanted_conversion ", "possible_conversions ", "conversion_server", "quit", "start"];
        var hits = _.filter(completions, function(c) { return c.indexOf(line) == 0 });

        return [hits.length ? hits : completions, line];
    }
});

console.log(clc.greenBright("Remember to set the possible_conversions before everything else!"));

rl.setPrompt("READY_FOR_ACTION>");
rl.prompt();

rl
    .on("line", function(line) {


        var message = line.trim().toLowerCase().split(" ");

        switch(message[0]){

            case "hello":   // simple hello
                console.log(clc.greenBright("Hello there!\n"));
                break;

            case "status": // status of important variables
                console.log(clc.greenBright("Base server: ") + clc.yellowBright(serverAddress) + '\n');
                console.log(clc.greenBright("Number: ") + clc.yellowBright(number) + '\n');
                console.log(clc.greenBright("Wanted conversion: ") + clc.yellowBright(wantedConversion) + '\n');
                console.log(clc.blueBright("-------------------------------------------------------------") + '\n');
                console.log(clc.greenBright("Possible conversions: ") + clc.yellowBright(possibleConversions) + '\n');
                break;

            case "base_server": // sets the base server used for tracking
                if(_.isUndefined(message[1])) { // TODO: Extract into a function
                    console.log(clc.greenBright("IP address must be in IPv4 format (aaa.bbb.ccc.ddd). \n"));
                }
                else if (regexContainer.ipRegex.test(message[1])) {
                    serverAddress = message[1];
                    console.log(clc.greenBright("Entered new base server address: " + clc.yellowBright(serverAddress) + '\n'));
                }
                else
                    console.log(clc.redBright("Not a valid IP address!\n"));
                break;

            case "conversion_server": // sets the server used for converting data
                var client = net.connect({
                    host: serverAddress,
                    port: 1389
                }, function(){
                    console.log(clc.greenBright("Conection with the base server established. Stand by."));
                    client.write("DJE_SI_GRGA_DRUZE_STARI" + DELIMETER + possibleConversions);
                });

                client.on("data", function(data) {
                    //var servers = _.initial(data.toString().split('|'));
                    //
                    //console.log(servers);
                    //console.log(servers[0]);
                    //console.log(servers[1]);
                    //console.log(servers[2]);
                    client.end();
                });
                break;

            case "number":  // sets the number that is going to be converted
                if(_.isUndefined(message[1])) {
                    console.log(clc.greenBright("Number must be non-negative. \n"));
                }
                else if (regexContainer.numberRegex.test(message[1])) {
                    number = message[1];
                    console.log(clc.greenBright("Entered new number for conversion: " + clc.yellowBright(number) + '\n'));
                }
                else
                    console.log(clc.redBright("Not a supported number!\n"));
                break;

            case "wanted_conversion": // sets the conversion needed for the server
                if(_.isUndefined(message[1])) {
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

                    var dismemberedConversion = wantedConversion.split(' => ');
                    console.log(clc.greenBright("Entered new conversion: " + clc.yellowBright(dismemberedConversion[0] + " to " + dismemberedConversion[1]) + '\n'));
                }
                else
                    console.log(clc.redBright("Not a valid conversion choice!\n"));
                break;

            case "possible_conversions": // sets the possible conversions for the server
                if(_.isUndefined(message[1])) {
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
                else if(message[1] === "stop") {
                    // TODO: Sending of the array to the base server
                    // TODO: Starting of the conversion server
                    console.log(clc.greenBright("Sending conversions to the server."));
                }
                else if(regexContainer.conversionRegex.test(message[1])) {
                    possibleConversions.push(message[1]);

                    var conversionIndex = _.last(possibleConversions);
                    console.log(possibleConversions);
                    console.log(conversionIndex);

                    console.log(clc.greenBright("Entered new conversion: " + clc.yellowBright(possibleConversionTypes[conversionIndex]) + '\n'));
                    //
                    possibleConversions = _.uniq(possibleConversions);
                }
                else {
                    console.log(clc.redBright("Not a supported number!\n"));
                }
                break;

            case "quit":    // quits the application
                rl.close();
                break;

            case "start":   // starts the conversion process
                if(_.isUndefined(number) || _.isUndefined(wantedConversion) || _.isUndefined(possibleConversions) || _.isUndefined(conversionServer))
                    console.log(clc.redBright("Some parameters weren't assigned!"));
                else {
                var conversion = startSequence(number, wantedConversion, conversionServer);

                console.log(clc.greenBright("Converted number is: ") + clc.yellowBright(conversion.convertedNumber) + '\n' +
                clc.greenBright("Original number was: ") + clc.yellowBright(number) + '\n' +
                clc.greenBright("Conversion was from base system to base system: ") + clc.yellowBright(conversion.conversionType) + '\n' +
                clc.greenBright("Conversion done at server: ") + clc.yellowBright(conversion.converterAddress) + '\n');
                }
                break;

            default:
                console.log(clc.redBright("I'm sorry Dave, I'm afraid I can't do that.\n"));
                break;
        }
        rl.prompt();
    })

    .on("close", function() {
        console.log(clc.greenBright("Good bye!\n"));
        process.exit(0);
    });
