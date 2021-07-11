const express = require('express');
const cors = require('cors');
const databaseApi = require('./DatabaseAPI');
const app = express();

const corsOptions = {
  origin: 'http://localhost:4200',
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/get_work_experience', async (req, res) => {
  res.json(await databaseApi.retrieveWorkExperience());
});

app.post('/add_work_experience', async (req, res) => {
  const isSuccess = await databaseApi.addWorkExperience(req.body);
  if (isSuccess)
    res.sendStatus(200);
  else
    res.sendStatus(500);
});

app.post('/remove_work_experience', async (req, res) => {
  const isSuccess = await databaseApi.removeWorkExperienceEntries(req.body);
  if (isSuccess)
    res.sendStatus(200);
  else
    res.sendStatus(500);
});

app.get('/get_projects', async (req, res) => {
  res.json(await databaseApi.retrieveProjects());
});

app.post('/add_project', async (req, res) => {
  const isSuccess = await databaseApi.addProject(req.body);
  if (isSuccess) res.sendStatus(200)
  else res.sendStatus(500);
});

app.post('/remove_project', async (req, res) => {
  const isSuccess = await databaseApi.removeProjects(req.body);
  if (isSuccess) res.sendStatus(200)
  else res.sendStatus(500);
});

app.get('/get_categories', async (req, res) => {
  res.json(await databaseApi.retrieveCourseCategories());
});

app.post('/add_courses', async (req, res) => {
  const isSuccess = await databaseApi.addCourses(req.body.category, req.body.courses);
  if (isSuccess) res.sendStatus(200)
  else res.sendStatus(500);
});

app.get('/get_courses', async (req, res) => {
  res.json(await databaseApi.retrieveAllCourses());
});

app.listen(8080);
