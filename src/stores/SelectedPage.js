import { action, extendObservable } from "mobx";
import HomeScreen from "../views/HomeScreen";
import QuestionsScreen from "../views/QuestionsScreen";

const SelectedPage = () => {
    const items = {
        home: <HomeScreen/>,
        questions: <QuestionsScreen/>
    }
    const self = {
    }
    self.actions = {
        setSelected: action(page => {
            self.selected = page;
            self.actions.setSelectedPageItem(page);
        }),
        setSelectedPageItem: action(page=>self.selectedPageItem=items[page])
    }
    return extendObservable(self, { selected: "home", selectedPageItem: items["home"] });
}
export default SelectedPage;