const objecToDbMapper = require('../helpers/objecToDbMapper');

module.exports.getEntities = async(db, tableName) => {
  const query = `SELECT * FROM ${tableName}`;
  const res = await db.query(query);
  return (res && res.rows) || [];

  /*
  * The above return is equal to the following logic
  *
  
  if(res && res.rows){
    return res.rows;
  }else{
    return [];
  }
  */
};

module.exports.getEntityById = async(db, tableName, entityId) => {
  const query = `SELECT * FROM ${tableName} WHERE id=${entityId || 0} LIMIT 1`;
  const res = await db.query(query);
  if (res && res.rows && res.rows.length) {
    return res.rows[0];
  }
  return null;
};

module.exports.addEntity = async(db, tableName, entity) => {
  const payload = objecToDbMapper(entity);
  const query = `INSERT INTO ${tableName} (${payload.keys}) VALUES (${payload.values}); SELECT currval('${tableName}_id_seq');`;
  const res = await db.query(query);
  if (res && res.length && res.length > 1 && res[1].rows && res[1].rows.length) {
    return res[1].rows[0].currval || 0;
  }
  return 0;
};

module.exports.editEntity = async(db, tableName, entity) => {
  const entityId = entity.id;
  const payload = objecToDbMapper(entity);
  const query = `UPDATE ${tableName} SET ${payload.keyValues} WHERE id=${entityId}`;
  await db.query(query);
  return true;
};

module.exports.deleteEntity = async(db, tableName, entityId) => {
  const query = `DELETE FROM ${tableName} WHERE id=${entityId || 0}`;
  await db.query(query);
  return true;
};

module.exports.queryTable = async(db, tableName, whereClause) => {
  const query = `SELECT * FROM ${tableName} WHERE ${whereClause}`;
  const res = await db.query(query);
  return (res && res.rows) || [];
};