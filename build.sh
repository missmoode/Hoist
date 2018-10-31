#!/bin/bash

go get -v ./...
mkdir target
cd target
gox -os="linux windows darwin" -arch="amd64 386"  -ldflags "-X main.Rev=`git rev-parse --short HEAD`" -verbose ../...;
