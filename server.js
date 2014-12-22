/**
 * Created by Milos on 11.12.2014..
 */

var net = require("net");
var fs = require("fs");
var _ = require("lodash");

const DELIMETER = "|";

var incomingData = '';
var message = [];                          // struktura za parsiranje
var container = [];                        // sadrzi dostupne klijente

var port = process.env.port || 1389;
var splitPossibleConversions = [];

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
            var firstSplit = message[1].split(':');
            var possibleConversions = firstSplit[0].split(',');
            //console.log(message[1]);

            switch (message[0]) {

                case "DJE_SI_GRGA_DRUZE_STARI":     // registrovanje kod servera za konverziju
                    if(container.length === 0) {
                        socket.write("No available servers for conversion.");
                        container.push(socket.remoteAddress + ':' + port + ':' + message[1] + "|");
                    }
                    else {

                        container.push(socket.remoteAddress + ':' + port + ':' + message[1] + "|");   // message[1] sadrzi moguce konverzije

                        console.log(container);
                        socket.write(container.toString());
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
