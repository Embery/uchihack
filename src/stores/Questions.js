import { action, extendObservable } from "mobx";

const Questions = (connection) => {
    const self = {
        isLoading: false,
        total: 0,
        questions: [],
        filters: {},
        currentPage: 1,
        pageSize: 25,
        addFilter(property, value){
            self.filters[property] = value;
        },
        removeFilter(property){
            if(self.filters[property]) delete self.filters[property];
        },
        actions: {
            setTotal: action(total=>self.total=total),
            setMessages: action(questions=>self.questions=questions),
            setLoading: action(isLoading => self.isLoading = isLoading),
            setIsLoaded: action(isLoaded => self.isLoaded = isLoaded),
            getQuestions: action(async (page = 1, pageSize = 25, exact=true) => {
                if(self.isLoading) return;
                self.actions.setLoading(true);
                self.currentPage = page;
                const requestConfig = {
                    url: `https://uchi-hack.herokuapp.com/question/${exact?'list':'similar'}`,
                    params: exact? {...self.filters} : [self.filters.name || '']
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