import { Menu } from 'antd';
import { observer } from "mobx-react";

const { SubMenu } = Menu;

const Header = observer(({store}) => {
    const pageStore = store.getStore('selectedPage');
    const userInfo = store.getStore('user');
    
    const keysForGuests = ['home', 'questions', 'login', 'register'];
    const keysForUsers = ['home', 'questions', 'avatar', 'profile',];
    const keys = userInfo.isLoggedIn ? keysForUsers : keysForGuests;
    const menuItems = {
        home: 
            <Menu.Item key="home">
                Домашняя страница
            </Menu.Item>,
        questions: 
            <Menu.Item key="questions">
                Вопросы
            </Menu.Item>,
        avatar: 
            <Menu.Item disabled="true"  style={{padding:0}} key="avatar">
                <img src={userInfo.avatar} alt="avatar" style={{maxWidth:'50px', maxHeight:'50px'}}/>
            </Menu.Item>,
        profile:
            <SubMenu key="SubMenu" title={userInfo.nickname} key="profile">
                <Menu.Item key="profileEdit">Редактировать профиль</Menu.Item>
                <Menu.Item key="exit">Выход</Menu.Item>
            </SubMenu>,
        login:
            <Menu.Item key="login">
                Логин
            </Menu.Item>,
        register:
            <Menu.Item key="register">
                Регистрация
            </Menu.Item>
    }
    const elems = [];
    keys.forEach(elem=>{
        elems.push(menuItems[elem]);
    })
    return (
        <header>
            <h1>МВО #25</h1>
            <Menu 
                onClick={(e)=>{
                    const key = e.key;
                    if(key === 'exit'){
                        userInfo.actions.logout();
                        return;
                    }
                    pageStore.actions.setSelected(e.key);
                }} 
                selectedKeys={[pageStore.selected]} 
                mode="horizontal"
                style={{display:'block', position:'sticky',top:'0',textAlign:'right'}}
            >
                {elems}
            </Menu>
        </header>
    )
});

export default Header;