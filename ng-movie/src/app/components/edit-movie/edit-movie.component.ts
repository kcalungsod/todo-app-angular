import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup, ValidatorFn, AbstractControl, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Movie } from 'src/app/models/movie';
import { MoviesApiService } from 'src/app/services/movies-api.service';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.scss']
})
export class EditMovieComponent {
  private editMovie: Movie | undefined;

  @Input()
  set movie(value: Movie) {
    this.editMovie = value;
    this.setFormValue();
  }

  @Output()
  movieUpdated: EventEmitter<Movie> = new EventEmitter<Movie>();


  formGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    phase: new FormControl(null, [Validators.required]),
    budget: new FormControl(null, [Validators.required, this.unsignedNumberValidator()]),
    releaseDate: new FormControl(null, [Validators.required]),
    castAndCrew: new FormGroup({
      actors: new FormArray([]),
      producers: new FormArray([])
    })
  });

  get actors(): FormArray {
    return this.castAndCrewFormGroup.controls.actors as FormArray;
  }

  get producers(): FormArray {
    return this.castAndCrewFormGroup.controls.producers as FormArray;
  }
  get castAndCrewFormGroup(): FormGroup {
    return this.formGroup.controls.castAndCrew as FormGroup;
  }

  constructor(
    protected moviesApiService: MoviesApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    const params = await this.route.params.pipe(take(1)).toPromise();
    if(params['id']) {
      this.movie = await this.moviesApiService.getMovie(params['id']).toPromise();
    }
  }

  addActor() {
    this.actors.push(new FormControl(null));
  }

  addProducer() {
    this.producers.push(new FormControl(null));
  }

  setFormValue(): void {
    if (this.formGroup && this.editMovie) {
      this.formGroup.controls.title.setValue(this.editMovie.title);
      this.formGroup.controls.phase.setValue(this.editMovie.phase);
      this.formGroup.controls.budget.setValue(this.editMovie.budget);
      this.formGroup.controls.releaseDate.setValue(this.editMovie.releaseDate);
      if (this.editMovie.castAndCrew && this.editMovie.castAndCrew.actors) {
        for (const actor of this.editMovie.castAndCrew.actors) {
          this.actors.push(new FormControl(actor))
        }
      }
      if (this.editMovie.castAndCrew && this.editMovie.castAndCrew.producers) {
        for (const producer of this.editMovie.castAndCrew.producers) {
          this.producers.push(new FormControl(producer))
        }
      }
    }
  }

  unsignedNumberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return control.value < 0 ? { unsigned: { value: control.value } } : null;
    };
  }

  async onSubmit(): Promise<void> {
    if (this.formGroup.valid && this.editMovie) {
      const updatedMovie: Movie = { ...this.editMovie }; // clone movie
      const formValue = this.formGroup.getRawValue();    // returns field including disabled fields

      updatedMovie.title = formValue.title;
      updatedMovie.phase = formValue.phase;
      updatedMovie.budget = formValue.budget
      updatedMovie.releaseDate = formValue.releaseDate;
      updatedMovie.castAndCrew = formValue.castAndCrew;

      await this.moviesApiService.editMovie(updatedMovie).toPromise();
      this.movieUpdated.emit(updatedMovie);
      this.formGroup.reset();
      this.router.navigate(['/']);
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

}


