import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegService } from '../../registration/reg.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  searchForm!: FormGroup;
  carData: any;

  constructor(private fb: FormBuilder, private regService: RegService) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      SearchByModelName: ['', [Validators.required]],
      SearchByModelCode: ['', [Validators.required]],
      OrderbyManufacturingDate: [true],
      SortByUpdatedDate: [true]
    });

    // Fetch and display car details by default
    this.regService.getcar('', '', true, true).subscribe(
      response => {
        console.log('Cars retrieved successfully', response);
        this.carData = response.result;  // Assuming response.result contains the list of cars
        console.log(this.carData[0].brand)
      },
      error => {
        console.error('Failed to retrieve cars', error);
      }
    );
  }

  onSearch() {
    if (this.searchForm.valid) {
      const { SearchByModelName, SearchByModelCode, OrderbyManufacturingDate, SortByUpdatedDate } = this.searchForm.value;
      console.log('Search Parameters:', this.searchForm.value);  // Log the search parameters for debugging

      this.regService.getcar(SearchByModelName, SearchByModelCode, OrderbyManufacturingDate, SortByUpdatedDate).subscribe(
        response => {
          console.log('Search successful', response);
          this.carData = response.result[0];  // Assuming response.result contains the list of cars
        },
        error => {
          console.error('Search failed', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
}