import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';

interface WorkExperience {
  title: string,
  company: string,
  year: string,
  summary: string,
}
@Component({
  selector: 'work-table',
  templateUrl: './work-table.component.html',
  styleUrls: ['./work-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ]),
  ],
})
export class WorkTable {
  @Input() workExperience: WorkExperience[] = [];
  readonly columnNames: string[] = ['Title', 'Company', 'Year'];
  expandedWork: WorkExperience | null;
}
