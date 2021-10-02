import React, { useState } from 'react';
import { Form, Row, Col, Input, Button, DatePicker } from 'antd';

const QuestionsToolbar = (props) => {
    const {store} = props;
    const [form] = Form.useForm();
    const formSuccess = (values, store) => {
        Object.keys(values).forEach(key=>{
            if(key!=="similar") {
                if(values[key]) store.addFilter(key, values[key]);
                else store.removeFilter(key);
            }
        });
        if(!values.similar){
            store.actions.getQuestions();
        }
        else {
            //getExactQuestions()
        }
    }
    return (
        <Form
        form={form}
        name="filters"
        className="ant-advanced-search-form"
        onFinish={values => formSuccess(values, store)}
        >
        <Row gutter={24}>
            <Col span={2}>
                <Form.Item name="id" label="Номер">
                    <Input placeholder="№" />
                </Form.Item>
            </Col>
            <Col span={4}>
                <Form.Item name="name" label="Вопрос">
                    <Input placeholder="Вопрос" />
                </Form.Item>
            </Col>
            <Col span={3}>
                <Form.Item name="created_gt" label="Создан">
                    <DatePicker placeholder="Начало" />
                </Form.Item>
            </Col>
            <Col span={2}>
                <Form.Item name="created_lt">
                    <DatePicker placeholder="Конец" />
                </Form.Item>
            </Col>
            <Col span={3}>
                <Form.Item name="updated_gt" label="Обновлен">
                    <DatePicker placeholder="Начало" />
                </Form.Item>
            </Col>
            <Col span={3}>
                <Form.Item name="updated_lt">
                    <DatePicker placeholder="Конец" />
                </Form.Item>
            </Col>
            <Col span={7} style={{textAlign:'right'}}>
                <Button type="primary" htmlType="submit">
                    Искать
                </Button>
                <Button
                    style={{ margin: '0 8px' }}
                    onClick={() => {
                    form.resetFields();
                    form.submit();
                    }}
                >
                    Очистить фильтры
                </Button>
            </Col>
        </Row>
        </Form>
    );
}
export default QuestionsToolbar;