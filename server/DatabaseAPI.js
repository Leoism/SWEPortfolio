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
  return getArrayWithBullets(rows, 'work', sortSeasons);
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
 * @param {String} type - work, project, or course object
 * @param {Function} sort - a custom sorter for the array  
 * @returns An array sorted by year of all work experience.
 */
function getArrayWithBullets(rows, type, sort) {
  const entryObj = {};
  for (let row of rows) {
    // create the entry for the first time
    if (entryObj[row.id] === undefined) {
      if (type === 'work')
        entryObj[row.id] = {
          company: row.company,
          title: row.title,
          year: row.year,
          bullets: [row.bullet],
        };
      else if (type === 'project')
        entryObj[row.id] = {
          name: row.name,
          link: row.link,
          year: row.year,
          bullets: [row.bullet],
        };
      continue;
    }

    // keep adding bullets to the entry
    entryObj[row.id].bullets.push(row.bullet);
  }

  const entryArr = []
  // convert the object into an array
  for (let [key, val] of Object.entries(entryObj))
    entryArr.push(val);
  // sort the array in descending chronological order
  if (sort != undefined)
    entryArr.sort(sort);
  return entryArr;
}

/**
 * @returns Returns a list of projects in the database.
 */
async function retrieveProjects() {
  const pool = new Pool({ connectionString });
  const projectQuery = `
    SELECT Project.ID, name, year, link, bullet
    FROM Project
    LEFT JOIN ProjectBullet ON (Project.ID = ProjectBullet.projectID);
  `;

  try {
    const res = await pool.query(projectQuery);
    pool.end();
    return getArrayWithBullets(res.rows, 'project', (a, b) => {
      if (a.year < b.year) return 1;
      if (a.year > b.year) return -1;
      return 0;
    });
  } catch (err) {
    pool.end();
    return [];
  }
}

/**
 * Adds the project, along with its bullets, to the database. Returns true
 * if the operation was successful. Otherwise, returns false.
 * @param {Project} project - project object to be added to the database 
 * @returns Returns true if the project was successfully added
 */
async function addProject(project) {
  const pool = new Pool({ connectionString });
  const name = project.name;
  const year = project.year;
  const link = project.link;
  const bullets = project.bullets;

  const projectQuery = `
    INSERT INTO Project(name, year, link)
      VALUES ($1, $2, $3);
  `;
  const projectIDQuery = `
    SELECT ID FROM Project
    WHERE name = $1 AND link = $2;
  `;
  const bulletQuery = `
    INSERT INTO ProjectBullet(projectID, bullet)
      VALUES ($1, $2);
  `;

  try {
    await pool.query(projectQuery, [name, year, link]);
    const projectID = await (await pool.query(projectIDQuery, [name, link])).rows[0].id;
    for (let bullet of bullets) {
      await pool.query(bulletQuery, [projectID, bullet]);
    }
    pool.end();
  } catch (err) {
    console.log(err);
    return false;
  }
  return true;
}

/**
 * Removes every given project from the database. Returns true if all were
 * successfully removed. Otherwise, returns false.
 * @param {Project[]} projects - list of project entries to remove 
 * @returns Returns true if every project was successfully removed
 */
async function removeProjects(projects) {
  return projects.every((project) => removeProject(project));
}

/**
 * Removes the project and its bullets from the database. Returns true if the
 * project was successfully removed
 * @param {Project} project - project to remove from the database 
 * @returns Returns true if the project was successfully removed
 */
async function removeProject(project) {
  const pool = new Pool({ connectionString });
  const name = project.name;
  const link = project.link;

  const deleteBulletsQuery = `
    DELETE FROM ProjectBullet
    WHERE projectID = (
      SELECT ID 
      FROM Project
      WHERE name = $1 AND link = $2
    );
  `;

  const deleteProjectQuery = `
      DELETE FROM Project
      WHERE name = $1 AND link = $2;
  `;

  try {
    await pool.query(deleteBulletsQuery, [name, link]);
    await pool.query(deleteProjectQuery, [name, link]);
    pool.end();
  } catch (err) {
    console.log(err);
    return false;
  }

  return true;
}

/**
 * @returns Returns an array of all current categories in the database
 */
