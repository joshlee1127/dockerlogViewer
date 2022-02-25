function dockerComposeLog(containerName) {
    if (containerName === "all")
        return "docker-compose -f /data/eyeInTheSky/deployment/docker-compose.yml logs "
    return (
        "docker-compose -f /data/eyeInTheSky/deployment/docker-compose.yml logs " +
        containerName
    )
}

function dockerComposeRestart(containerName) {
    if (containerName === "all")
        return " sudo docker-compose -f /data/eyeInTheSky/deployment/docker-compose.yml down &&  sudo docker-compose -f /data/eyeInTheSky/deployment/docker-compose.yml up -d api dataextract syncdata "
    return (
        "sudo docker-compose -f /data/eyeInTheSky/deployment/docker-compose.yml restart " +
        containerName
    )
}
module.exports = { dockerComposeLog, dockerComposeRestart }
