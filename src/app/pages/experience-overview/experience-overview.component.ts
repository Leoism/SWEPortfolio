import { Component } from '@angular/core';

@Component({
  selector: 'experience-overview',
  templateUrl: './experience-overview.component.html',
  styleUrls: ['./experience-overview.component.scss']
})
export class ExperienceOverview {
  readonly gameDevelopmentCourses = [
    'Intro to 3D Computer Graphics',
    'Intro to Game Engine Development',
  ];

  readonly programmingCourses = [
    'Intro to Computer Programming I',
    'Intro to Computer Programming II',
    'Data Structures & Algorithms I',
    'Data Structures & Algorithms II',
  ];

  readonly conceptualCourses = [
    'Software Engineering Concepts',
    'Technical Writing',
    'Software Design & Analysis',
    'Management Principles',
  ];

  readonly miscCourses = [
    'Hardware & Computer Organization',
    'Operating Systems',
    'Network Design & Programming',
    'Database Systems',
  ];
}