async function retrieveCourseCategories() {
  const courseCategoriesQuery = `
    SELECT CategoryName
    FROM CourseCategory;
  `;

  let categoryArr = [];
  const pool = new Pool({ connectionString });
  try {
    const res = await pool.query(courseCategoriesQuery);
    for (let row of res.rows) {
      categoryArr.push(row.categoryname);
    }
    pool.end();
  } catch (err) {
    pool.end();
    console.log(err);
    return [];
  }
  return categoryArr;
}

/**
 * Adds the given courses array into the database under the category provided.
 * If the category does not exist, it creates the category before adding the
 * courses to the database.
 * @param {String} category - a string representation of the category to add the courses to
 * @param {CourseEntry[]} courses - an array of courses to add to the database
 * @returns Returns true if the operation was successful
 */
async function addCourses(category, courses) {
  const pool = new Pool({ connectionString });
  const createCategoryQuery = `
    INSERT INTO CourseCategory(CategoryName)
    VALUES ($1);
  `;
  const addCourseEntryQuery = `
    INSERT INTO CourseEntry(CourseCategoryID, Name, Status)
    VALUES (
      (
        SELECT ID
        FROM CourseCategory
        WHERE categoryName = $1
      ), $2, $3
    );
  `;
  try {
    const currentCategories = await retrieveCourseCategories();
    // check if the category exists
    if (!currentCategories.includes(category)) {
      // then create it if it does not exist
      await pool.query(createCategoryQuery, [category]);
    }
    for (let course of courses) {
      await pool.query(addCourseEntryQuery, [category, course.name, course.status]);
    }
  } catch (err) {
    pool.end();
    console.log(err);
    return false;
  }
  return true;
}

/**
 * @returns Returns an array containing the course category and an array of all courses
 */
async function retrieveAllCourses() {
  const coursesCategoriesQuery = `
    SELECT CourseCategory.ID, CategoryName, Name, Status
    FROM CourseCategory
      LEFT JOIN CourseEntry ON (CourseEntry.CourseCategoryID = CourseCategory.ID);
  `;
  const pool = new Pool({ connectionString });
  try {
    const res = await pool.query(coursesCategoriesQuery);
    pool.end();
    return toCategoryArr(res.rows)
  } catch (err) {
    pool.end();
    console.log(err);
    return [];
  }
}

/**
 * Removes every given category from the database. Returns true if all were
 * successfully removed. Otherwise, returns false.
 * @param {string[]} courses - list of category names to remove 
 * @returns Returns true if every category was successfully removed
 */
async function removeCategories(categories) {
  return categories.every((category) => removeCategory(category));
}

/**
 * Removes the category, along with all associates courses, from the database.
 * @param {String} categoryName - category to remove 
 * @returns True if the operation was successful
 */
async function removeCategory(categoryName) {
  const deleteCoursesQuery = `
    DELETE FROM CourseEntry
    WHERE CourseCategoryID = (
      SELECT id
      FROM CourseCategory
      WHERE categoryName = $1
    );
  `;
  const deleteCategoryQuery = `
    DELETE FROM CourseCategory
    WHERE categoryName = $1;
  `;
  const pool = new Pool({ connectionString });
  try {
    await pool.query(deleteCoursesQuery, [categoryName]);
    await pool.query(deleteCategoryQuery, [categoryName]);
    pool.end();
    return true;
  } catch (err) {
    pool.end();
    console.log(err);
    return false;
  }
}

/**
 * Converts postgres rows into a category array. Each element contains the
 * category name and all courses under that category.
 * @param {PostgresRow[]} rows - a postgres row containing all categories and
 *                               courses
 * @returns Returns an array containing all categories and courses associated
 *          with it.
 */
function toCategoryArr(rows) {
  const categoryObject = {};
  for (let row of rows) {
    if (categoryObject[row.id] == undefined) {
      categoryObject[row.id] = {
        categoryName: row.categoryname,
        courses: [{
          name: row.name,
          status: row.status
        }]
      }
      continue;
    }
    categoryObject[row.id].courses.push({
      name: row.name,
      status: row.status,
    });
  }

  for (let key of Object.keys(categoryObject))
    categoryObject[key].courses.sort((a, b) => {
      if (a.name > b.name) return 1;
      else if (b.name < a.name) return -1;
      return 0;
    });

  const categoryArr = []
  // convert the object into an array
  for (let [key, val] of Object.entries(categoryObject))
    categoryArr.push(val);

  return categoryArr;

}

