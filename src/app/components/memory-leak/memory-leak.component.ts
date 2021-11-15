import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject, Subscription, timer} from 'rxjs';
import {take, takeUntil, tap} from 'rxjs/operators';
import {User, UserService} from 'src/app/services/user.service';
import {RandomIntegerGenerator} from 'src/app/utils/random';

@Component({
  selector: 'app-memory-leak',
  templateUrl: './memory-leak.component.html',
  styleUrls: ['./memory-leak.component.scss']
})
// // ### Naive Version without unsubscribe logic
// export class MemoryLeakComponent implements OnInit, OnDestroy {
//   user?: User;
//   instanceId = new RandomIntegerGenerator(999).next();

//   constructor(private userService: UserService) {}

//   ngOnInit() {
//     console.log(`[MemoryLeakComponent ${this.instanceId}]: ngOnInit`);

//     this.userService.user$.subscribe(user => {
//       console.log(`[MemoryLeakComponent ${this.instanceId}]: new user with id ${user.id}`)
//       this.user = user;
//     })
//   }

//   ngOnDestroy() {
//     console.log(`[MemoryLeakComponent ${this.instanceId}]: ngOnDestroy`)
//   }
// }
// // ### Version with manual unsubscribe
// export class MemoryLeakComponent implements OnInit, OnDestroy {
//   user?: User;
//   instanceId = new RandomIntegerGenerator(999).next();
//   subscription?: Subscription;

//   constructor(private userService: UserService) {}

//   ngOnInit() {
//     console.log(`[MemoryLeakComponent ${this.instanceId}]: ngOnInit`)

//     this.subscription = this.userService.user$.subscribe(user => {
//       console.log(`[MemoryLeakComponent ${this.instanceId}]: new user with id ${user.id}`)
//       this.user = user;
//     })
//   }

//   ngOnDestroy() {
//     console.log(`[MemoryLeakComponent ${this.instanceId}]: ngOnDestroy`);
//     this.subscription?.unsubscribe();
//   }
// }
// ### Version with automatic unsubscribe
export class MemoryLeakComponent implements OnInit, OnDestroy {
  user?: User;
  instanceId = new RandomIntegerGenerator(999).next();
  private componentDestroyed$ = new Subject<void>();

  constructor(private userService: UserService) {}

  ngOnInit() {
    console.log(`[MemoryLeakComponent ${this.instanceId}]: ngOnInit`)

    timer(0, 1000).pipe(takeUntil(this.componentDestroyed$)).subscribe((time) => console.log(`[MemoryLeakComponent]: ${time}`));

    this.userService.user$.pipe(takeUntil(this.componentDestroyed$)).subscribe(user => {
      console.log(`[MemoryLeakComponent ${this.instanceId}]: new user with id ${user.id}`)
      this.user = user;
    })
  }

  ngOnDestroy() {
    console.log(`[MemoryLeakComponent ${this.instanceId}]: ngOnDestroy`);
    this.componentDestroyed$.next();
  }
}
// // ### Version with just one take
// export class MemoryLeakComponent implements OnInit, OnDestroy {
//   user?: User;
//   instanceId = new RandomIntegerGenerator(999).next();

//   constructor(private userService: UserService) {}

//   ngOnInit() {
//     console.log(`[MemoryLeakComponent ${this.instanceId}]: ngOnInit`)

//     this.userService.user$.pipe(take(3)).subscribe(user => {
//       console.log(`[MemoryLeakComponent ${this.instanceId}]: new user with id ${user.id}`)
//       this.user = user;
//     })
//   }

//   ngOnDestroy() {
//     console.log(`[MemoryLeakComponent ${this.instanceId}]: ngOnDestroy`);
//   }
// }
// // ### Version with async pipe
// export class MemoryLeakComponent implements OnInit, OnDestroy {
//   instanceId = new RandomIntegerGenerator(999).next();
//   user$: Observable<User> =  this.userService.user$.pipe(tap(user => {
//     console.log(`[MemoryLeakComponent ${this.instanceId}]: new user with id ${user.id}`)
//   }));

//   constructor(private userService: UserService) {}

//   ngOnInit() {
//     console.log(`[MemoryLeakComponent ${this.instanceId}]: ngOnInit`)
//   }

//   ngOnDestroy() {
//     console.log(`[MemoryLeakComponent ${this.instanceId}]: ngOnDestroy`);
//   }
// }
