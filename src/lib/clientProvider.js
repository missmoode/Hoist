import app from '../hoist.js'
import {isInstance, isHTTPS} from './urlTest.js';
import request from 'request'


export default function getInstance(address) {
    return new Promise((resolve, reject) => {
            app.database.Instance.findOne({
                where: {address: address}
            }).then(instance => {
                if (instance === null) {
                    // Haven't met this instance, try and say hi
                    return Promise.all([isInstance(address), isHTTPS(address)])
                    .then(values => {
                        if (!values[0]) return reject("not an instance")
                        
                        request.post({url: `${values[1] ? 'https' : 'http'}://${address}/api/v1/apps`, followAllRedirects: true, followOriginalHttpMethod: true, json: true, body: {
                            "client_name": "Sail App",
                            "redirect_uris": "https://hoist.getsail.app/authentication/authorize",
                            "scopes": "write read follow push",
                            "website": "http://getsail.app"
                       }}, (error, response, body) => {
                            if (!error && response.statusCode == 200) {
                                let instance = app.database.Instance.build({
                                    address: address,
                                    clientID: body['client_id'],
                                    clientSecret: body['client_secret']
                                })

                                instance.save()
                                .then(() => {
                                    return resolve(instance)
                                })
                                .catch(err => {
                                    return reject(err)
                                })
                            } else {
                                return reject(error)
                            }
                        })

                    })
                    .catch(error => {
                        return reject(error)
                    })
            
                } else {
                    resolve(instance)
                }
            }).catch(error => {
                reject(error)
            })
        })
}