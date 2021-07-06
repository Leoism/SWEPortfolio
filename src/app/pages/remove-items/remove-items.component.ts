import { animate, state, style, transition, trigger } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DatabaseCommunicator, WorkExperience } from '../../middleware/DatabaseCommunicator';

@Component({
  selector: 'remove-items',
  templateUrl: './remove-items.component.html',
  styleUrls: ['./remove-items.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ]),
  ],
})
export class RemoveItems implements AfterViewInit {
  workExperience = new MatTableDataSource<WorkExperience>([]);
  selection = new SelectionModel<WorkExperience>(true, []);
  expandedWork: WorkExperience | null;
  readonly columnNames: string[] = ['select', 'Company', 'Title', 'Year'];

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.workExperience.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.workExperience.data);
  }

  removeEntries() {
    DatabaseCommunicator.removeWorkExperienceEntries(this.selection.selected as WorkExperience[]);
    this.selection.selected.forEach((entry) => {
      this.workExperience.data.splice(this.workExperience.data.indexOf(entry), 1);
    });
    this.workExperience = new MatTableDataSource<WorkExperience>(this.workExperience.data);
  }

  ngAfterViewInit() {
    DatabaseCommunicator.getWorkExperienceEntries().then((entries) => {
      this.workExperience = new MatTableDataSource<WorkExperience>(entries);
    });
  }
}
