import { 
    Comment, Tooltip
} from 'antd';
import { observer } from "mobx-react";
import moment from 'moment';
import React from 'react';

const Answers = observer((props) => {
    const {answers, record} = props;
    if(record && !answers.isLoaded && !answers.isLoading) {
        answers.actions.getAnswers();
    }
    return (
        answers.answers.map(elem => {
            return(
                <Comment
                    author={<b>{`${elem.user_name} ${elem.user_surname}`}</b>}
                    content={
                        <p>
                        {elem.body}
                        </p>
                    }
                    key={elem.id}
                    datetime={
                        <Tooltip title={moment(elem.created).format('YYYY-MM-DD HH:mm:ss')}>
                        <span>{moment(elem.created).fromNow()}</span>
                        </Tooltip>
                    }
                />
            )
        })
    )
})

export default Answers