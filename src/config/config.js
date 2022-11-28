let config = {};

//config.wsBase = `${window.location.protocol === "https:" ? "wss://" : "ws://"}${window.location.host}`;
config.wsBase = "ws://192.168.200.61:2222";
//config.apiBase = `${window.location.protocol}//:${window.location.host}`;
config.apiBase="http://192.168.200.61:2222";
//config.url="http://192.168.0.107:2222";

/*if (window.location.host.includes('192.168.0.107')) {
    //to fix nginx web socket upgrade error
    config.wsBase = "ws://192.168.0.107:2222"
}
if (window.location.host.includes('127.0.0.1')) {
    //to fix nginx web socket upgrade error
    config.wsBase = "ws://192.168.0.107:2222"
}
if (window.location.host.includes('localhost')) {
    //to fix nginx web socket upgrade error
    config.wsBase = "ws://192.168.0.107:2222"
}*/

export default config;