/**
 * {
 *   entries: [{
 *       value: ''.
 *       title: '',
 *   }],
 *   urls: [{
 *       url: '',
 *       image: '',
 *       alt: '',
 *   }]
 * }
 * @param {} about - object containing entries and url buttons
 * @return Returns true if information was added successfully
 */
async function addAboutInformation(about) {
  const addAboutEntryQuery = `
    INSERT INTO AboutEntry(title, value)
      VALUES ($1, $2);
  `;
  const addAboutUrlQuery = `
    INSERT INTO AboutUrl(url, image, alt)
      VALUES ($1, $2, $3);
  `;

  const pool = new Pool({ connectionString });
  try {
    for (let entry of about.entries)
      await pool.query(addAboutEntryQuery, [entry.title, entry.value]);
    for (let url of about.urls)
      await pool.query(addAboutUrlQuery, [url.url, url.image, url.alt]);
    await pool.end();
    return true;
  } catch (err) {
    console.log(err);
    await pool.end();
    return false;
  }
}

/**
 * Retrieves all about information from the database.
 * @returns An object containing all entries and urls
 */
async function retrieveAboutInformation() {
  const aboutEntryQuery = `
    SELECT value, title
    FROM AboutEntry;
  `;
  const aboutUrlQuery = `
    SELECT url, image, alt
    FROM AboutUrl;
  `;
  const pool = new Pool({ connectionString });
  const aboutInfoObj = { entries: [], urls: [] };
  try {
    const entries = await pool.query(aboutEntryQuery);
    const urls = await pool.query(aboutUrlQuery);
    for (let row of entries.rows) {
      aboutInfoObj.entries.push({
        value: row.value,
        title: row.title,
      });
    }
    for (let row of urls.rows) {
      aboutInfoObj.urls.push({
        url: row.url,
        image: row.image,
        alt: row.alt
      });
    }
    await pool.end();
    return aboutInfoObj;
  } catch (err) {
    console.log(err);
    await pool.end();
    return { entries: [], urls: [] };
  }
}

/**
 * @param {Array} entries - an array of AboutEntry objects 
 * @returns Returns true if every entry was successfully removed
 */
async function removeAboutEntries(entries) {
  return entries.every((entry) => removeAboutEntry(entry));
}

/**
 * @param {AboutEntry} entry - about entry to remove 
 * @returns Returns true if the entry was successfully removed
 */
async function removeAboutEntry(entry) {
  const removeAboutEntryQuery = `
    DELETE FROM AboutEntry
    WHERE value = $1 and title = $2;
  `;
  const pool = new Pool({ connectionString });
  try {
    await pool.query(removeAboutEntryQuery, [entry.value, entry.title]);
    return true;
  } catch (err) {
    console.log(err);
    await pool.end();
    return false;
  }
}

/**
 * @param {Array} urls - an array of AboutUrl objects 
 * @returns Returns true if every url was successfully removed
 */
async function removeAboutUrls(urls) {
  return urls.every((url) => removeAboutUrl(url));
}

/**
 * @param {AboutUrl} url - about url to remove 
 * @returns Returns true if the url was successfully removed
 */
async function removeAboutUrl(url) {
  const removeAboutUrlQuery = `
    DELETE FROM AboutUrl
    WHERE url = $1;
  `;
  const pool = new Pool({ connectionString });
  try {
    await pool.query(removeAboutUrlQuery, [url.url]);
    return true;
  } catch (err) {
    console.log(err);
    await pool.end();
    return false;
  }
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
  addAboutInformation,
  addCourses,
  addProject,
  addWorkExperience,
  removeAboutEntries,
  removeAboutUrls,
  removeCategories,
  removeProjects,
  removeWorkExperienceEntries,
  retrieveAboutInformation,
  retrieveAllCourses,
  retrieveCourseCategories,
  retrieveProjects,
  retrieveWorkExperience,
};
