function objecToDbMapper(object) {
    object = object || {};
    
    let objKeyValues = [];
    let objValues = [];
    
    delete object.id;

    let objKeys = Object.keys(object);

    
    for (let key of objKeys) {
        let val= object[key];
        if(typeof(val) !== 'number'){
            val = `'${val}'`;
        }
        objKeyValues.push(`${key} = ${val}`);
        objValues.push(val.toString());
    }

    return {
        keyValues: objKeyValues.join(','),
        keys: objKeys.join(','),
        values: objValues.join(',')
    };
}

module.exports = objecToDbMapper;