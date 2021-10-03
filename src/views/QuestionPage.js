import { 
    DatePicker, Form, Input, TreeSelect, Button, Comment, Tooltip
} from 'antd';
import moment from 'moment';
import { observer } from "mobx-react";
import Answers from './Answers';
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
const QuestionPage = observer((props) => {
    const {record} = props;
    const registry = useContext(RegistryCtx);
    const userInfo = registry.getStore('user');
    const questions = registry.getStore('questions');
    const answers = registry.getStore('answers');

    const isMine = !record || (record.user_id === userInfo.user_id);
    if(record && record.id !== answers.question) {
        answers.addFilter('question_id', record.id)
    }
    const [form] = Form.useForm();
    const [answer] = Form.useForm();

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
        <div>
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
                {
                    (()=>{
                        if(!record) return (
                            <Form.Item wrapperCol={{ offset: 2, span: 18 }} className="question-form-footer-container">
                            <Button type="primary" htmlType="submit" className="question-form-button">
                                Задать вопрос
                            </Button>
                            </Form.Item>
                        )
                        if(isMine && record.status_name === 'Новый') return (
                            <Form.Item wrapperCol={{ offset: 2, span: 18 }} className="question-form-footer-container">
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
                            </Form.Item>
                        )
                    })()
                }
            </Form>
        </fieldset>
        {(()=>{
            if(record) return(
                <Form 
                    style={{padding: '1em'}}
                    labelCol={{
                        span: 2,
                    }}
                    wrapperCol={{
                        span: 18,
                    }}
                >
                    <Form.Item label="Ответы">
                        <Answers record={record} answers={answers}/>
                    </Form.Item>
                </Form>
            );
        })()}
        {(()=>{
            if(record && userInfo.user_id && record.status_name === "Новый"){
                return (
                    <Form
                        form={answer}
                        style={{padding: '1em'}}
                        labelCol={{
                            span: 2,
                        }}
                        wrapperCol={{
                            span: 18,
                        }}
                    >
                        <Form.Item name="body" label="Ответ">
                            <TextArea rows={5} />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" className="question-form-button"
                                onClick={async ()=>{
                                    const values = answer.getFieldsValue();
                                    values.question_id = record.id;
                                    values.user_id = userInfo.user_id;
                                    const result = await answers.actions.createAnswer(values);
                                    await answers.actions.getAnswers();
                                }}
                            >Ответить</Button>
                        </Form.Item>
                    </Form>
                )
            }
        })()}
        </div>
   );
});

export default QuestionPage;