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
        </Row>
        <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">
                Search
            </Button>
            <Button
                style={{ margin: '0 8px' }}
                onClick={() => {
                form.resetFields();
                }}
            >
                Clear
            </Button>
            </Col>
        </Row>
        </Form>
    );
}
//import { Input, Form, InputNumber } from 'antd';

// const { Search } = Input;
// const searchHandler = (value, property, store) => {
//     if(value) store.addFilter(property, value);
//     else store.removeFilter(property);
//     store.actions.getQuestions();
// }

// const formSuccess = (values, store) => {
//     Object.keys(values).forEach(key=>{
//         if(key!=="similar") {
//             if(values[key]) store.addFilter(key, values[key]);
//             else store.removeFilter(key);
//         }
//     });
//     if(!values.similar){
//         store.actions.getQuestions();
//     }
//     else {
//         //getExactQuestions()
//     }
// }

// const QuestionsToolbar = (props) => {
//     const {store} = props;
//     return(
//         <Form
//             layout="inline"
//             onFinish={values=>formSuccess(values, store)}
//         >
//             <Form.Item>
//                 <Input
//                     placeholder="Название вопроса"
//                 />
//                 {/* <Search 
//                     placeholder="Название вопроса" 
//                     onSearch={(e) => searchHandler(e, 'name', store)} 
//                     enterButton 
//                 /> */}
//             </Form.Item>

//             <Form.Item
//                 rules={[
//                     {
//                         type: 'number',
//                         min: 0,
//                     },
//                 ]}
//             >
//                 <InputNumber 
//                     placeholder="#"
//                 />
//             </Form.Item>
//         </Form>
//     );
// }

export default QuestionsToolbar;