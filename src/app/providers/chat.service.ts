import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import{Mensaje} from '../interfaces/mensaje.interface'
import { map } from 'rxjs/operators';

import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  // items: Observable<Item[]>;

  public chats: Mensaje  [] = [];
  public usuario: any = {}

  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth) {

    this.afAuth.authState.subscribe( user=>{
      console.log('Estado del usuario: ', user );
      if (!user ){
        return
      } 

      this.usuario.nombre = user.displayName;
      this.usuario.uid = user.uid;
    } )

   }

  login( proveedor : string) {
    this.afAuth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider());
  }
  logout() {
    this.usuario = {};
    this.afAuth.signOut();
  }

  cargarMensajes(){
    this.itemsCollection = this.afs.collection<Mensaje>('chats', 
      ref=> ref.orderBy('fecha', 'desc')
               .limit(5));
    
    return this.itemsCollection.valueChanges().pipe(
      map ( (mensajes: Mensaje[]) =>{
        console.log(mensajes );

        this.chats= [];

        for(let mensaje of mensajes){
          this.chats.unshift(mensaje);
        }
        return this.chats;
        // this.chats= mensajes;
      })  );
                
    }

    agregarMensaje( texto: string){

      let mensaje: Mensaje={
        nombre: this.usuario.nombre, 
        mensaje: texto,
        fecha: new Date().getTime(),
        uid: this.usuario.uid
      }

      return this.itemsCollection.add(mensaje);

    }
  }
