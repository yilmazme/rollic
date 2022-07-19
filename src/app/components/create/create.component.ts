import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import Game from 'src/app/models/game.dto';
import { GameService } from 'src/app/services/game.service';
import { first, Subscription, take } from 'rxjs';
import AlertService from 'src/app/services/alert.service';

class UploadImage {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'rollic-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  editId: string;
  gameForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  uploadFile: UploadImage;
  selectedFile: UploadImage;

  constructor(
    private router: Router,
    private gameService: GameService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.gameForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(2)]],
      owner: [
        null,
        [
          Validators.required,
          Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/),
        ],
      ],
      bundle: [
        null,
        [
          Validators.required,
          Validators.pattern(
            /^([A-Za-z]{1}[A-Za-z\d_]*\.)+[A-Za-z][A-Za-z\d_]*$/
          ),
        ],
      ],
      iconUrl: [null, [Validators.required]],
    });
  }

  get f() {
    return this.gameForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.gameForm.invalid) {
      return;
    }

    this.addGame();
  }
  addGame() {
    const newGame: Game = {
      id: '',
      name: this.gameForm.get('name')?.value,
      owner: this.gameForm.get('owner')?.value,
      bundle: this.gameForm.get('bundle')?.value,
      iconUrl: this.uploadFile.src,
    };
    console.log(newGame);
    this.gameService
      .addGame(newGame)
      .pipe(first())
      .subscribe({
        next: (res) => {
          AlertService.Alert(
            'Game added',
            'game added successfully',
            'success'
          ).then(() => {
            this.gameForm.reset();
            this.submitted = false;
            this.loading = false;
            this.router.navigate(['/games']);
          });
        },
        error: (err) =>
          AlertService.Alert('Game not added', 'Something went wrong', 'error'),
      });
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.uploadFile = new UploadImage(event.target.result, file);
      this.selectedFile = event.target.result;
    });

    reader.readAsDataURL(file);
    console.log(this.uploadFile);
  }

  resetForm() {
    this.gameForm.reset();
  }
  goListPage() {
    this.router.navigate(['/games']);
  }
}
