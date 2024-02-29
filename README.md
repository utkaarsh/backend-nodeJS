# Backend Application for user authentication

To wrap code in existing screen isntead of a single super longf line select the line and type "alt + Z"

To copy the same line down below press "shift + alt + downArrow"

## import installations

for JWT- npm i jsonwebtoken
for Cookie parser -npm i cookie-parser
for Dot env -npm i dotenv

Create ACCESS/Refresh TOKEN using Node
in terminal type command $node

it consists of common core model called crypto
$ require('crypto').randomBytes(64).toString('hex')

## note

for JWT first thing that we need to pass in the jwt is the payload so we will use username object, you don't wann a pass in anything like password that will hurt your security because it is available to all
and the second thing that we need is our secret
and the third thing you will pass is timer object - expiresIn:"time" that will expire after a given timeOut

//30:00
