import { DatePicker, Form, Input, TreeSelect, Button} from 'antd';
import moment from 'moment';
import React, {useContext} from 'react';
import { RegistryCtx } from "../stores/Registry";

const { TextArea } = Input;

const removeEmptyDates = (record) => {
    const copy = Object.assign({}, record);
    if(!copy.created) delete copy.created;
    else copy.created = moment(copy.created);
    if(!copy.updated) delete copy.updated;
    else copy.updated = moment(copy.updated);
    return copy;
}
const QuestionPage = (props) => {
    const {record} = props;
    const registry = useContext(RegistryCtx);
    const userInfo = registry.getStore('user');
    const questions = registry.getStore('questions');

    const isMine = !record || (record.user_id === userInfo.user_id);
    const [form] = Form.useForm();

    const categoriesStore = registry.getStore('categories');
    const {isLoaded, isLoading, categories} = categoriesStore;
    const {getCategories} = categoriesStore.actions;
    if(!isLoaded && !isLoading) getCategories();

    form.setFieldsValue(removeEmptyDates(record));

    const formSuccess = async (values) => {
        const copy = Object.assign({}, values);
        copy.user_id = userInfo.user_id;
        const result = await questions.actions.createQuestion(copy);
        questions.actions.getQuestions();
        form.setFieldsValue(result[0])
    }
    return (
        <fieldset disabled={!isMine}>
            <Form 
                form={form} 
                name="questions" 
                style={{padding: '1em'}}
                onFinish={values => formSuccess(values)}
                labelCol={{
                    span: 2,
                }}
                wrapperCol={{
                    span: 18,
                }}
            >
                {(() => {
                    if(record) return (
                    <Form.Item label="Автор">
                        <span>
                            {`${record.user_name || ''} ${record.user_surname || ''}`}
                        </span>
                    </Form.Item>)
                })()}
                <Form.Item name="name" label="Название" rules={[{ required: true }]}>
                    <Input/>
                </Form.Item>
                <Form.Item name="category_id" label="Тема">
                    <TreeSelect
                        style={{ width: '100%' }}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        treeData={categories}
                        placeholder="Тема"
                        treeDefaultExpandAll
                        disabled={!isMine}
                    />
                </Form.Item>
                <Form.Item label="Создан" style={{ marginBottom: 0 }}>
                    <Form.Item
                        style={{ display: 'inline-block', width: 'calc(50% - 40px)' }}
                        name="created"
                    >
                        <DatePicker disabled/>
                    </Form.Item>
                    <span
                        style={{ display: 'inline-block', width: '70px', lineHeight: '32px', textAlign: 'center' }}
                    >
                        Изменен: 
                    </span>
                    <Form.Item 
                        style={{ display: 'inline-block', width: 'calc(50% - 40px)' }}
                        name="updated"
                    >
                        <DatePicker disabled/>
                    </Form.Item>
                </Form.Item>
                <Form.Item name="body" label="Вопрос" rules={[{ required: true }]}>
                    <TextArea rows={10}/>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 2, span: 18 }} className="question-form-footer-container">
                {
                    (()=>{
                        if(!record) return (
                            <Button type="primary" htmlType="submit" className="question-form-button">
                                Задать вопрос
                            </Button>
                        )
                        if(isMine && record.status_name === 'Новый') return (
                            <div>
                                <Button type="primary" className="question-form-button"
                                    onClick={async ()=>{
                                        const values = form.getFieldsValue();
                                        values.id = record.id;
                                        const result = await questions.actions.setQuestionAnswered(values);
                                        questions.actions.getQuestions();
                                        form.setFieldsValue(result[0])
                                    }}
                                >
                                    Пометить отвеченным
                                </Button>
                                <Button className="question-form-button"
                                    onClick={async ()=>{
                                        const values = form.getFieldsValue();
                                        values.id = record.id;
                                        const result = await questions.actions.setQuestionClosed(values);
                                        questions.actions.getQuestions();
                                        form.setFieldsValue(result[0])
                                    }}
                                >
                                    Закрыть вопрос
                                </Button>
                            </div>
                        )
                    })()
                }
                </Form.Item>
            </Form>
        </fieldset>
    );
}

export default QuestionPage;