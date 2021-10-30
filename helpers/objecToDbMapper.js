/*
* entity can be any javascript object and output are the strings we need to create DB queries
* we remove id property as th id is automatically generates by data base (serial primary key)
* we also don't need it for editing as we already now what entity we are going to edit and
* we add its id in the WHERE condition of UPDATE query
*
*
* eg,
* input:  {a:1, b:"test", c:123, id:1}
*
*
*
* output:
* {
*   keyValues: "a=1, b='test', c=123",
*   values: "1, 'test', 123",
*   keys: "a, b, c"
* }
*
*
*/
module.exports = (entity) => {
  entity = entity || {};
    
  let objKeyValues = [];
  let objValues = [];
    
  delete entity.id;

  let objKeys = Object.keys(entity);

  for (let key of objKeys) {
    let val = entity[key];
    if (typeof(val) !== 'number') {
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
};

