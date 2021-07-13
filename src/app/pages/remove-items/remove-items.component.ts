import { AfterViewInit, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { DatabaseCommunicator, Project, WorkExperience } from '../../middleware/DatabaseCommunicator';

@Component({
  selector: 'remove-items',
  templateUrl: './remove-items.component.html',
  styleUrls: ['./remove-items.component.scss'],
})
export class RemoveItems implements AfterViewInit {
  tableEntries = new MatTableDataSource([]);
  categoryControl = new FormControl('work', []);
  currentType: string = 'work';
  columnNames: string[] = ['Company', 'Title', 'Year'];

  ngAfterViewInit() {
    DatabaseCommunicator.getWorkExperienceEntries().then((entries) => {
      this.tableEntries = new MatTableDataSource<WorkExperience>(entries);
    });

    this.categoryControl.valueChanges.subscribe((value) => {
      if (value === 'work') {
        DatabaseCommunicator.getWorkExperienceEntries().then((entries) => {
          this.tableEntries = new MatTableDataSource<WorkExperience>(entries);
          this.currentType = 'work';
          this.columnNames = ['Company', 'Title', 'Year']
        });
      }

      if (value === 'project') {
        DatabaseCommunicator.getProjects().then((entries) => {
          this.tableEntries = new MatTableDataSource<Project>(entries);
          this.currentType = 'project';
          this.columnNames = ['Name', 'Link', 'Year']
        });
      }

      if (value === 'course') {
        DatabaseCommunicator.getCourses().then((entries) => {
          const transformedEntries = entries.map((entry) => {
            return {
              name: entry.categoryName,
              bullets: entry.courses.map((course) => course.status ? `${course.name}. Status: ${course.status}` : course.name)
            }
          })
          this.tableEntries = new MatTableDataSource(transformedEntries);
          this.currentType = 'course';
          this.columnNames = ['Name'];
        });
      }
    })
  }
}
