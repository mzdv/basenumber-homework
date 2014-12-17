/**
 * Created by Milos on 11.12.2014..
 */

var net = require("net");
var mapMonad = require("mapMonad");

const DELIMETER = "\\/|\\|\\/"; //if you look closely, it spells out VNV, as in VNV Nation

var incomingData = '';
var message = [];                          //parsing structure
var valueContainer = [];                   //id holder
var keyContainer = [];

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

                switch (message[0]) {
                    case "DJE_SI_GRGA_DRUZE_STARI":     //registracija; korak 1
                        mapMonad(keyContainer, valueContainer, socket.remoteAddress);

                        socket.write("ZA_NAPLATU_TI_NE_MARI" + DELIMETER + valueContainer + "\n");  //odgovor mogucih klijenata; korak 2
                        break;

                    case "VOZI_ME_ZA_SURCIN_PREKO_LEDINA":      //gotova konverzija; korak 3
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
}).listen(1389);        //the only patriotic port in the world

console.log("Basenumber management server is operational.");
