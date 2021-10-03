import Connection from "../utils/Connection"
import { action, extendObservable } from "mobx";
import SelectedPage from "./SelectedPage";
import Questions from "./Questions";
import Answers from "./Answers";
import React from "react";
import User from "./User";
import Categories from "./Categories";

const RegistryCtx = React.createContext();

function Registry(){
    const self = {
        initialized: false,
        getStore(storeName){
            if(self.stores && self.stores[storeName]){
                return self.stores[storeName]
            } else {
                throw new Error(`No store with name ${storeName} was found`);
            }
        }
    };
    self.actions = {
        init: action(() => {
            self.connection = Connection().init();
            self.stores = {
                selectedPage: SelectedPage(),
                user: User(self.connection),
                categories: Categories(self.connection),
                questions: Questions(self.connection),
                answers: Answers(self.connection)
            };
            self.initialized = true;
        })
    }

    return extendObservable(self, { stores: [], initialized: false });
}

export {Registry as default, RegistryCtx}