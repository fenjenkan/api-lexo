### MongoDB get data response API
Install mongodb-community
Install MongoDB Compass

### MongoDB user and auth
> use admin
> db.createUser({
    user: "Admin",
    pwd: "myNewPassword",
    roles: [{ role: 'root', db: 'admin' }]
})

Locate the following code in the mongod configuration file
->linux
    /etc/mongod.conf
->MacOS chip m1
    /opt/homebrew/etc/mongod.conf
->MacOS Intel Processor
    /usr/local/etc/mongod.conf

Change or add
security:
    authorization: "enabled"

Restart mongoDB
->Linux
    sudo service mongodb restart
->MacOS
    sudo brew services restart mongodb-community

### MongoDB get data response API
//Response on callback operation
try {
    MongoDB.find(function(result) {
        return Response.success(res, result);
    },"customers");
} catch (err) {
    return Response.success(res, err);
}

//Get result to var
let promise = new Promise((resolve, reject) => {
    MongoDB.find(async function(result) {
        resolve(result);
    },"customers", {name: "Nombre"},{ _id: 1});
});

let data = await promise.then(result => result);
return Response.success(res, result);
