package main

import "github.com/ddliu/go-httpclient"

func clientSetup() {
	httpclient.Defaults(httpclient.Map{
		httpclient.OPT_USERAGENT: "sail/hoist",
	})
}

func createApplication(instanceURL string) {
}
