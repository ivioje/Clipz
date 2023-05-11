import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import IUser from '../models/user.model';
import { map, delay, filter, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ActivatedRoute, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersCollection: AngularFirestoreCollection<IUser>
  public isAuthenticated$: Observable<boolean>
  public isAuthenticatedWithDelay$: Observable<boolean>
  public redirect = false;

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute

  ) {
    this.usersCollection = db.collection('users')
    this.isAuthenticated$ = auth.user.pipe(
      map(user => !!user)
    )
    this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(
      delay(1000)
    )
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(e => this.route.firstChild),
      switchMap(route => route?.data ?? of({ authOnly: false }))
    ).subscribe((data) => {
      this.redirect = data.authOnly ?? false;
    })

  }

  public async createUser(userData: IUser) {
    const userCredential = await this.auth.createUserWithEmailAndPassword(
      userData.email as string, userData.password as string
    )

    if (!userCredential.user) {
      throw new Error("User can't be found");
    }

    const userDocRef = this.usersCollection.doc(userCredential.user.uid);
    await userDocRef.set({
      name: userData.name,
      email: userData.email,
      age: userData.age,
      phoneNumber: userData.phoneNumber,
    });

    await userCredential.user.updateProfile({
      displayName: userData.name
    })

    // if(!(await userCredential).user) {
    //   throw new Error("User can't be found")
    // }
    //     await this.usersCollection.doc((await userCredential).user.uid).add({
    //       name: userData.name,
    //       email: userData.email,
    //       age: userData.age,
    //       phoneNumber: userData.phoneNumber
    //     })
  }

  public async logout($event?: Event) {
    if ($event) {
      $event.preventDefault()
    }

    await this.auth.signOut()

    if (this.redirect) {
      await this.router.navigateByUrl('/')
    }
  }
}
