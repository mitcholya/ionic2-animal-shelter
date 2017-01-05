import { Component } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { MappingsService } from '../../shared/services/mappings.service';
import { Pet } from '../../shared/interfaces';


@Component({
  templateUrl: 'pets.html'
})
export class PetsPage {

  public dogs: Pet[];

  constructor(public data: DataService,
              public mappings: MappingsService) {

  }

  ionViewDidLoad() {

  }

  ionViewWillEnter() {
   this.data.getDogs().on('value', (snapshot) => {
      console.log(snapshot.val());
      this.dogs = this.mappings.getPets(snapshot);
    });

  }

  addPet() {

    let dog = {
      petname: 'Жучка',
      petage: 10,
      petdescription: 'Пионер космоса......'
    }

    this.data.addDogs(dog);
  }

}