Hayam Seireg's Image Processing API

Scripts
Install: npm install
Run unit tests: npm run test
Start server: npm run start
Build: npm run build
Lint: npm run lint
Prettify: npm run prettify

Usage
The server will listen on http://localhost:3000/
Homepage is http://localhost:3000/

Endpoint to resize images
http://localhost:3000/api/images

Query arguments are:

filename: Available filenames are:
encenadaport
fjord
icelandwaterfall
palmtunnel
santamonica
width: numerical pixel value > 0
height: numerical pixel value > 0

http://localhost:3000/api/images?filename=fjord Will display the original fjord image.

http://localhost:3000/api/images?filename=fjord&width=200&height=200 Will scale the fjord image to 200 by 200 pixels and store the resulting image. On subsequent calls will serve the resized image instead of resizing the original again.
