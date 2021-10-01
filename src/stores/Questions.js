import { action, extendObservable } from "mobx";

const Questions = (connection) => {
    const self = {
        isLoading: false,
        total: 0,
        questions: [],
        currentPage: 1,
        pageSize: 25,
        actions: {
            setTotal: action(total=>self.total=total),
            setMessages: action(questions=>self.questions=questions),
            setLoading: action(isLoading => self.isLoading = isLoading),
            setIsLoaded: action(isLoaded => self.isLoaded = isLoaded),
            getQuestions: action(async (page = 1, pageSize = 25, filters=[]) => {
                if(self.isLoading) return;
                self.actions.setLoading(true);
                self.currentPage = page;
                const requestConfig = {
                    url: 'https://uchi-hack.herokuapp.com/question/list',
                    body: {
                        pager: {
                            page, pageSize
                        },
                        filters
                    },
                    params: ""
                };
                
                const responseObject = await connection.request(requestConfig);
                const response = await responseObject.json();
                if(response.success){
                    const messages = response.result;
                    self.actions.setTotal(response.total);
                    self.actions.setMessages(messages);
                    self.actions.setIsLoaded(true);
                }
                self.actions.setIsLoaded(true);
                self.actions.setLoading(false);
            }),
        }
    };
    return extendObservable(self, { questions: [], isLoading: false, isLoaded: false, total: 0});
}
export default Questions;