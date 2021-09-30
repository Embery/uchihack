import Connection from "../Connection"
import { action, extendObservable } from "mobx";
import SelectedPage from "./SelectedPage";
import React from "react";

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
            //self.connection = Connection().init();
            self.stores = {
                selectedPage: SelectedPage()
            };
            self.initialized = true;
        })
    }

    return extendObservable(self, { stores: [], initialized: false });
}

const RegistryCtx = React.createContext();

export {Registry as default, RegistryCtx}