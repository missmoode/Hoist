babel src --presets=@babel/preset-env --out-dir lib
pkg --targets latest-linux-x64 --out-path dist/ ./lib/hoist.js