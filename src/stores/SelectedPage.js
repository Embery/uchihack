import { action, extendObservable } from "mobx";
import HomeScreen from "../views/HomeScreen";
import Login from "../views/Login";
import QuestionPage from "../views/QuestionPage";
import QuestionsScreen from "../views/QuestionsScreen";
import Registration from "../views/Registration";
import Profile from "../views/EditProfile";

const SelectedPage = () => {
    const items = {
        home: <HomeScreen/>,
        questions: <QuestionsScreen/>,
        question: <QuestionPage/>,
        register: <Registration/>,
        login: <Login/>,
        profileEdit: <Profile/>,
    }
    const self = {
    }
    self.actions = {
        setSelected: action((page, config = {}) => {
            self.selected = page;
            self.actions.setSelectedPageItem(page, config);
        }),
        setSelectedPageItem: action((page, config = {})=>{
            const copy = Object.assign({}, items[page]);
            copy.props=config;
            self.selectedPageItem = copy;
        })
    }
    return extendObservable(self, { selected: "home", selectedPageItem: items["home"] });
}
export default SelectedPage;