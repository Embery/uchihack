import { Form, Input, Button, Alert} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import React, {useContext} from 'react';
import ReactDOM from 'react-dom';
import { RegistryCtx } from '../stores/Registry';

const Login = () => {
    const registry = useContext(RegistryCtx);
    const user = registry.getStore('user');
    const page = registry.getStore('selectedPage')
    const onFinish = async (values) => {
        try{
            await user.actions.login(values.username, values.password);
            page.actions.setSelected('questions');
            ReactDOM.render(
                null, 
                document.getElementById('notification')
            );
        } 
        catch(e) {
            ReactDOM.render(
                <Alert
                    message="Упс :("
                    description={e.message}
                    type="error"
                    closable
                />, 
                document.getElementById('notification')
            );
        }
    };

    return (
        <Form
            name="normal_login"
            className="login-form"
            onFinish={onFinish}
        >
            <Form.Item
                name="username"
                rules={[{ required: true, message: 'Введите логин!' }]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Логин" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Введите пароль!' }]}
            >
                <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Пароль"
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Войти
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Login;