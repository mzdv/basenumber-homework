<<<<<<< HEAD
bmk-over-tcp
===========
Application protocol based on the song "Grga taksista" from Baja Mali Knindza, commonly called as "Vozi me za Surcin"
or "Vozi me na Pale" extended with several other songs such as "Duni vjetre malo preko jetre" and "Bulevar Revolucije".

DISCLAIMER
==========
This was made as a joke, don't take it seriously. It's a good programming exercise to implement your own protocol.
I discovered a ton from it. And now for the fun parts:

Additional info
---------------

Repository contains the server implementation of the protocol in the form of a message storing server.

BMK protocol is used for transporting data, mostly textual, but binary is possible, via TCP using a form of additional
encapsulation.

The delimeter is the following sequence: `\/|\|\/`. Every command with multiple parameters must be followed by it for it
to be registered.

Every response from the server is given after a two second lag. This is a commonly requested feature by code reviewers
(aka my friends; they didn't want to submit a pull request).

The termination character for every request is the `~` (tilde) sign. Just add it as the last character of your request.

The protocol syntax is as follows:
----------------------------------

`DJE_SI_GRGA_DRUZE_STARI` - announces the existence to the server

`ZA_NAPLATU_TI_NE_MARI\/|\|\/[id]` - positive server response to the announcement with the given id; if it's taken, it assigns the next one

`IMA_JEDNA_KRCMA_STARA_TAMO_NASRED_BULEVARA` - request to list all client numbers

`BULEVARA_REVOLUCIJE\/|\|\/[idArray]` - server response with an array of id numbers`

`VOZI_ME_ZA_SURCIN_PREKO_LEDINA\/|\|\/[data]` - where [data] is the transmitting data from the client

`TAMO_ZIVI_MOJA_JEDINA` - server response to accepted data

`VREME_BRZO_PROLAZI` - checking if the server has gotten a timeout

`GODINE_ME_STIZU` - server response to a negative timeout

`DUNI_VJETRE_MALO_PREKO_JETRE` - request for the server to send the contents

`UMRIJECU_OD_BOLA_IZGORJELO_SVE_OD_ALKOHOLA\/|\|\/[messageBag]` - server response followed by the contents of the text

`KUPI_STRIKA_CIPELE_I_DADE_DZEPARAC` - server response to a malformed (or illegal) message

`RAKIJA_MI_SE_PRIBLIZILA_DUSI` - closes the connection

`CRNA_MI_SE_DZIGERICA_SUSI` - server response when it starts processing the closing operation

Usage
-----
Clone repo: `git clone https://github.com/mzdv/bmk-over-tcp.git`

Run with: `node bmkServer.js`

Use telnet or client of your choice and point it to `127.0.0.1:1389`


Have fun.

I do not own the rights to Baja Mali Knindza.

License
=======
MIT

=======
basenumber-homework
===================

Homework that uses a P2P architecture and a centralized server for converting numbers
>>>>>>> c81b622632b46b0f162940a2203bbe4c2de0ea6c
