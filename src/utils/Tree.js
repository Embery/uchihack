const treefiy = (dataArray, parentId = "parent_id") => {
    const data = [];
    const byIdMap = {};
    dataArray.forEach(elem => {
        byIdMap[elem.id] = elem
    });
    dataArray.forEach(elem=>{
        elem.title = elem.name;
        elem.value = elem.id;
        if(!elem[parentId]) {
            data.push(elem);
        } else {
            const parent = byIdMap[elem[parentId]];
            if(!parent.children) parent.children = [];
            parent.children.push(elem);
        }
    });
    return data;
}

export default treefiy;