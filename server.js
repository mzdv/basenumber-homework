/**
 * Created by Milos on 11.12.2014..
 */

var net = require("net");
var fs = require("fs");
var _ = require("lodash");

const DELIMETER = "|";
var possibleConversionTypes = ["10 => 16", "16 => 10", "8 => 4", "4 => 8", "2 => 10", "10 => 2", "5 => 7", "7 => 5"];

var incomingData = '';
var message = [];                          // struktura za parsiranje
var container = [];                        // sadrzi dostupne klijente

var port = process.env.port || 1389;
var totalConversions = [];
var possibleServers = [];

net.createServer(function(socket) {
    socket.setEncoding("utf8");

    socket
        .on("data", function(data) {
            /*            if (data.toString() !== '~') {
             socket.write(data.toString());
             incomingData += data.toString();
             }

             else {*/
            console.log(data);
            message = data.split(DELIMETER);

            var possibleConversions = message[1].split(',');
            container.push("127.0.0.1:1389#0,1");
            container.push("127.0.0.1:1389#0,1");
            switch (message[0]) {

                case "DJE_SI_GRGA_DRUZE_STARI":     // registrovanje kod servera za konverziju; salje nazad moguce servere za zadatu konverziju

                    for(var i = 0; i < container.length; i++) {
                        var conversionsInElement = container[i].split('#');
                        totalConversions.push(conversionsInElement[1].split(','));
                    }

                    for(var i = 0; i < totalConversions.length; i++) {
                        if(_.contains(totalConversions[i], message[2])) {
                            var answer = {host: "", conversions: []};
                            answer.host = (container[i].split(':'))[0];
                            answer.conversions.push(((container[i].split('#'))[1]).split(','));

                            possibleServers.push(answer);
                        }
                    }

                    container.push(socket.remoteAddress + ':' + port + '#' + message[1]);   // message[1] sadrzi moguce konverzije

                    console.log(container);

                    if(!possibleServers.toString()) {
                        var jsonAnswer = JSON.stringify({error: "CRNA_MI_SE_DZIGERICA_SUSI"});
                        socket.write(jsonAnswer);
                    }
                    else {
                        var jsonAnswer = JSON.stringify(possibleServers);
                        socket.write(jsonAnswer);
                    }

                    break;

                case "VOZI_ME_ZA_SURCIN_PREKO_LEDINA":  // prijava o izvrsenoj konverziji
                    var acknowledgementMessage = socket.remoteAddress + '|' + message[1] + '|' + message[2] + '|' + message[3] + '|' + message[4] + message[5] + '\n';
                    // message[1] ip adresa servera za konverziju
                    // message[2] prvobitan broj
                    // message[3] konacan broj
                    // message[4] odabrana konverzija

                    fs.writeFile("conversions.log", acknowledgementMessage, function(err) {
                        if(err)
                            console.log(err.toString());
                        else
                            socket.write("TAMO_ZIVI_MOJA_JEDINA\n");
                    });
                    break;

                case "DUNI_VJETRE_MALO_PREKO_JETRE":    // gasenje veze
                    socket.end("UMRIJECU_OD_BOLA_UMRIJELO_SVE_OD_ALKOHOLA");
                    break;

                default:    // default case
                    socket.write("KUPI_STRIKA_CIPELE_I_DADE_DZEPARAC\n");
                    break;
            }

            incomingData = '';
            message = [];
            //}
        })

        .on("close", function() {
            socket.end();
        })

        .on("error", function(err) {
            console.log(err.toString());
        })

}).listen(port, '127.0.0.1');

console.log("Conversion tracker is operational at 127.0.0.1:1389.");
