import { AfterViewInit, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CourseCategory, DatabaseCommunicator, Project, WorkExperience } from '../../middleware/DatabaseCommunicator';
import { AddItemsPage } from '../add-items-page/add-items-page.component';

@Component({
  selector: 'experience-overview',
  templateUrl: './experience-overview.component.html',
  styleUrls: ['./experience-overview.component.scss']
})
export class ExperienceOverview implements AfterViewInit {
  categories: CourseCategory[] = [];
  workExperience: MatTableDataSource<WorkExperience> = new MatTableDataSource<WorkExperience>([]);
  projects: MatTableDataSource<Project> = new MatTableDataSource<Project>([]);

  constructor(public dialog: MatDialog) { }

  ngAfterViewInit() {
    DatabaseCommunicator.getWorkExperienceEntries().then((entries) => {
      this.workExperience = new MatTableDataSource<WorkExperience>(entries);
    });
    DatabaseCommunicator.getProjects().then((entries) => {
      this.projects = new MatTableDataSource<Project>(entries);
    });
    DatabaseCommunicator.getCourses().then((entries) => {
      this.categories = entries;
    });
  }

  openForm() {
    const dialogRef = this.dialog.open(AddItemsPage);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }
}
