export interface WorkExperience {
  company: string,
  title: string,
  year: string,
  bullets: string[],
};

export interface Project {
  name: string,
  year: number,
  link: string,
  bullets: string[],
}

export interface Course {
  name: string,
  status?: string,
}
export interface CourseCategory {
  categoryName: string,
  courses: Course[],
}

export interface AboutEntry {
  title: string; // title of the entry
  value: string; // text related to the title
}

export interface AboutUrl {
  url: string; // url to redirect to 
  image: string; // image url to display
  alt?: string; // alt text for the image
}

export class DatabaseCommunicator {
  static baseUrl: string = 'http://localhost:8080';

  static async getWorkExperienceEntries() {
    return (await fetch(`${this.baseUrl}/api/get_work_experience`)).json();
  }

  static async addWorkExperienceEntry(workEntry: WorkExperience) {
    const statusCode = (await fetch(`${this.baseUrl}/api/add_work_experience`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(workEntry),
    })).status;
    return statusCode === 200;
  }

  static async removeWorkExperienceEntries(workEntries: WorkExperience[]) {
    const statusCode = (await fetch(`${this.baseUrl}/api/remove_work_experience`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(workEntries),
    })).status;

    return statusCode === 200;
  }

  static async getProjects() {
    return (await fetch(`${this.baseUrl}/api/get_projects`)).json();
  }

  static async addProject(project) {
    console.log(project);
    const statusCode = (await fetch(`${this.baseUrl}/api/add_project`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })).status;

    return statusCode === 200;
  }

  static async removeProject(projects) {
    const statusCode = (await fetch(`${this.baseUrl}/api/remove_project`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projects)
    })).status;

    return statusCode === 200;
  }

  static async getCategoryList() {
    return (await fetch(`${this.baseUrl}/api/get_categories`)).json();
  }

  static async getCourses() {
    return (await fetch(`${this.baseUrl}/api/get_courses`)).json();
  }

  static async addCourses(category, courses) {
    const statusCode = (await fetch(`${this.baseUrl}/api/add_courses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ category, courses })
    })).status;

    return statusCode === 200;
  }

  static async removeCourses(categories) {
    const statusCode = (await fetch(`${this.baseUrl}/api/remove_courses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categories),
    })).status;
    return statusCode === 200;
  }

  static async getAboutInformation() {
    return (await fetch(`${this.baseUrl}/api/get_about_information`)).json();
  }

  static async addAboutInformation(aboutInfo) {
    const statusCode = (await fetch(`${this.baseUrl}/api/add_about_information`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(aboutInfo),
    })).status;

    return statusCode === 200;
  }

  static async removeAboutEntries(entries) {
    const statusCode = (await fetch(`${this.baseUrl}/api/remove_about_entries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entries),
    })).status;

    return statusCode === 200;
  }

  static async removeAboutUrls(urls) {
    const statusCode = (await fetch(`${this.baseUrl}/api/remove_about_urls`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(urls),
    })).status;

    return statusCode === 200;
  }

  static async login(password: string) {
    const statusCode = (await fetch(`${this.baseUrl}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password, }),
    })).status;
    return statusCode === 200;
  }
};
