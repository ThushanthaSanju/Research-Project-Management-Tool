const deleteFieldsInMultiple = (doc, fields = []) => {
    fields = [...fields, 'createdAt', 'updatedAt', '__v'];
    const objArray = [];
    for (const object of doc) {
        const obj = object;
        fields.forEach(path => {
            if (obj[path]) {
                const keys = path.split('.');

                keys.reduce((acc, key, index) => {
                    if (index === keys.length - 1) {
                        delete acc[key];
                        return true;
                    }
                    return acc[key];
                }, obj);
            }
        });
        objArray.push(obj);
    }
    return objArray;
};

const deleteFieldsInOne = (doc, fields = []) => {
    fields = [...fields, 'createdAt', 'updatedAt', '__v'];
    const obj = doc.toObject();

    fields.forEach(path => {
        if (obj[path]) {
            const keys = path.split('.');

            keys.reduce((acc, key, index) => {
                if (index === keys.length - 1) {
                    delete acc[key];
                    return true;
                }
                return acc[key];
            }, obj);
        }
    });

    return obj;
};

module.exports = {
    deleteFieldsInOne,
    deleteFieldsInMultiple
};