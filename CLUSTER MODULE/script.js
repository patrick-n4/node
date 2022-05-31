const cluster = require('cluster');
const os = require('os');
// console.log(os.cpus().length);
if (cluster.isMaster) {
    // console.log("Cluster is master")
    let cpuCount = os.cpus().length;

    for (let i = 1; i <= cpuCount; i++){
        cluster.fork();
    }
    cluster.on('exit', () => {
        cluster.fork();
    })
} else {
    require('./')
}