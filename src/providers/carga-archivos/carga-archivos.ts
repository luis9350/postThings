import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase';


@Injectable()
export class CargaArchivosService {

  private CARPETA_IMAGENES:string="img";
  private POSTS:string="post";

  imagenes:any[]=[];
  lastKey:string=undefined;

  constructor( public afDB:AngularFireDatabase,
               public toastCtrl:ToastController) {

  }

  cargar_imagenes(){
    return new Promise( (resolve, reject )=>{
      this.afDB.list("/post", {
        query: {
          limitToLast:4,
          orderByKey:true,
          endAt: this.lastKey
        }
      })
      .subscribe( posts=>{
          console.log(posts);
          if( this.lastKey ){
            posts.pop();
          }

          if( posts.length == 0){
            console.log("Ya no existen registros");
            resolve();
            return;
          }

          this.lastKey=posts[0].$key;

          for(let i=posts.length-1;i>=0;i--){
            let post=posts[i];
            this.imagenes.push( post );
          }

          resolve( true );
      } )
    });
  }

  cargar_imagenes_fibase( archivo:archivoSubir ){

    let promesa= new Promise( (resolve, reject)=>{
      this.show_message("Inicio de carga");
      let storageRef=firebase.storage().ref();
      let nombreArchivo=new Date().valueOf();

      let uploadTask:firebase.storage.UploadTask=
            storageRef.child(`${ this.CARPETA_IMAGENES }/${ nombreArchivo }`)
            .putString( archivo.img, 'base64', { contentType: 'image/jpeg' });

      uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
          ( snapshot )=>{},//saber el avance del archivo
          ( error )=>{//manejo de errores
              this.show_message("Error al subir: "+error);
              console.log("Error al subir", JSON.stringify( error ));
              reject(error);//informar el error
          },
          ()=>{//termino el proceso
            let url=uploadTask.snapshot.downloadURL;
            this.show_message("Imagen carada exitosamente");
            this.crear_post( archivo.titulo, url );
            resolve();//nos dice todo esta bien podemos continuar

          }
        )
    });

    return promesa;
  }

  private crear_post( titulo:string, url:string ){
    let post:archivoSubir={
      img:url,
      titulo:titulo
    };

    let $key = this.afDB.database.ref(`${ this.POSTS }`).push( post ).key;
    post.$key = $key;

    this.imagenes.push( post );

  }

  private show_message(texto:string){
    this.toastCtrl.create({
      message:texto,
      duration:2500
    }).present();
  }
}

interface archivoSubir{
  $key?:string;
  img:string;
  titulo:string;
}
