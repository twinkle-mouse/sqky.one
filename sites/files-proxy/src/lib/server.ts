const fileServers = ["files1.sqky.one", "files2.sqky.one"] as const;
type FileServer = (typeof fileServers)[number];

let currentServer: FileServer | undefined = undefined;
let lastCheck = new Date(0);

export async function getCurrentServer() {
    if (currentServer) {
        const currDate = new Date();
        const diff = currDate.getTime() - lastCheck.getTime();
        if (diff > 1000 * 60 * 5) {
            currentServer = undefined;
        }
        lastCheck = currDate;
    }

    if (currentServer) {
        return currentServer;
    }

    for (const server of fileServers) {
        try {
            const response = await fetch(`http://${server}`, { method: "OPTIONS", signal: AbortSignal.timeout(1000) });
            if (response.ok || response.redirected) {
                currentServer = server;
                break;
            }
        } catch {
            // pass
        }
    }

    return currentServer;
}
