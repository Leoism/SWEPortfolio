import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatListOption } from '@angular/material/list';
import { DatabaseCommunicator } from '../../middleware/DatabaseCommunicator';

@Component({
  selector: 'add-items-page',
  templateUrl: './add-items-page.component.html',
  styleUrls: ['./add-items-page.component.scss']
})
export class AddItemsPage implements OnInit {
  categoryControl = new FormControl('', []);

  entryGroup: FormGroup;
  bulletControl: FormControl = new FormControl('', [Validators.required]);
  bullets: string[] = [];

  isFormEmpty: boolean = true;

  /**
   * Deletes all the selected bullets from the bullets to be saved.
   * @param bulletsToDelete - selected bullets to delete
   */
  deleteBullets(bulletsToDelete: MatListOption[]) {
    bulletsToDelete.forEach((bullet) => {
      this.bullets.splice(this.bullets.indexOf(bullet.value), 1);
    });
  }

  addBullet(bullet: string) {
    this.bullets.push(bullet);
    this.bulletControl.setValue('', { emitEvent: false });
  }

  async saveEntry() {
    const category = this.categoryControl.value;
    let isSuccess = false;

    switch (category) {
      case 'work': {
        const entry = {
          company: this.entryGroup.get('workCompany').value,
          title: this.entryGroup.get('workTitle').value,
          year: this.entryGroup.get('workYear').value,
          bullets: this.bullets,
        };

        isSuccess = await DatabaseCommunicator.addWorkExperienceEntry(entry);
      }
      case 'project': {
        const entry = {
          name: this.entryGroup.get('projectName').value,
          year: this.entryGroup.get('projectYear').value,
          link: this.entryGroup.get('projectLink').value,
          bullets: this.bullets,
        };

        isSuccess = await DatabaseCommunicator.addProject(entry);
      }
    };

    if (!isSuccess) alert('There was an error saving your entry');
    else alert('Your entry was successfully saved.');
  }

  ngOnInit() {
    // subscribe the value changes so that we can setup a new form group whenever
    // there is a category change.
    this.categoryControl.valueChanges.subscribe((category) => {
      this.isFormEmpty = true;
      switch (category) {
        case 'work': {
          this.entryGroup = new FormGroup({
            workTitle: new FormControl('', []),
            workCompany: new FormControl('', []),
            workYear: new FormControl('', []),
          });
          break;
        }
        case 'project': {
          this.entryGroup = new FormGroup({
            projectName: new FormControl('', []),
            projectLink: new FormControl('', []),
            projectYear: new FormControl('', []),
          });
          break;
        }
      };

      // subscribe to the new entry form to keep save button disabled
      this.entryGroup.valueChanges.subscribe((form) => {
        this.isFormEmpty = Object.values(form)
          .some((entry) => (entry as string).length === 0);
      });
    });
  }
}

