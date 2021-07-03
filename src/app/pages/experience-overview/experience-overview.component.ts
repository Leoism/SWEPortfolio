import { Component } from '@angular/core';

@Component({
  selector: 'experience-overview',
  templateUrl: './experience-overview.component.html',
  styleUrls: ['./experience-overview.component.scss']
})
export class ExperienceOverview {
  readonly gameDevelopmentCourses = [
    {name: 'Intro to Game Development', tooltip: 'In Progress'},
    {name: 'Intro to Game Engine Development'},
    {name: 'Intro to 3D Computer Graphics'},
  ];

  readonly programmingCourses = [
    {name: 'Intro to Computer Programming I'},
    {name: 'Intro to Computer Programming II'},
    {name: 'Data Structures & Algorithms I'},
    {name: 'Data Structures & Algorithms II'},
  ];

  readonly conceptualCourses = [
    {name: 'Software Engineering Concepts'},
    {name: 'Technical Writing'},
    {name: 'Software Design & Analysis'},
    {name: 'Management Principles'},
  ];

  readonly miscCourses = [
    {name: 'Hardware & Computer Organization'},
    {name: 'Operating Systems'},
    {name: 'Network Design & Programming'},
    {name: 'Database Systems'},
  ];

  readonly workExperience = [
    {title: 'EP Intern', company: 'Google', year: '2019',
    summary: ['This is a summary']}
  ]
}
