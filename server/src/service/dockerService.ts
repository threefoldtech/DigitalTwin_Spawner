import {logger} from "../logger";
import Dockerode from "dockerode";


const docker = new Dockerode({socketPath: '/var/run/docker.sock'});

const image = 'jimbersoftware/chat:0.5';


export const initDocker = async () => {
    await docker.pull(image)
    const networks = await docker.listNetworks()
    if (!networks.find(n => n.Name === "chatnet")) {
        await docker.createNetwork({Name: 'chatnet'})
    }
}

export const spawnDocker = async (userId: string) => {
    const volumeName = `browser_storage${userId}`;


    try {
        await docker.createVolume({
            name: volumeName,
            labels: {'jimber': 'volume'}
        })
    } catch (e) {
        throw new Error('volumeError')
    }

    const options: Dockerode.ContainerCreateOptions = {
        Image: image,
        Tty: true,
        name: `${userId}-chat`,
        HostConfig: {
            AutoRemove: true,
            NetworkMode: 'chatnet',
            Binds: [`${volumeName}:/root/.local/share/browser/QtWebEngine/Default`],
        },
        Env: [`USER_ID=${userId}`],
    };
    try {
        const container = await docker.createContainer(options);
        await container.start()
    } catch (err) {
        logger.error('error', {err})
        throw err
        throw new Error('createError')
    }
};

export const fetchChatList = async () => {
    const containers: Dockerode.ContainerInfo[] = await docker.listContainers()
    return containers
        .map((container: Dockerode.ContainerInfo) => container?.Names[0])
        .filter(containerName => containerName.indexOf("-chat") !== -1)
        .map(n => n.replace('-chat', ''))
        .map(n => n.replace('/', ''))
        .map(n => n.trim() )
}
