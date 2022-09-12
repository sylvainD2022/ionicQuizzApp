import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  question:string ="";
  easyQ:string = "tu veux une question facile?";
  mediumQ:string ="quelle est la couleur du cheval blanc d'henry IV ?";
  hardQ:string = "les chaussette avec les claquettes, bon ou mauvais goût ?";
  ishiddenForm:boolean = false;//masquage du formulaire
  questionHidden:boolean = true;//masquage de la question
  errorHidden:boolean = true;//masquage du label error pseudo
  suivantBtnHide:boolean = true;//masquage du bouton suivant
  pseudo : string = "";
  difficultes: string[] = ["easy","medium","hard"];
  diff:string = "";
  constructor() {}
  valider(){
    if (this.pseudo.length <3) {
      this.errorHidden = !this.errorHidden;
      
    }else{

      this.ishiddenForm=true;
      this.questionHidden=!this.questionHidden;
      this.errorHidden = true;
     switch (this.diff) {
      case "easy":
        this.question=this.easyQ;
        break;
      case "medium": 
        this.question=this.mediumQ;
        break;
      case "hard": 
        this.question=this.hardQ;
        break;
      default:
        break;
     }
    }
  }
  repondre(){

    this.suivantBtnHide = !this.suivantBtnHide;
    //this.questionHidden = !this.questionHidden;
  }
}
