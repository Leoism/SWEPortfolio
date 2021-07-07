import { animate, state, style, transition, trigger } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DatabaseCommunicator, WorkExperience } from '../../middleware/DatabaseCommunicator';

@Component({
  selector: 'work-table',
  templateUrl: './work-table.component.html',
  styleUrls: ['./work-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ]),
  ],
})
export class WorkTable {
  @Input() isRemoval: boolean = false;
  @Input() workExperience: MatTableDataSource<WorkExperience> = new MatTableDataSource<WorkExperience>([]);
  readonly columnNames: string[] = ['Company', 'Title', 'Year'];
  expandedWork: WorkExperience | null;
  selection = new SelectionModel<WorkExperience>(true, []);

  addCheckboxColumn() {
    if (this.columnNames[0] === 'select') return true;
    this.columnNames.splice(0, 0, 'select');
    console.log(this.columnNames);
    return true;
  }

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

  async removeEntries() {
    const isSuccess = await DatabaseCommunicator.removeWorkExperienceEntries(this.selection.selected as WorkExperience[]);
    if (!isSuccess) {
      alert('There was an error removing the entries');
      return;
    }

    this.selection.selected.forEach((entry) => {
      this.workExperience.data.splice(this.workExperience.data.indexOf(entry), 1);
    });
    this.workExperience = new MatTableDataSource<WorkExperience>(this.workExperience.data);
    this.selection.clear();
  }
}
