import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-quote-form',
  standalone: false,
  templateUrl: './quote-form.component.html',
  styleUrl: './quote-form.component.css'
})
export class QuoteFormComponent {
  @Output() closeForm = new EventEmitter<void>();

  title = 'Contact Information Form';
  suffixOptions: string[] = ['', 'Jr.', 'Sr.', 'II', 'III', 'IV', 'V'];

  quoteForm: FormGroup;

  constructor(private fb: FormBuilder) {

    this.quoteForm = this.fb.group({
      name: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        suffix: ['']
      }),
      address: this.fb.group({
        addrLineOne: ['', Validators.required],
        addrLineTwo: [''],
        addrCity: ['', Validators.required],
        addrZip: ['', [Validators.required, Validators.pattern(/^\d{5}(-\d{4})?$/)]] // Accepts 12345 or 12345-6789
      }),
      contact: this.fb.group({
        phoneNum: ['', [Validators.required, Validators.pattern(/^(?:\d{10}|\d{3}-\d{3}-\d{4}|1-\d{3}-\d{3}-\d{4})$/)]],
        phoneExt: ['', [Validators.pattern(/^\d{1,5}$/)]], // Optional, up to 5 digits
        phoneType: ['cell', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        notes: ['']
      })
    });
  }

  // Method to emit close event to parent
  close(): void {
    this.closeForm.emit();
  }

  onSubmit() {
    this.close();
    //if (this.quoteForm.valid) {
    //  console.log('Form Data:', this.quoteForm.value);
    //  // You can close the form automatically after submit if you want:
    //  this.close();
    //} else {
    //  this.quoteForm.markAllAsTouched();
    //}
  }

}
