import { AfterViewInit, Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DatabaseCommunicator, Project } from '../../middleware/DatabaseCommunicator';

@Component({
  selector: 'project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.scss']
})
export class ProjectOverview implements AfterViewInit {
  projectEntries = new MatTableDataSource<Project[]>([]);

  ngAfterViewInit() {
    DatabaseCommunicator.getProjects().then((projects) => {
      this.projectEntries = new MatTableDataSource<Project[]>(projects);
    });
  }
}
