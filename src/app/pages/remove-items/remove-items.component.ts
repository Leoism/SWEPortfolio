import { AfterViewInit, Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DatabaseCommunicator, WorkExperience } from '../../middleware/DatabaseCommunicator';

@Component({
  selector: 'remove-items',
  templateUrl: './remove-items.component.html',
  styleUrls: ['./remove-items.component.scss'],
})
export class RemoveItems implements AfterViewInit {
  workExperience = new MatTableDataSource<WorkExperience>([]);

  ngAfterViewInit() {
    DatabaseCommunicator.getWorkExperienceEntries().then((entries) => {
      this.workExperience = new MatTableDataSource<WorkExperience>(entries);
    });
  }
}
