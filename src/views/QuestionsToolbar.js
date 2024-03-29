import React from 'react';
import { observer } from "mobx-react";
import { Form, Row, Col, Input, Button, DatePicker, TreeSelect, Checkbox, Collapse, Select } from 'antd';

const {Option} = Select;
const {Panel} = Collapse;
const QuestionsToolbar = observer((props) => {
    const {store, categoriesStore, uid} = props;
    const [form] = Form.useForm();
    const {isLoaded, isLoading, categories} = categoriesStore;
    const {getCategories} = categoriesStore.actions;
    if(!isLoaded && !isLoading) getCategories();
    const formSuccess = (values, store) => {
        store.clearFilters();
        Object.keys(values).forEach(key=>{
            switch (key){
                case "similar":
                    break;
                case "mine":
                    if(values[key]){
                        store.addFilter('user_id', uid);
                    }
                    break;
                default:
                    if(values[key]) store.addFilter(key, values[key]);
                    else store.removeFilter(key);
            }
        });
        if(!values.similar){
            store.actions.getQuestions();
        }
        else {
            //TODO - хранить страницу и pageSize в сторе чтобы вот этой дичи не было
            store.actions.getQuestions(1, 25, false);
        }
    }
    return (
        <Collapse>
            <Panel header="Фильтры">
                <Form
                    form={form}
                    name="filters"
                    className="ant-advanced-search-form"
                    onFinish={values => formSuccess(values, store)}
                    >
                        <Form.Item name="id" label="Номер">
                            <Input placeholder="№" />
                        </Form.Item>
                        <Form.Item name="name" label="Вопрос">
                            <Input placeholder="Вопрос" />
                        </Form.Item>
                        <Form.Item>
                            <Row>
                                <Col>
                                    <Form.Item name="similar" valuePropName="checked">
                                        <Checkbox >Похожие</Checkbox>
                                    </Form.Item>
                                </Col>
                                {(()=>{
                                    if(uid) return (
                                        <Col style={{margin:"0 0 0 1em"}}>
                                            <Form.Item name="mine" valuePropName="checked">
                                                <Checkbox >Мои</Checkbox>
                                            </Form.Item>
                                        </Col>
                                    )
                                })()}
                            </Row>
                        </Form.Item>
                        <Form.Item>
                            <Row>
                                <Col>
                                    <Form.Item name="created_gt" label="Создан">
                                        <DatePicker placeholder="Начало" />
                                    </Form.Item>
                                </Col>
                                <Col style={{margin:"0 0 0 1em"}}>
                                    <Form.Item name="created_lt">
                                        <DatePicker placeholder="Конец" />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item>
                            <Row>
                                <Col>
                                    <Form.Item name="updated_gt" label="Обновлен">
                                        <DatePicker placeholder="Начало" />
                                    </Form.Item>
                                </Col>
                                <Col style={{margin:"0 0 0 1em"}}>
                                    <Form.Item name="updated_lt">
                                        <DatePicker placeholder="Конец" />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item name="category_id" label="Тема">
                            <TreeSelect
                                style={{ width: '100%' }}
                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                treeData={categories}
                                placeholder="Тема"
                                treeDefaultExpandAll
                            />
                        </Form.Item>
                        <Form.Item label="Статус" name="status_id">
                            <Select>
                                <Option value={1}>Новый</Option>
                                <Option value={2}>Закрыт</Option>
                                <Option value={3}>Отклонен</Option>
                            </Select>
                        </Form.Item>
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
                </Form>
            </Panel>
        </Collapse>
    );
});
export default QuestionsToolbar;