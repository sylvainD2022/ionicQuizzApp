import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Answer } from '../models/answer';
import { Question } from '../models/question';
import { OpenTriviaService } from '../open-trivia.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  pseudo: string = '';
  difficulties: string[] = ['easy', 'medium', 'hard'];
  difficulty: string = 'easy';
  nextQuestion: boolean = false;
  hideForm: boolean = false;
  listQuestions: any[] = [];
  currentQuestion: Question;
  indexQuestion: number = 0;
  score: number = 0;
  endGame: boolean = false;

  constructor(private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private openTriviaSrv: OpenTriviaService) {}

  async begin() {
    if (this.pseudo.length >= 3) {
      this.hideForm = true;
      this.loadListQuestions();
    } else {
      const alert = await this.alertCtrl.create({
        header: "Informations manquantes",
        message: 'Veuillez rentrer un pseudo de 3 caractères minimum.',
      });
      alert.present();
    }
  }

  async loadListQuestions():Promise<any> {
    this.listQuestions = await this.openTriviaSrv.getQuestions(this.difficulty);
    this.loadCurrentQuestion();
  }

  loadCurrentQuestion() {
    let question = this.listQuestions[this.indexQuestion];
    let answers: Answer[] = [];
    answers.push(new Answer(question.correct_answer, true));
    question.incorrect_answers.forEach(element => {
      answers.push(new Answer(element, false));
    });
    answers.sort((a, b) => 0.5 - Math.random());
    this.currentQuestion = new Question(question.category, question.type, question.difficulty, question.question, answers);
  }

  async loadNextQuestion() {
    if (this.indexQuestion < this.listQuestions.length - 1) {
      this.nextQuestion = false;
      this.indexQuestion++;
      this.loadCurrentQuestion();
    }
  }

  async answer(response: Answer) {
    if (response.correct && !this.nextQuestion) {
      this.score++;
    }
    this.nextQuestion = true;
    const toast = await this.toastCtrl.create({
      message : 'Votre réponse est : ' + response.answer,
      position: 'bottom',
      duration: 5000
    });
    toast.present();
    if (this.indexQuestion === this.listQuestions.length - 1) {
      this.endGame = true;
      const toast = await this.toastCtrl.create({
        message : 'Bien joué ! Votre score est de : ' + this.score + ' points !',
        position: 'bottom',
        duration: 5000
      });
      toast.present();
    }
  }

  playAgain() {
    this.hideForm = false;
    this.score = 0;
    this.endGame = false;
    this.indexQuestion = 0;
    this.listQuestions = [];
    this.nextQuestion = false;
  }
}
