import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatListOption } from '@angular/material/list';
import { AboutEntry, AboutUrl, Course, CourseCategory, DatabaseCommunicator } from '../../middleware/DatabaseCommunicator';

@Component({
  selector: 'add-items-page',
  templateUrl: './add-items-page.component.html',
  styleUrls: ['./add-items-page.component.scss']
})
export class AddItemsPage implements OnInit, AfterViewInit {
  categoryControl = new FormControl('', []);
  courseCategoryControl = new FormControl('', []);

  entryGroup: FormGroup;
  bulletControl: FormControl = new FormControl('', [Validators.required]);
  bullets: string[] = [];
  courses: Course[] = [];
  aboutUrls: AboutUrl[] = [];
  aboutEntries: AboutEntry[] = [];

  isFormEmpty: boolean = true;
  courseCategories: CourseCategory[] = [];

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

  addCourse(name: string, status: string) {
    this.courses.push({ name, status });
    this.entryGroup.get('courseName').setValue('');
    this.entryGroup.get('courseStatus').setValue('');
  }

  addAboutEntry() {
    const title = this.entryGroup.get('aboutEntryTitle');
    const value = this.entryGroup.get('aboutEntryValue');
    this.aboutEntries.push({ title: title.value, value: value.value });
    title.setValue('');
    value.setValue('');
  }

  addAboutUrl() {
    const url = this.entryGroup.get('aboutUrlUrl');
    const imageUrl = this.entryGroup.get('aboutUrlImage');
    const altText = this.entryGroup.get('aboutUrlAlt');
    this.aboutUrls.push({
      url: url.value,
      image: imageUrl.value,
      alt: altText.value,
    });
    url.setValue('');
    imageUrl.setValue('');
    altText.setValue('');
  }

  deleteAboutEntries(entriesToDelete: MatListOption[]) {
    entriesToDelete.forEach((entry) => {
      this.aboutEntries.splice(this.aboutEntries.indexOf(entry.value), 1);
    });
  }

  deleteAboutUrls(urlsToDelete: MatListOption[]) {
    urlsToDelete.forEach((url) => {
      this.aboutUrls.splice(this.aboutUrls.indexOf(url.value), 1);
    });
  }

  /**
   * Deletes all the selected courses from the courses to be saved.
   * @param coursesToDelete - selected courses to delete
   */
  deleteCourses(coursesToDelete: MatListOption[]) {
    coursesToDelete.forEach((course) => {
      this.courses.splice(this.courses.indexOf(course.value), 1);
    });
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
        break;
      }
      case 'project': {
        const entry = {
          name: this.entryGroup.get('projectName').value,
          year: this.entryGroup.get('projectYear').value,
          link: this.entryGroup.get('projectLink').value,
          bullets: this.bullets,
        };

        isSuccess = await DatabaseCommunicator.addProject(entry);
        break;
      }
      case 'course': {
        const entry = {
          category: this.entryGroup.get('categoryName').value,
          courses: this.courses,
        };

        if (entry.category === 'New Category')
          entry.category = this.entryGroup.get('newCategory').value;

        isSuccess = await DatabaseCommunicator.addCourses(entry.category, entry.courses);
        break;
      }
      case 'about': {
        const aboutInfo = {
          entries: [...this.aboutEntries],
          urls: this.aboutUrls,
        };

        const profile = this.entryGroup.get('aboutProfile');
        if (profile.value) {
          aboutInfo.entries.push({ title: 'Profile', value: profile.value });
        }
        isSuccess = await DatabaseCommunicator.addAboutInformation(aboutInfo);
        break;
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
        case 'course': {
          this.entryGroup = new FormGroup({
            categoryName: this.courseCategoryControl,
            newCategory: new FormControl('', []),
            courseName: new FormControl('', []),
            courseStatus: new FormControl('', []),
          });
          break;
        }
        case 'about': {
          this.entryGroup = new FormGroup({
            aboutEntryTitle: new FormControl('', [Validators.required]),
            aboutEntryValue: new FormControl('', [Validators.required]),
            aboutProfile: new FormControl('', []),
            aboutUrlUrl: new FormControl('', [Validators.required]),
            aboutUrlImage: new FormControl('', [Validators.required]),
            aboutUrlAlt: new FormControl('', []),
          });
          break;
        }
      };

      // subscribe to the new entry form to keep save button disabled
      this.entryGroup.valueChanges.subscribe((form) => {
        // the form control leaves residue of the new category if it was switch
        // from new category to an existing category
        if (form.categoryName && form.newCategory !== '' && form.categoryName !== 'New Category')
          this.entryGroup.get('newCategory').setValue('');
        if (form.hasOwnProperty('courseName'))
          this.isFormEmpty = (form.categoryName === 'New Category' && form.newCategory === '') || this.courses.length === 0;
        else
          this.isFormEmpty = Object.values(form)
            .some((entry) => (entry as string).length === 0);
      });
    });
  }

  ngAfterViewInit() {
    DatabaseCommunicator.getCategoryList().then((categories) => {
      this.courseCategories = categories;
    });
    this.courseCategoryControl.setValue('New Category');
  }
}

