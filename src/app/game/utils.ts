export async function wait(timeout: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
}

export async function waitUntil(condition: Function) {
    while(!condition()) {
        await wait(100);
    }
}
