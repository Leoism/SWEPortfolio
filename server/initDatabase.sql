CREATE TABLE WorkExperience (
  ID        SERIAL        PRIMARY KEY,
  Company   VARCHAR(64)   NOT NULL,
  Title     VARCHAR(64)   NOT NULL,
  Year      VARCHAR(64)   NOT NULL,

  UNIQUE(Company, Title, Year)
);

CREATE TABLE WorkBullet (
  ID                SERIAL        PRIMARY KEY,
  WorkExperienceID  INT           NOT NULL,
  Bullet            VARCHAR(512)  NOT NULL,

  FOREIGN KEY (WorkExperienceID) REFERENCES WorkExperience(ID)
);

CREATE TABLE Project (
  ID    SERIAL        PRIMARY KEY,
  Name  VARCHAR(128)  NOT NULL,
  Year  VARCHAR(64)   NOT NULL,
  Link  VARCHAR(128)  NOT NULL,

  UNIQUE(Name, Link)
);

CREATE TABLE ProjectBullet (
  ID          SERIAL          PRIMARY KEY,
  ProjectID   INT             NOT NULL,
  Bullet      VARCHAR(512)    NOT NULL,

  FOREIGN KEY (ProjectID) REFERENCES Project(ID)
);

CREATE TABLE CourseCategory (
  ID              SERIAL         PRIMARY KEY,
  CategoryName    VARCHAR(128)   UNIQUE NOT NULL
);

CREATE TABLE CourseEntry (
  ID                SERIAL        PRIMARY KEY,
  CourseCategoryID  INT           NOT NULL,
  Name              VARCHAR(256)  NOT NULL,
  Status            VARCHAR(32),

  FOREIGN KEY (CourseCategoryID) REFERENCES CourseCategory(ID)
);

CREATE TABLE AboutEntry (
  ID      SERIAL    PRIMARY KEY,
  Title   TEXT      NOT NULL,
  Value   TEXT      NOT NULL,

  UNIQUE (Title, Value)
);

CREATE TABLE AboutUrl (
  ID      SERIAL    PRIMARY KEY,
  Url     TEXT      UNIQUE NOT NULL,
  Image   TEXT      NOT NULL,
  Alt     VARCHAR(512)
);
