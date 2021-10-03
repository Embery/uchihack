import React from 'react';
import {
  Form,
  Input,
} from 'antd';

const Profile = (props) => {
    const {record} = props;
    const [form] = Form.useForm();
    const layout = {
        labelCol: { span: 2 },
        wrapperCol: { span: 18 },
    };
    form.setFieldsValue(record);
    return (
        <fieldset disabled>
        <Form
            form={form}
            name="profile"
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
        </Form>
        </fieldset>
    );
};

export default Profile;