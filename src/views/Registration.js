import React, {useContext} from 'react';
import ReactDOM from 'react-dom';
import {
  Form,
  Input,
  Button,
  Alert,
} from 'antd';
import { RegistryCtx } from '../stores/Registry';

const Registration = (props) => {
    const registry = useContext(RegistryCtx);
    const {connection} = registry;
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        const copy = Object.assign({}, values);
        delete copy.confirm
        try{
            const response = await connection.request({
                url: 'https://uchi-hack.herokuapp.com/user/create',
                params: [copy]
            });
            const json = await response.json();
            ReactDOM.render(
                <Alert
                    message="Успех!"
                    description="Регистрация прошла успешно"
                    type="success"
                    closable
                />, 
                document.getElementById('notification')
            );
        }
        catch (e){
            ReactDOM.render(
                <Alert
                    message="Упс :("
                    description="Что-то пошло не так"
                    type="error"
                    closable
                />, 
                document.getElementById('notification')
            );
        }
    };
    const layout = {
        labelCol: { span: 2 },
        wrapperCol: { span: 18 },
    };
    const tailLayout = {
        wrapperCol: { offset: 2, span: 18 },
    };
    return (
        <Form
            form={form}
            name="register"
            onFinish={onFinish}
            style={{padding: '1em'}}
            {...layout}
            scrollToFirstError
        >
            <Form.Item
                name="login"
                label="Логин"
                tooltip="По которому вы будете заходить на сайт"
                rules={[
                {
                    required: true,
                    message: 'Логин не может быть пустым',
                    whitespace: false,
                },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="name"
                label="Имя"
                tooltip="Отображаемое на платформе"
                rules={[
                {
                    required: true,
                    message: 'Имя не может быть пустым',
                    whitespace: false,
                },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="surname"
                label="Фамилия"
                tooltip="Отображаемая на платформе"
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="password"
                label="Пароль"
                rules={[
                {
                    required: true,
                    message: 'Please input your password!',
                },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Повтор пароля"
                dependencies={['password']}
                hasFeedback
                rules={[
                {
                    required: true,
                    message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                    }

                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                    },
                }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" className="register-form-button">
                Зарегистрироваться
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Registration;