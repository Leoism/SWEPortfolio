require('dotenv').config();

const { Pool } = require('pg');

const connectionString = `postgres://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.ADDRESS}:${process.env.PORT}/${process.env.DATABASE}`;
const seasonVals = { Winter: 1, Spring: 2, Summer: 3, Fall: 4 };

/**
 * Retrieves all work experience from the database and returns it as an array.
 * @returns An array of all work experience sorted in descending chronological
 *          order
 */
async function retrieveWorkExperience() {
  const pool = new Pool({ connectionString });
  const workExpQuery = `
    SELECT WorkExperience.ID, company, title, year, bullet
    FROM WorkExperience
    LEFT JOIN WorkBullet ON (WorkExperience.ID = WorkBullet.workExperienceID)
  `;
  const res = await pool.query(workExpQuery);
  pool.end();
  const rows = res.rows;
  return getWorkExperienceArraySorted(rows);
}

/**
 * Inserts the work experience into the database. Work Experience must contain
 * company, title, year, and bullets properties. Returns true if successful,
 * otherwise, returns false.
 * @param {WorkExperience} workExperienceObj - work experience to insert
 * @returns Returns true if inserts with success
 */
async function addWorkExperience(workExperienceObj) {
  const pool = new Pool({ connectionString });
  const company = workExperienceObj.company;
  const title = workExperienceObj.title;
  const year = workExperienceObj.year;
  const bullets = workExperienceObj.bullets;

  // inserts the initial work experience
  const insertWorkExpQuery = `
    INSERT INTO WorkExperience(Company, Title, Year)
    VALUES ($1, $2, $3);
  `;

  // retrieves the id for the newly inserted work experience
  const workIDQuery = `
    SELECT ID
    FROM WorkExperience
    WHERE company = $1 AND title = $2 AND year = $3;
  `;

  // inserts all the bullets into the work experience bullet list
  const insertWorkBulletQuery = `
    INSERT INTO WorkBullet(WorkExperienceID, Bullet)
    VALUES ($1, $2);
  `;

  try {
    await pool.query(insertWorkExpQuery, [company, title, year]);
    const workID = (await pool.query(workIDQuery, [company, title, year])).rows[0].id;
    for (let bullet of bullets) {
      await pool.query(insertWorkBulletQuery, [workID, bullet]);
    }
    pool.end();
  } catch (err) {
    pool.end();
    console.log(err);
    return false;
  }
  return true;
}

/**
 * Given an array of work experience objects, remove all entries from the
 * database. Returns true if all entries were successful, otherwise returns
 * false.
 * @param {WorkExperience[]} workEntries 
 * @returns Returns true if all entries were successfully removed
 */
async function removeWorkExperienceEntries(workEntries) {
  return workEntries.every((entry) => removeWorkExperienceEntry(entry));
}

/**
 * Removes the given work experience entry from the database. Returns true if
 * the entry was successfully removed. 
 * @param {WorkExperience} workExperienceObj 
 * @returns Returns true if the entry was successfully removed
 */
async function removeWorkExperienceEntry(workExperienceObj) {
  const pool = new Pool({ connectionString });
  const company = workExperienceObj.company;
  const title = workExperienceObj.title;
  const year = workExperienceObj.year;

  const removeBulletsQuery = `
  DELETE FROM WorkBullet
  WHERE workExperienceID = (
      SELECT ID
      FROM WorkExperience
      WHERE company = $1 AND title = $2 AND year = $3
   );`;
  const removeEntryQuery = `
  DELETE FROM WorkExperience
  WHERE company = $1 AND title = $2 AND year = $3;`;
  try {
    await pool.query(removeBulletsQuery, [company, title, year]);
    await pool.query(removeEntryQuery, [company, title, year]);
    pool.end();
  } catch (err) {
    pool.end();
    console.log(err);
    return false;
  }
  return true;
}

/**
 * Given the rows of a postgres query result, extracts all information into 
 * a parsable object. 
 * @param {PostgresArr} rows - Query results from postgres.  
 * @returns An array sorted by year of all work experience.
 */
function getWorkExperienceArraySorted(rows) {
  const workExperienceObj = {};
  for (let row of rows) {
    // create the entry for the first time
    if (workExperienceObj[row.id] === undefined) {
      workExperienceObj[row.id] = {
        company: row.company,
        title: row.title,
        year: row.year,
        bullets: [row.bullet],
      };
      continue;
    }

    // keep adding bullets to the entry
    workExperienceObj[row.id].bullets.push(row.bullet);
  }

  const workExperienceArr = []
  // convert the object into an array
  for (let [key, val] of Object.entries(workExperienceObj))
    workExperienceArr.push(val);
  // sort the array in descending chronological order
  workExperienceArr.sort(sortSeasons);
  return workExperienceArr;
}

/**
 * Given a work experience object, takes the year and sorts by chronological
 * descending order.
 * @param {String} workExp1 - work experience object containing a year  
 * @param {String} workExp2 - work experience object containing a year
 */
function sortSeasons(workExp1, workExp2) {
  const [season1season, season1year] = workExp1.year.split(' ');
  const [season2season, season2year] = workExp2.year.split(' ');
  return parseInt(season2year) - parseInt(season1year) ||
    seasonVals[season2season] - seasonVals[season1season];
}

module.exports = {
  addWorkExperience,
  removeWorkExperienceEntries,
  retrieveWorkExperience,
};
