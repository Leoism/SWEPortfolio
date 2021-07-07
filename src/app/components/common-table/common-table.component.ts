import { animate, state, style, transition, trigger } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DatabaseCommunicator, WorkExperience } from '../../middleware/DatabaseCommunicator';

type Table = 'work' | 'course' | 'project';

@Component({
  selector: 'common-table',
  templateUrl: './common-table.component.html',
  styleUrls: ['./common-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ]),
  ],
})
export class CommonTable<T> {
  @Input() isRemoval: boolean = false;
  @Input() tableEntries: MatTableDataSource<T> = new MatTableDataSource<T>([]);
  @Input() columnNames: string[] = [];
  @Input() tableType: Table;

  expandedEntry: T | null;
  selection = new SelectionModel<T>(true, []);

  addCheckboxColumn() {
    if (this.columnNames[0] === 'select') return true;
    this.columnNames.splice(0, 0, 'select');
    return true;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.tableEntries.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.tableEntries.data);
  }

  async removeEntries() {
    let isSuccess = false;
    switch (this.tableType) {
      case 'work':
        isSuccess = await DatabaseCommunicator.removeWorkExperienceEntries(this.selection.selected as unknown as WorkExperience[]);
        break;
      case 'project':
        break;
      case 'course':
        break;
    }
    if (!isSuccess) {
      alert('There was an error removing the entries');
      return;
    }

    this.selection.selected.forEach((entry) => {
      this.tableEntries.data.splice(this.tableEntries.data.indexOf(entry), 1);
    });
    this.tableEntries = new MatTableDataSource<T>(this.tableEntries.data);
    this.selection.clear();
  }
}
