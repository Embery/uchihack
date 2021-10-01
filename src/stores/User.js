import { action, extendObservable } from "mobx";

const User = (connection) => {
    const self = {
        nickname: null,
        isLoggedIn: false,
    }
    self.actions = {
        setNickname: action(nickname => self.nickname = nickname),
        setIsLoggedIn: action(value => self.isLoggedIn = value),
        setAvatar: action(avatar => self.avatar = avatar),
        login: action(async (login, password)=>{
            /**
             * вот это вообще плохо, что в незашифрованном виде кидается, но ведь
             * будет https же да?
             */
            // const response = await connection.request({message:'login', data: {login, password}}, {
            //     needResponse: true,
            //     responseMessage: 'login'
            // })
            const response = {
                nickname: 'Ололоша',
                session: 'asdasd',
                avatar: "https://via.placeholder.com/150"
            };
            connection.setSession(response.session);
            self.actions.setAvatar(response.avatar);
            self.actions.setNickname(response.nickname);
            self.actions.setIsLoggedIn(true);
        }),
        logout: action(async () => {
            // const response = await connection.request({message:'logout', data: {session:self.getSession()}}, {
            //     needResponse: true,
            //     responseMessage: 'login'
            // });
            connection.setSession('');
            self.actions.setNickname(null);
            self.actions.setIsLoggedIn(false);
        })
        
    }
    return extendObservable(self, { nickname: null, isLoggedIn: false });
}
export default User;