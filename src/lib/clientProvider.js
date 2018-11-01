import app from '../hoist.js'
import isInstance from './urlTest.js';



export default function getInstance(address) {
    return new Promise((resolve, reject) => {
            app.database.Instance.findOne({
                where: {address: address}
            }).then(instance => {
                if (instance === null) {
                    // Haven't met this instance, try and say hi

                    isInstance(address)
                    .then(isInst => {
                        if (!isInst) return reject("not an instance")
                        
                        request({
                            url: `http://${address}/api/v1/apps`,
                            method: "POST",
                            json: {
                                "client_name": "Sail App",
                                "redirect_uris": ["hoist.getsail.app/redirect"],
                                "scopes": "write read follow push",
                                "website": "http://getsail.app"
                            }
                        }, (error, response, body) => {
                            if (!error && response.statusCode == 200) {
                                let response = JSON.parse(body)
                                console.log(response)
                                let instance = app.database.Instance.build({
                                    address: address,
                                    clientID: response['client_id'],
                                    clientSecret: response['client_secret']
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