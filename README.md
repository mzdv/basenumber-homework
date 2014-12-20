basenumber-homework
===================
Homework that uses P2P architecture and a centralized server for converting numbers between several base systems (10-16, 8-4, 2-10, 5-7 and vice versa).

Additional info
---------------

Written in Node.js and uses the [BMK protocol](https://github.com/mdv/bmk-over-tcp) as the transport protocol in a slightly modified state.

Made with love in Belgrade, Serbia.

Syntax
------
Make sure you have the variables `server`, `number`, `conversions` set before activating `start`

`server ipAddress` - logs the IP address of the tracking server
`number numberForConversion` - logs the number that is going to be converted
`conversions conversionString` - logs the construct containing the information which conversions can the server perform

The syntax is as follows: `from_to:to_from` where `from` determines the original base system and `to` determines the final system.

Multiple conversions are separated by the `:` symbol.

Example:

If you want your system to do conversions between base 10 and base 16 (and vice versa) plus do convertions between base 4 and base 6
(but not vice versa) you would do the following:

`1016:1610:46`

Usage
-----
- Clone repo: `git clone https://github.com/mzdv/bmk-over-tcp.git`

- Run server with: `node server.js`

- Run client with: `node client.js`

Have fun.

License
=======
MIT
