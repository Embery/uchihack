import { io } from 'socket.io-client';

function Connection(){
    const self = {
        socket: null,
        init() {
            // TODO: вставить real url или переправить с сокетио на нативщину или на что-то еще
            self.socket = io('http://localhost:3001');
            return self;
        },
        /**
         * @param {object} config
         * @param {string} config.message
         * @param {object|string|number|boolean|null} config.data
         * @param {object} responseConfig
         * @param {boolean} responseConfig.needResponse
         * @param {string} responseConfig.responseMessage
         * @param {number} responseConfig.timeout
         */
        async request(config, responseConfig = {}){
            const {message, data} = config;
            const {
                needResponse, 
                responseMessage, 
                timeout
            } = responseConfig;
            self.send(message, data);
            if(needResponse){
                const response = await this.waitEvent(responseMessage, timeout);
                return response;
            }
            return true;
        },
        send(message, data){
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