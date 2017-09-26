import { Component } from '@angular/core';
import { ViewController, ToastController, Platform, LoadingController } from 'ionic-angular';
//plugins
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';

//servicio
import { CargaArchivosService } from '../../providers/carga-archivos/carga-archivos';
@Component({
  selector: 'page-subir',
  templateUrl: 'subir.html',
})
export class SubirPage {
  titulo:string="";
  imgPreview:string=null;
  img:string="";

  constructor( private viewCtrl:ViewController,
               private camera:Camera,
               private toastCtrl: ToastController,
               private platform: Platform,
               private imagePicker: ImagePicker,
               private _cas:CargaArchivosService,
               private loadingCtrl:LoadingController) {
  }

  cerrarModal(){
    this.viewCtrl.dismiss();
  }

  mostrar_camara(){
    if( !this.platform.is("cordova") ){
      this.show_message("Error: Es necesario un celular!");
      return;
    }
    const options: CameraOptions = {
    quality: 40,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.imgPreview = 'data:image/jpeg;base64,' + imageData;
      this.img = imageData;

      }, (err) => {
      // Handle error
        this.show_message("Error: "+err);
        console.error("Error en la camara: "+ err);
      });

  }

  seleccionar_fotos(){
    if( !this.platform.is("cordova") ){
      this.show_message("Error: Es necesario un celular!");
      return;
    }

    let opciones:ImagePickerOptions={
      maximumImagesCount: 1,
      quality: 40,
      outputType: 1
    }

    this.imagePicker.getPictures( opciones ).then((results) => {

      for( let img of results ){
        this.imgPreview= 'data:image/jpeg;base64,'+img;
        this.img=img;
      }
      /**
      for (var i = 0; i < results.length; i++) {
          console.log('Image URI: ' + results[i]);
          break;
      }*/

    }, (err) => {
      this.show_message("Error: "+ err);
      console.error( "Error en seleccion: "+ JSON.stringify( err ) );
    });

  }

  private show_message( texto:string ){
    this.toastCtrl.create({
      message: texto,
      duration: 2500
    }).present();
  }

  crear_post(){
    console.log("Subiendo Archivo");
    let archivo={
      'titulo':this.titulo,
      'img':this.img
    }

    let loader=this.loadingCtrl.create({
        content:"Subiendo..."
    });

    loader.present();

    this._cas.cargar_imagenes_fibase( archivo )
      .then(
        ()=>{
            loader.dismiss();
            this.cerrarModal();
        },
        ( error )=>{
          loader.dismiss();
          this.show_message("Error al cargar: "+error);
        }
      )
  }

}
