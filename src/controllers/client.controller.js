// Mongo
const { Types } = require('mongoose');
var mongo = require('mongodb');
const mdb = require('../mongoDB/operations.js')
const collection = 'clients';


const index = async (req, res) => {

    if (req.path == '/empresa') {

        let data = new Promise((resolve, reject) => {
            mdb.find(async result => {
                resolve(result)
            }, 'empresa')
        });


        await data.then(async record => {
            if (record === null) {
                let errMsg = getErrorMessage('RES_ERRO_RECORD_NOT_FOUND');
                return Response.custom(res, { id }, errMsg.messageDetail, errMsg.message, errMsg.code, errMsg.status);
            }


            res.send({ status: "OK", data: record })
        }).catch(async err => {
            res.send({ err })
        })
    } else if (req.path == '/departamento') {
        let data = new Promise((resolve, reject) => {
            mdb.find(async result => {
                resolve(result)
            }, 'departamento')
        });


        await data.then(async record => {
            if (record === null) {
                let errMsg = getErrorMessage('RES_ERRO_RECORD_NOT_FOUND');
                return Response.custom(res, { id }, errMsg.messageDetail, errMsg.message, errMsg.code, errMsg.status);
            }


            res.send({ status: "OK", data: record })
        }).catch(async err => {
            res.send({ err })
        })
    } else if (req.path == '/empleado') {
        let data = new Promise((resolve, reject) => {
            mdb.find(async result => {
                resolve(result)
            }, 'empleado')
        });


        await data.then(async record => {
            if (record === null) {
                let errMsg = getErrorMessage('RES_ERRO_RECORD_NOT_FOUND');
                return Response.custom(res, { id }, errMsg.messageDetail, errMsg.message, errMsg.code, errMsg.status);
            }


            res.send({ status: "OK", data: record })
        }).catch(async err => {
            res.send({ err })
        })
    }


}
const show = async (req, res) => {
    const id = parseInt(req.params.id);
    const partes = req.path.split('/');
    const palabraClave = partes[1]; // La palabra clave estará en la segunda posición después de dividir por "/"
    if (palabraClave == 'departamento') {
        setTimeout(() => {

            let promise = new Promise(async (resolve, reject) => {
                await mdb.findOne(async result => {
                    resolve(result)
                }, 'departamento', { id: id })
            });
            promise.then(async record => {
                if (record === null) {
                    let errMsg = getErrorMessage('RES_ERRO_RECORD_NOT_FOUND');
                    return (res, { id }, errMsg.messageDetail, errMsg.message, errMsg.code, errMsg.status);
                }
                res.send({ status: "OK", data: record })
            }).catch(async err => {
                res.send({ err })
            })
        }, 1000)


    } else if (palabraClave == 'empleado') {
        let promise = new Promise((resolve, reject) => {
            mdb.findOne(async result => {
                resolve(result)
            }, 'empleado', { id: id })
        });


        await promise.then(async record => {
            if (record === null) {
                let errMsg = getErrorMessage('RES_ERRO_RECORD_NOT_FOUND');
                return (res, { id }, errMsg.messageDetail, errMsg.message, errMsg.code, errMsg.status);
            }


            res.send({ status: "OK", data: record })
        }).catch(async err => {
            res.send({ err })
        })
    }

}
const store = async (req, res) => {

    if (!req.body) {
        return res.status(400).send({ error: 'No se proporcionaron datos en el cuerpo de la solicitud.' });
    }

    console.log(req.body);

    if (req.path == '/empresa') {

        let createEmpresa = new Promise((resolve, reject) => {
            mdb.insert(async result => {
                resolve(result);
            }, 'empresa', req.body);
        });


        await createEmpresa.then(async rec => {
            res.send({ status: "OK", data: rec })
        }).catch(err => {
            res.send({ err })
        });
    } else if (req.path === '/departamento') {
        let count = new Promise((resolve, reject) => {
            mdb.find(async result => {
                resolve(result);
            }, 'departamento', {});
        });
        await count.then(async data => {
            if (data.length > 0) {

                const ultimoObjeto = data[data.length - 1];
                const ultimoId = ultimoObjeto ? ultimoObjeto.id : 0;
                const nuevoId = ultimoId + 1;
                req.body.id = nuevoId;
            } else {
                req.body.id = 1;
            }

        })

        let createEmpresa = new Promise((resolve, reject) => {
            mdb.insert(async result => {
                resolve(result);
            }, 'departamento', req.body);
        });



        await createEmpresa.then(async rec => {
            res.send({ status: "OK", data: rec })
        }).catch(err => {
            res.send({ err })
        });
    } else if (req.path === '/empleado') {
        let count = new Promise((resolve, reject) => {
            mdb.find(async result => {
                resolve(result);
            }, 'empleado', {});
        });
        await count.then(async data => {
            if (data.length > 0) {

                const ultimoObjeto = data[data.length - 1];
                const ultimoId = ultimoObjeto ? ultimoObjeto.id : 0;
                const nuevoId = ultimoId + 1;
                req.body.id = nuevoId;
            } else {
                req.body.id = 1;
            }

        })
        let createEmpresa = new Promise((resolve, reject) => {
            mdb.insert(async result => {
                resolve(result);
            }, 'empleado', req.body);
        });


        await createEmpresa.then(async rec => {
            res.send({ status: "OK", data: rec })
        }).catch(err => {
            res.send({ err })
        });
    }


}
const update = async (req, res) => {
    if (Object.keys(req.body).length == 0)
        return res.sent(res, ['Se requiere al menos un campo para actualizar']);

    const partes = req.path.split('/');
    const palabraClave = partes[1]; // La palabra clave estará en la segunda posición después de dividir por "/"
    if (palabraClave == 'empleado') {
        const id = parseInt(req.params.id);


        let data_contract = req.body;

        delete data_contract["_id"];


        let updateTicket = new Promise((resolve, reject) => {
            mdb.updateOne(async result => {
                resolve(result);
            }, 'empleado', { id:id }, data_contract);
        });


        await updateTicket.then(async rec => {
            res.send({ status: "OK", data: rec })
        }).catch(err => {
            res.send({ err })
        });
    }else if (palabraClave == 'departamento'){
        const id = parseInt(req.params.id);


        let data_contract = req.body;

        delete data_contract["_id"];


        let updateTicket = new Promise((resolve, reject) => {
            mdb.updateOne(async result => {
                resolve(result);
            }, 'departamento', { id:id }, data_contract);
        });


        await updateTicket.then(async rec => {
            res.send({ status: "OK", data: rec })
        }).catch(err => {
            res.send({ err })
        });
    }



}
const destroy = async (req, res) => {
    const id = parseInt(req.params.id);


    let promise = new Promise((resolve, reject) => {
        mdb.deleteOne(async result => {
            resolve(result)
        }, 'empleado', { id:id });
    });

    await promise.then(async record => {
        if (record === null) {
            let errMsg = getErrorMessage('RES_ERRO_RECORD_NOT_FOUND');
            return Response.custom(res, { id }, errMsg.messageDetail, errMsg.message, errMsg.code, errMsg.status);
        }


        res.send({ status: "OK", data: record })
    }).catch(async err => {
        res.send({ err })
    })
}

module.exports = {
    index,
    show,
    update,
    store,
    destroy
};


