function dockerComposeLog(containerName) {
    if (containerName === "all")
        return "docker-compose -f /data/eyeInTheSky/deployment/docker-compose.yml logs "
    return (
        "docker-compose -f /data/eyeInTheSky/deployment/docker-compose.yml logs " +
        containerName
    )
}
module.exports = { dockerComposeLog }
