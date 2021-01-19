import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MarqueService } from 'src/app/components/shared/services/marque.service';
import { Marque } from 'src/app/modals/marque.model';


@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.sass']
})
export class BrandsComponent implements OnInit {

  // brands: string[] = ['all', 'Lenovo', 'Dell', 'Dell', 'Lg', 'Samsung'];
  brands: Marque[] = [];
  public modeSelect = "Tout"

  @Output() brandChanged = new EventEmitter();
  constructor(private marqueService: MarqueService, private fb: FormBuilder) { }

  ngOnInit() {


    this.marqueService.getMarques().subscribe((marques) => {
      let all = {id: 0, name: 'Tout'};
      marques.unshift(all);
      this.brands = marques;

    

    });
  }


  brendSelect(event) {
  this.brandChanged.emit(
    event.value
  );
  }

}
