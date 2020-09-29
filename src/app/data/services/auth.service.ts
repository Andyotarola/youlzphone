import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { auth } from 'firebase/app'
import { from, Observable, of } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { User } from 'src/app/data/schema/user'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;


  constructor(
    private afAuth:AngularFireAuth,
    private afs:AngularFirestore,
    private router:Router
  ){

    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    )
  }


  async updateData(user:User, password:string){
    if(password !== ''){
      (await this.afAuth.currentUser).updatePassword(password)
    }
    this.afs.doc('users/'+user.uid).set(user, {merge:true}).then(()=>{
      this.router.navigate(['/'])
    })
  }
  
  loginWithEmailAndPassword(email:string, password:string){
    return this.afAuth.signInWithEmailAndPassword(email, password)
  }

  createUser(email:string, password:string){
    return from(this.afAuth.createUserWithEmailAndPassword(email, password))
  }

  async loginWithGoogle(){
    const provider = new auth.GoogleAuthProvider()
    const credential = await this.afAuth.signInWithPopup(provider);
    this.createUserIfItDoestNoTExist(credential.user).then()
    
    this.router.navigate(['/']);
  }


  private createUserIfItDoestNoTExist(user:User){
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    return userRef.snapshotChanges()
      .pipe(
        map(action => {
          let data = action.payload.data()
          if(!data){
            let newUSer = { 
              uid: user.uid, 
              email: user.email, 
              displayName: user.displayName, 
              photoURL: user.photoURL
            } 
            return userRef.set(newUSer, { merge: true })
          }

          return action;

        })
      ).toPromise()

  }

  async signOut() {
    await this.afAuth.signOut();
    // this.router.navigate(['/']);
    location.href = ''
  }

}
