babel src --presets=@babel/preset-env --out-dir lib
pkg --targets latest-linux-x86 --out-path dist/ ./lib/hoist.js