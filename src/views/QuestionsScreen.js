import { Table, Button} from 'antd';
import QuestionsToolbar from './QuestionsToolbar';
import { observer } from "mobx-react";
import React, {useContext, useState} from 'react';
import { RegistryCtx } from "../stores/Registry";

const QuestionsScreen = observer(props => {
    const registry = useContext(RegistryCtx);
    const questionsStore = registry.getStore('questions');
    const categories = registry.getStore('categories');
    const {questions, total, isLoading, isLoaded} = questionsStore;
    const [page, setPage] = useState(1);
    const uid = registry.getStore('user').user_id;
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
            title: 'Статус',
            dataIndex: 'status_name',
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
                        registry.getStore('selectedPage').actions.setSelected('question', {record})
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
                    Обновить
                </Button>
            }
            title={() => <div>
                <h2>Вопросы
                {(()=>{
                    if(uid){
                        return (
                            <Button type="primary"
                                style={{ margin: '0 16px' }}
                                onClick={() => {
                                    registry.getStore('selectedPage').actions.setSelected('question')
                                }}
                            >
                                Добавить
                            </Button>
                        )
                    }
                })()}
                </h2>
                <QuestionsToolbar store={questionsStore} categoriesStore={categories} uid={uid} />
            </div>}
        />
    );
});
export default QuestionsScreen