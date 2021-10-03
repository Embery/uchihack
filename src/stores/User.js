import { action, extendObservable } from "mobx";

const User = (connection) => {
    const self = {
        nickname: null,
        isLoggedIn: false,
        setUserData: (data) => {
            self.actions.setAvatar(data.avatar || "https://via.placeholder.com/150");
            self.actions.setUserId(data.id);
            self.actions.setNickname(data.login);
            self.info = data;
        }
    }
    self.actions = {
        setNickname: action(nickname => self.nickname = nickname),
        setIsLoggedIn: action(value => self.isLoggedIn = value),
        setAvatar: action(avatar => self.avatar = avatar),
        setUserId: action(user_id => self.user_id = user_id),
        isLoggedIn: action(async ()=>{
            const response = await connection.request({
                params:[connection.getSession().split('=')[1]],
                url: 'https://uchi-hack.herokuapp.com/user/isLoggedIn'
            })
            const json = await response.json();
            const data = json.result;
            if(!json.success){
                throw new Error(data.error_message)
            }
            if(data.length){
                self.setUserData(data[0]);
                self.actions.setIsLoggedIn(true);
            }
        }),
        login: action(async (login, password)=>{
            const response = await connection.request({
                params:{
                    login, password
                },
                url: 'https://uchi-hack.herokuapp.com/user/login'
            })
            const json = await response.json();
            const data = json.result;
            if(!json.success){
                throw new Error(data.error_message)
            }
            connection.setSession(data.session_id);
            self.setUserData(data);
            self.actions.setIsLoggedIn(true);
        }),
        logout: action(async () => {
            const response = await connection.request({
                params:[""],
                url: 'https://uchi-hack.herokuapp.com/user/logout'
            })
            const json = await response.json();
            const data = json.result;
            if(!json.success){
                throw new Error(data.error_message)
            }
            connection.setSession('');
            self.setUserData({});
            self.actions.setIsLoggedIn(false);
        })
        
    }
    return extendObservable(self, { nickname: null, isLoggedIn: false });
}
export default User;