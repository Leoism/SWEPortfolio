export interface WorkExperience {
  company: string,
  title: string,
  year: string,
  bullets: string[],
};

export class DatabaseCommunicator {
  static baseUrl: string = 'http://localhost:8080';

  static async getWorkExperienceEntries() {
    return await (await fetch(`${this.baseUrl}/get_work_experience`)).json();
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
};
