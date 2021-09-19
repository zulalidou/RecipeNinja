// Dexie is a wrapper for IndexedDB
import Dexie from 'dexie';

// 'RecipeNinjaClientDB' is the name of the database
const db = new Dexie('RecipeNinjaClientDBaa');


/*
 * A store is the same thing as a table
 *
 * The keys in the object below represent the names of tables in the database
 * The values (for the keys) in the object below represent the names of the
 * columns for their keys/stores/tables
 * - The value for the recipes table below shows only one column
 *   (namely 'searchTerm'), but there can be more
 * - added to each table
 */
// db.version(1).stores({
//   recipes: 'searchTerm',
// });


export default db;
