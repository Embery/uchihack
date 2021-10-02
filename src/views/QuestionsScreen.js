import { Table, Button} from 'antd';
import QuestionsToolbar from './QuestionsToolbar';
import { observer } from "mobx-react";
import React, {useContext, useState} from 'react';
import { RegistryCtx } from "../stores/Registry";

const QuestionsScreen = observer(props => {
    const registry = useContext(RegistryCtx);
    const questionsStore = registry.getStore('questions');
    const {questions, total, isLoading, isLoaded} = questionsStore;
    const [page, setPage] = useState(1);
    const columns = [
        {
            title: '#',
            dataIndex: 'id',
        },
        {
            title: 'Название',
            dataIndex: 'name',
        },
        {
            title: 'Тема',
            dataIndex: 'category_name'
        },
        {
            title: 'Создан',
            dataIndex: 'created',
            render: value => {
                if(!value) return '';
                const date = new Date(value);
                return date.toLocaleString('ru');
            }
        },
        {
            title: 'Изменен',
            dataIndex: 'updated',
            render: value => {
                if(!value) return '';
                const date = new Date(value);
                return date.toLocaleString('ru');
            }
        },
        {
            title: 'Баллы',
            dataIndex: 'points'
        },
        {
            title: "Автор",
            dataIndex: "user_name",
            render: (value, record) => {
                return (value || '') + ' ' + (record.user_surname || '');
            }
        }
    ];
    const {getQuestions} = questionsStore.actions;
    if(!isLoaded && !isLoading) getQuestions();
    return (
        <Table 
            dataSource={questions} 
            columns={columns}
            size="middle"
            rowKey="id" 
            loading={isLoading}
            onRow={(record) => {
                return {
                    onClick: event => {
                        console.log(record);
                        debugger
                    }
                }
            }}
            pagination={
                {
                    position: ['none', 'bottomCenter'],  
                    defaultPageSize: 25, 
                    total,
                    showSizeChanger:false,
                    onChange: async (page, ...args) => {
                        setPage(page);
                        await questionsStore.actions.getQuestions(page);
                    }
                }
            }
            footer={() => 
                <Button onClick={async ()=>{
                    await questionsStore.actions.getQuestions(page);
                }}>
                    Refresh
                </Button>
            }
            title={() => <div>
                <h2>Вопросы</h2>
                <QuestionsToolbar store={questionsStore} />
            </div>}
        />
    );
});
export default QuestionsScreen