/**
 * Created by Milos on 11.12.2014..
 */

var net = require("net");
var mapMonad = require("mapMonad");

const DELIMETER = "|";

var incomingData = '';
var message = [];                          //parsing structure
var valueContainer = [];                   //id holder
var keyContainer = [];
var port = process.env.port || 1389;
var finishedConversions = [];

net.createServer(function(socket) {
    socket.setEncoding("utf8");

    socket
        .on("data", function(data) {
            if (data.toString() !== '~') {
                socket.write(data.toString());
                incomingData += data.toString();
            } else {
                message = incomingData.split(DELIMETER);
                id = Math.floor(Math.random() * 100);

                switch (message[0]) {       //message 1 ip adresa konvertora, message 2 prvobitan broj, message 3 konacan broj, message 4 odabrana konv
                    case "DJE_SI_GRGA_DRUZE_STARI":     //registracija; korak 1
                        mapMonad(keyContainer, valueContainer, socket.remoteAddress);   // dodati possible conversions; imas na forumu
                        socket.write("ZA_NAPLATU_TI_NE_MARI" + DELIMETER + valueContainer + "\n");  //odgovor mogucih klijenata; korak 2
                        break;

                    case "VOZI_ME_ZA_SURCIN_PREKO_LEDINA":          //gotova konverzija; korak 3
                        finishedConversions.push(socket.remoteAddress + '|' + message[1] + '|' + message[2] + '|' + message[3] + '|' + message[4] + '\n');
                        //ovo gore izmeni u write to file
                        socket.write("TAMO_ZIVI_MOJA_JEDINA\n");    //potvrda o primljenom kraju; ne mora, ali ajde; korak 4
                        break;

                    default:
                        socket.write("KUPI_STRIKA_CIPELE_I_DADE_DZEPARAC\n");
                        break;
                }
                incomingData = '';
                message = [];
            }
        })

        .on("close", function() {
            socket.destroy();
        })
        .on("error", function(error) {
            console.log(error.toString());
        })
}).listen(port);

console.log("Management server is operational.");
