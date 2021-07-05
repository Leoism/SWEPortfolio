import { AfterViewInit, Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DatabaseCommunicator } from '../../middleware/DatabaseCommunicator';
import { AddItemsPage } from '../add-items-page/add-items-page.component';

@Component({
  selector: 'experience-overview',
  templateUrl: './experience-overview.component.html',
  styleUrls: ['./experience-overview.component.scss']
})
export class ExperienceOverview implements AfterViewInit {
  readonly gameDevelopmentCourses = [
    { name: 'Intro to Game Development', tooltip: 'In Progress' },
    { name: 'Intro to Game Engine Development' },
    { name: 'Intro to 3D Computer Graphics' },
  ];

  readonly programmingCourses = [
    { name: 'Intro to Computer Programming I' },
    { name: 'Intro to Computer Programming II' },
    { name: 'Data Structures & Algorithms I' },
    { name: 'Data Structures & Algorithms II' },
  ];

  readonly conceptualCourses = [
    { name: 'Software Engineering Concepts' },
    { name: 'Technical Writing' },
    { name: 'Software Design & Analysis' },
    { name: 'Management Principles' },
  ];

  readonly miscCourses = [
    { name: 'Hardware & Computer Organization' },
    { name: 'Operating Systems' },
    { name: 'Network Design & Programming' },
    { name: 'Database Systems' },
  ];

  workExperience = [];


  constructor(public dialog: MatDialog) { }

  ngAfterViewInit() {
    DatabaseCommunicator.getWorkExperienceEntries().then((entries) => {
      this.workExperience = entries;
    });
  }

  openForm() {
    const dialogRef = this.dialog.open(AddItemsPage);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }
}
