#!/bin/sh

cwebp -sharp_yuv -mt -m 6 -hint photo -near_lossless 80 prideful_poem.png -o prideful_poem.webp
cwebp -sharp_yuv -mt -m 6 -hint photo -near_lossless 50 cover.png -o cover.webp
cwebp -sharp_yuv -mt -m 6 -hint photo -q 80 cover.png -o cover_thumbnail.webp
