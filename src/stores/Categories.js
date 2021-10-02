import { action, extendObservable } from "mobx";
import treefiy from "../utils/Tree";

const Categories = (connection) => {
    const self = {
        isLoading: false,
        isLoaded: false,
        categories: [],
        actions: {
            setTotal: action(total=>self.total=total),
            setCategories: action(categories=>self.categories=categories),
            setLoading: action(isLoading => self.isLoading = isLoading),
            setIsLoaded: action(isLoaded => self.isLoaded = isLoaded),
            getCategories: action(async (page = 1, pageSize = 25) => {
                if(self.isLoading) return;
                self.actions.setLoading(true);
                self.currentPage = page;
                const requestConfig = {
                    url: `https://uchi-hack.herokuapp.com/category/list`,
                    params: {}
                };
                requestConfig.params.limit=pageSize;
                requestConfig.params.offset=pageSize * (page - 1);
                
                const responseObject = await connection.request(requestConfig);
                const response = await responseObject.json();
                if(response.success){
                    const categories = treefiy(response.result);
                    self.actions.setTotal(response.total);
                    self.actions.setCategories(categories);
                    self.actions.setIsLoaded(true);
                }
                self.actions.setIsLoaded(true);
                self.actions.setLoading(false);
            }),
        }
    };
    return extendObservable(self, { categories: [], isLoading: false, isLoaded: false, total: 0});
}
export default Categories;