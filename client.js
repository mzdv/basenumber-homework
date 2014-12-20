/**
 * Created by Milos on 16.12.2014..
 */
var readline = require('readline');
var startSequence = require('startSequence');

var number;
var conversions;
var serverAddress;      // TO-DO: JSON implementation

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.setPrompt("READY_FOR_ACTION>");
rl.prompt();

rl
    .on("line", function(line) {

        switch(line.trim().toLowerCase()){
            case "hello":
                console.log("Hello there!");
                break;

            case "quit":
                rl.close();
                break;

            case "start":
                var conversion = startSequence(number, conversions, serverAddress);
                console.log("Converted number is: " + conversion.convertedNumber + '\n' +
                            "Original number was: " + number + '\n' +
                            "Conversion was from base system to base system: " + conversion.conversionType + '\n' +
                            "Conversion done at server: " + conversion.convertorAddress + '\n');
                break;

            default:            // TO-DO: multiple choice errors
                console.log("I'm afraid I can\'t do that Dave.");
                break;
        }
        rl.prompt();
    })

    .on("close", function() {
        console.log("Good bye!");
        process.exit(0);
    });
