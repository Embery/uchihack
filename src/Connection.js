import { io } from 'socket.io-client';

function Connection(){
    const self = {
        socket: null,
        init() {
            // TODO: вставить real url или переправить с сокетио на нативщину или на что-то еще
            //self.socket = io('http://localhost:3001');
            return self;
        },
        /**
         * Если я допустила любой инжект чужого js-кода - у меня уже все плохо,
         * поэтому я не буду паранойить по поводу того, что сессия в ЛС хранится
         */
        getSession(){
            localStorage.getItem('session')
        },
        setSession(session){
            if(session.length){
                localStorage.setItem('session', session);
            } else {
                localStorage.removeItem('session');
            }
        },
        /**
         * @param {object} config
         * @param {object} responseConfig
         * @param {boolean} responseConfig.needResponse
         * @param {string} responseConfig.responseMessage
         * @param {number} responseConfig.timeout
         */
        async request(config, responseConfig = {}){
            const type = config.type || "http";
            const resultConfig = Object.assign({}, config, {session: self.getSession()});
            if(type === "http"){
                return self.httpRequest(resultConfig, responseConfig.timeout);
            } else {
                return self.wsRequest(resultConfig, responseConfig);
            }
        },
        async httpRequest(config, timeout){
            const configCopy = Object.assign({}, config);
            delete configCopy.url;
            return fetch(config.url, {method:'POST', body:JSON.stringify(configCopy||'')});
        },
        async wsRequest(config, responseConfig){
            const {message, data} = config;
            const {
                needResponse, 
                responseMessage, 
                timeout
            } = responseConfig;
            self.wsSend(message, data);
            if(needResponse){
                const response = await this.waitEvent(responseMessage, timeout);
                return response;
            }
            return true;
        },
        wsSend(message, data){
            if(!self.socket) throw new Error('Request sent before initialization finished!')
            self.socket.emit(message, data);
        },
        on(message, callback){
            self.socket.on(message, callback);
        },
        async waitEvent(message, timeout = 15000) {
            return new Promise((resolve, reject) => {
                const cb = (data) => {
                    resolve(data);
                }
                self.socket.on(message, cb);
                setTimeout(() => {
                    self.socket.off(message, cb);
                    reject("Time limit exceeded");
                }, timeout);
            })
        }
    };
    return self;
}

export default Connection;