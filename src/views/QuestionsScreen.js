import { Table, Button } from 'antd';
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
            dataIndex: 'name'
        },
        {
            title: 'Создан',
            dataIndex: 'created',
            render: value => {
                const date = new Date(value);
                return date.toLocaleString('ru');
            }

        },
        {
            title: 'Баллы',
            dataIndex: 'points'
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
            title={() => 'Вопросы'}
        />
    );
});
export default QuestionsScreen