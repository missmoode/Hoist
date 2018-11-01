import request from "request";

//TODO: Test ifHTTP or HTTPs

export function isInstance(address) {
    return new Promise((resolve, reject) => {
        request.get(`http://${address}/api/v1/instance/`)
        .on('response', response => {
            resolve(response.statusCode === 200)
        })
        .on('error', err => {
            reject(err)
        })
    })
}

export function isHTTPS(address) {
    return new Promise((resolve, reject) => {
        request.get(`http://${address}`, (err, response, body) => {
            if (err) return reject(err)
            resolve(response.request.uri.protocol === 'https:')
        })
    })
}