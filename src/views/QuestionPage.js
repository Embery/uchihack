import { DatePicker, Form, Input, Select} from 'antd';
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
    const isMine = record.user_id === userInfo.user_id;
    const [form] = Form.useForm();
    form.setFieldsValue(removeEmptyDates(record));
    return (
        <fieldset disabled={!isMine}>
            <Form 
                form={form} 
                name="questions" 
                style={{padding: '1em'}}
                labelCol={{
                    span: 2,
                }}
                wrapperCol={{
                    span: 18,
                }}
            >
                <Form.Item label="Автор">
                    <span>
                        {`${record.user_name || ''} ${record.user_surname || ''}`}
                    </span>
                </Form.Item>
                <Form.Item name="name" label="Название" rules={[{ required: true }]}>
                    <Input/>
                </Form.Item>
                <Form.Item name="category_name" label="Тема" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Создан" style={{ marginBottom: 0 }}>
                    <Form.Item
                        style={{ display: 'inline-block', width: 'calc(50% - 40px)' }}
                        name="created"
                    >
                        <DatePicker disabled={!isMine}/>
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
                        <DatePicker disabled={!isMine}/>
                    </Form.Item>
                </Form.Item>
                <Form.Item name="body" label="Вопрос" rules={[{ required: true }]}>
                    <TextArea rows={10}/>
                </Form.Item>
            </Form>
        </fieldset>
    );
}

export default QuestionPage;