import { action, extendObservable } from "mobx";

const Answers = (connection) => {
    const self = {
        isLoading: false,
        total: 0,
        answers: [],
        filters: {},
        question: 0,
        currentPage: 1,
        pageSize: 25,
        addFilter(property, value){
            self.filters[property] = value;
            if(property==="question_id"){
                self.actions.setQuestion(value);
                self.actions.setIsLoaded(false);
            }
        },
        removeFilter(property){
            if(self.filters[property]) delete self.filters[property];
        },
        actions: {
            setTotal: action(total=>self.total=total),
            setAnswers: action(answers=>self.answers=answers),
            setQuestion: action(question=>self.question=question),
            setLoading: action(isLoading => self.isLoading = isLoading),
            setIsLoaded: action(isLoaded => self.isLoaded = isLoaded),
            getAnswers: action(async (page = 1, pageSize = 25, exact=true) => {
                if(self.isLoading) return;
                self.actions.setLoading(true);
                self.currentPage = page;
                const requestConfig = {
                    url: `https://uchi-hack.herokuapp.com/answer/list`,
                    params: {...self.filters}
                };
                requestConfig.params.limit=pageSize;
                requestConfig.params.offset=pageSize * (page - 1);
                
                const responseObject = await connection.request(requestConfig);
                const response = await responseObject.json();
                if(response.success){
                    const answers = response.result;
                    self.actions.setTotal(response.total);
                    self.actions.setAnswers(answers);
                    self.actions.setIsLoaded(true);
                }
                self.actions.setIsLoaded(true);
                self.actions.setLoading(false);
            }),
            createAnswer: action(async (data) => {
                const requestConfig = {
                    url: `https://uchi-hack.herokuapp.com/answer/create`,
                    params: [data]
                };
                const responseObject = await connection.request(requestConfig);
                const response = await responseObject.json();
                return response;
            }),
        }
    };
    return extendObservable(self, { answers: [], isLoading: false, isLoaded: false, total: 0, question: 0});
}
export default Answers;