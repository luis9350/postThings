import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { SubirPage } from '../subir/subir';
//angularFire
//import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

//servicios
import { CargaArchivosService } from '../../providers/carga-archivos/carga-archivos';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //posts: FirebaseListObservable<any[]>;
  hayMas:boolean=true;

  constructor( private modalCtrl:ModalController,
               private navCtrl: NavController,
               private _cas:CargaArchivosService){

      //this.posts = af.list('/post');
      this._cas.cargar_imagenes();

  }

  cargar_siguientes( infiniteScroll:any ){
    console.log("siguientes..");
    this._cas.cargar_imagenes()
      .then(
        ( existenMas:boolean )=>{
          this.hayMas=existenMas;
          infiniteScroll.complete();
        }
      );

  }

  mostrarModal(){
    let modal= this.modalCtrl.create(SubirPage);

    modal.present();
  }

}
