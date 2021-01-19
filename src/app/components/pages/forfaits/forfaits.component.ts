import { Component, OnInit } from '@angular/core';
import {Forfait} from '../../../modals/forfait.model';
import {ForfaitService} from '../../shared/services/forfait.service';
import {ProductService} from '../../shared/services/product.service';
import {OperateurService} from '../../shared/services/operateur.service';
import {Operateur} from '../../../modals/operateur.model';

@Component({
  selector: 'app-forfaits',
  templateUrl: './forfaits.component.html',
  styleUrls: ['./forfaits.component.sass']
})
export class ForfaitsComponent implements OnInit {

  public forfaits : Forfait[] = [];
  public operateurs : Operateur[] = [];

  public colorList = ["greenColor","blueColor","redColor","orangeColor"];
  public colorMatchForfait = [];
  constructor(private forfaitService: ForfaitService, private productService: ProductService, private operateurService: OperateurService) { }

  ngOnInit(): void {

    this.forfaitService.getForfaits().subscribe((forfaits) =>{
      console.log(forfaits);
      this.forfaits = forfaits;
      this.randomColor();

      this.operateurService.getOperateurs().subscribe((operateurs) =>{
        this.operateurs = operateurs;
      });
    });

  }

  randomColor(){
    //get a color for each forfait
    for(let i =0; i<this.forfaits.length; i++){
      //generate a random number between 0 and number of forfait
      let colorNumber = Math.floor(Math.random() * (this.colorList.length));
      //check if the color is different from the previous if false then
      if(this.colorMatchForfait[i-1] ==="pricingTable "+this.colorList[colorNumber]){
        //check if it's the last color of the defined list then set color to the first of the list
        if(colorNumber === this.colorList.length - 1){
          colorNumber = 0;
        }else{
          //else take the next color
          colorNumber = colorNumber+1;
        }
      }
      this.colorMatchForfait.push("pricingTable "+this.colorList[colorNumber]);
    }

  }

  getOperateurById(id: number){

    let operateur= this.operateurs.filter(operateur => operateur.id === id)[0];
    return operateur;

  }


}
