function dockerComposeLog(containerName) {
    return (
        "docker-compose -f /data/eyeInTheSky/deployment/docker-compose.yml logs " +
        containerName
    )
}
module.exports = { dockerComposeLog }
