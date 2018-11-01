import request from "request";

export default function isInstance(address) {
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