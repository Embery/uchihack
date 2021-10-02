import React from 'react';
import { observer } from "mobx-react";
import { Form, Row, Col, Input, Button, DatePicker, TreeSelect } from 'antd';

const QuestionsToolbar = observer((props) => {
    const {store, categoriesStore} = props;
    const [form] = Form.useForm();
    const {isLoaded, isLoading, categories} = categoriesStore;
    const {getCategories} = categoriesStore.actions;
    if(!isLoaded && !isLoading) getCategories();
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
            <Col span={2}>
                <Form.Item name="updated_lt">
                    <DatePicker placeholder="Конец" />
                </Form.Item>
            </Col>
            <Col span={3}>
                <Form.Item name="category_id">
                    <TreeSelect
                        style={{ width: '100%' }}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        treeData={categories}
                        placeholder="Тема"
                        treeDefaultExpandAll
                    />
                </Form.Item>
            </Col>
            <Col span={5} style={{textAlign:'right'}}>
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
});
export default QuestionsToolbar;