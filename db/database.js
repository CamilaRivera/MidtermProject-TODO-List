/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserById = function (id) {
  return db
    .query(`SELECT * FROM users WHERE id = $1;`, [id])
    .then(res => res.rows[0]);
};

const getCategoriesByUserId = function (db, userId) {
  return db.query(`SELECT * FROM categories WHERE user_id = $1`, [userId])
    .then(res => res.rows);
};

const addCategory = function (db, category) {
  return db.query(`INSERT INTO categories (description, user_id, cover_photo_url)
    VALUES ($1, $2, $3) RETURNING *;`, [category.description, category.user_id, category.cover_photo_url])
    .then(res => res.rows[0]);
};

const deleteCategory = function (db, id, userId) {
  return db.query(`DELETE FROM categories WHERE id = $1 AND user_id = $2`, [id, userId]);
};

const updateCategory = function (db, editableCategory) {
  return db.query(`UPDATE categories SET description = $1, cover_photo_url = $2 WHERE user_id = $3 AND id = $4 RETURNING *;`
    , [editableCategory.description, editableCategory.cover_photo_url, editableCategory.user_id, editableCategory.id])
    .then(res => res.rows[0]);
};

module.exports = { addCategory, getUserById, getCategoriesByUserId, deleteCategory, updateCategory };
