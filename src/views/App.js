import "./App.scss";
import Registry, {RegistryCtx} from "../stores/Registry";
import React from 'react';
import Header from "./Header";
import { observer } from "mobx-react";


const registry = Registry();
registry.actions.init();

const App = observer(() => {
  const selectedPageStore = registry.getStore('selectedPage');
  return (
    <RegistryCtx.Provider value={registry}>
      <div className="App">
        <RegistryCtx.Consumer>
          {store =><Header store={store}/>}
        </RegistryCtx.Consumer>
        <main>
          {selectedPageStore.selectedPageItem}
        </main>
      </div>
    </RegistryCtx.Provider>
  );
});

export default App;
