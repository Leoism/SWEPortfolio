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

export class DatabaseCommunicator {
  static baseUrl: string = 'http://localhost:8080';

  static async getWorkExperienceEntries() {
    return (await fetch(`${this.baseUrl}/get_work_experience`)).json();
  }

  static async addWorkExperienceEntry(workEntry: WorkExperience) {
    const statusCode = (await fetch(`${this.baseUrl}/add_work_experience`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(workEntry),
    })).status;
    return statusCode === 200;
  }

  static async removeWorkExperienceEntries(workEntries: WorkExperience[]) {
    const statusCode = (await fetch(`${this.baseUrl}/remove_work_experience`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(workEntries),
    })).status;

    return statusCode === 200;
  }

  static async getProjects() {
    return (await fetch(`${this.baseUrl}/get_projects`)).json()
  }

  static async addProject(project) {
    console.log(project);
    const statusCode = (await fetch(`${this.baseUrl}/add_project`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })).status;

    return statusCode === 200;
  }
};
