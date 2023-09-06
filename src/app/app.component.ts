import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, catchError, combineLatest, defaultIfEmpty, delay, distinct, distinctUntilChanged, filter, find, first, forkJoin, from, fromEvent, fromEventPattern, interval, map, merge, Observable, of, onErrorResumeNext, pipe, ReplaySubject, retry, retryWhen, single, skip, skipUntil, skipWhile, Subject, take, takeLast, takeUntil, takeWhile, throttleTime, throwIfEmpty, timer, withLatestFrom, zip } from 'rxjs';

import { Observer } from 'rxjs';
import { ExampleHybridObserver } from './example-hybrid-observer';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'learning-angular';
  of_list: number[] = []
  of_list_interval: number[] = []
  of_observable = from([1,2, 3, 4, 5])

  observerA = {
    next: (val: any) => console.log(`Observer A: ${val}`),
    error: (err: any) => console.log(`Observer A Error: ${err}`),
    complete: () => console.log(`Observer A complete`),
  };
  
  // observable.subscribe(observerA);
  
  observerB = {
    next: (val: any) => console.log(`Observer B: ${val}`),
    error: (err: any) => console.log(`Observer B Error: ${err}`),
    complete: () => console.log(`Observer B complete`),
  };
  constructor(){}

  hybridObserver = {
    observers: [observerA],
    // registerObserver(observer: { next: (val: any) => void | string; error: (err: any) => void; complete: () => void; }) {
    registerObserver(observer: ExampleHybridObserver) {
      this.observers.push(observer);
    },
    next(value: any) {
      this.observers.forEach(observer => observer.next(value));
    },
    error(err: any) {
      this.observers.forEach(observer => observer.error(err));
    },
    complete() {
      this.observers.forEach(observer => observer.complete());
    }
  }
  document_click$ = fromEvent(document, "click");

  searchTerm$ = new Subject<string>();

  subject = new Subject();

  behavior_subject = new BehaviorSubject("Hello")

  replay_subject = new ReplaySubject(2)
  
  ngOnInit(){
    // this.of_observable.subscribe(x => this.of_list.push(x))
      
    // interval(1000).pipe(map(x => this.of_list_interval.push(x)))
    
    // console.log("typeof(observerA) = ", typeof(this.hybridObserver.observers), observerA)
    // this.hybridObserver.registerObserver(observerA);

    // this.hybridObserver.registerObserver(observerA);

    // observable.subscribe(this.hybridObserver);

    // setTimeout(() => {
    //   this.hybridObserver.registerObserver(observerB);
    // }, 1000);
    

    // const source = fromEvent(document, 'click')
    // .pipe(
    //   throttleTime(2000, undefined, {
    //     leading: false,
    //     trailing: true,
    //   }),
    //   map(event => {
    //     const e = event as MouseEvent;
    //     return {x: e.clientX, y:e.clientY};
    //   })
    //   // filter((obj) => obj.y > 200),
    // );
    // source.subscribe(console.log)


    this.searchTerm$
      .asObservable()
      .pipe(
        throttleTime(250, undefined, {
          leading: true,
          trailing: true,
        }),
        distinctUntilChanged()
      )
      .subscribe({
        next: (value) => console.log(value),
      });

      this.subject.subscribe(val => console.log("print value A = ", val))

      this.subject.next(5)
      this.subject.next(5)
      this.subject.next(5)
      this.subject.subscribe(val => console.log("print value B = ", val))
      
      this.behavior_subject.subscribe(val => console.log("Behave A = ", val))
      this.behavior_subject.next("Haha") 
      this.behavior_subject.subscribe(val => console.log("Behave B = ", val))

      this.replay_subject.subscribe(val => console.log("replay_subject A = ", val))

      this.replay_subject.next("ABC")
      this.replay_subject.next("DEF")
      this.replay_subject.next("GHI")
      this.replay_subject.next("JKL")

      this.replay_subject.subscribe(val => console.log("replay_subject B = ", val))

    // interval(1000).pipe(throttleTime(2000)).subscribe(console.log)
  }

  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerm$.next(target.value);
  }
}



// const a = map((x: number) => of(x**2))
// const a1 = filter((x: number) => x % 2 != 0)
// console.log("a1 = ", a1)
// const b = of(1, 2, 3, 4, 5)
// const c = a(b)
// // b.subscribe(x => console.log("x = ", x))
// console.log("c = ", c)
// c.subscribe(x => x.subscribe(x1 => console.log("x1 = ", x1)))

// const of_1 = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
// const of_1_odd = a1(of_1)
// of_1_odd.subscribe(x => console.log("of_1_odd = ", x))

// const filter_and_square = pipe(
//   filter((x: number) => x%2 !=0),
//   map(x => x**2)
// )
// const test_case = filter_and_square(b)
// // console.log("test_case = ", test_case)
// test_case.subscribe(x => console.log("hello = ", x))
// const test_case_2 = b.pipe(
//   filter((x: number) => x%2 !=0),
//   map(x => x**2)
// )
// test_case_2.subscribe(x => console.log("hello_world = ", x))

// fromEvent(document, 'mousemove').pipe(map(x => console.log(x)))



// const observable = new Observable(
//   (observer) => {

//     observer.next('Hello Rxjs2');
//     const id = setTimeout(() => {
//     observer.next('Hello Rxjs');
//     observer.complete();
//     }, 1000);
//     return function unsubscribe() {
//       clearTimeout(id);
//     };

//   }
// );
// observable.subscribe(console.log)

const observer = {
  next: (value: any) => console.log("value = ", value),
  error: (err: any) => console.error(err),
  complete: () => console.log('completed'),
};

const users = [
  {
    id: 'ddfe3653-1569-4f2f-b57f-bf9bae542662',
    username: 'tiepphan',
    firstname: 'tiep',
    lastname: 'phan',
  },
  {
    id: '34784716-019b-4868-86cd-02287e49c2d3',
    username: 'nartc',
    firstname: 'chau',
    lastname: 'tran',
  },
];

// merge(
//   of(users[0]).pipe(delay(2000)),
//   of(users[1]).pipe(delay(4000))
// ).subscribe(observer)

// from([1, 2, 3, 4, 5]).pipe(filter(x => x %2 == 0)).subscribe(observer)
// console.log("Of")
// of(1, 2, 3, 4, 5).pipe(filter(x => x %2 == 0)).subscribe(observer)

// console.log("From")
// from([1, 2, 3, 4, 5]).pipe(filter(x => x >= 2)).subscribe(observer)

// of(1, 2, 3, 4, 5).pipe(find(x => x % 2 == 0)).subscribe(observer)

// of(1,2,3,4,5).pipe(single(x => x >=4)).subscribe(observer)

// interval(1000).pipe(map(x => console.log("x =  ", x))).subscribe()

// interval(1000).pipe(take(10)).subscribe(observer)


// const a$ = interval(1000).pipe(take(10))

// a$.pipe(
//   delay(2000),
//   takeLast(2)).subscribe(observer)

// interval(1000).pipe(take(10), takeLast(2)).subscribe(observer)

// of(1,2,3,4,5,6,7,8,9, 10, 11).pipe(takeLast(2)).subscribe(observer)


// interval(1000).pipe(takeWhile(z => z < 10)).subscribe(observer)
// from([1,2,3,4,5,6,7,8,9,10]).pipe(takeWhile(x =>x > 8)).subscribe(observer)

// timer(0, 1000).pipe(skip(5)).subscribe(observer)


// timer(0, 1000).pipe(skipUntil(timer(6000))).subscribe(observer)

// timer(0, 1000).pipe(skipWhile(x => x < 6)).subscribe(observer)

// from([1,2,3,4,5,6,7,8,9,10]).pipe(takeWhile(x => x<10))
// interval(1000).pipe(takeWhile(x => x<10)).subscribe(observer)

// interval(1000).pipe(takeUntil(timer(5000))).subscribe(observer)

// of(1,2,3,4,4,5,5,6,6,8,8,8,9,7,7,5, 7).pipe(distinct()).subscribe(observer)

// interval(1000).pipe(take(5)).subscribe(observer)


// interval(1000)
// .pipe(  skipUntil(          interval(10000)    ) )
// // .pipe(take(7))
// .subscribe(observer)

// of(1,2,3,1,2,3,1,2,3).pipe(distinct()).subscribe(observer)
// of(1,1,2,1,3,2,2,3).pipe(distinctUntilChanged()).subscribe(observer)
// of({age: 5, name: "ABC"}, {age:10, name: "DEF"}, {age:15, name: "GHI"}, {age:15, name: "JKT"}).pipe(distinctUntilChanged((a, b) => a.age == b.age)).subscribe(observer)


// of(
//   { age: 4, name: 'Foo' },
//   { age: 6, name: 'Foo' },
//   { age: 7, name: 'Bar' },
//   { age: 5, name: 'Foo' }
// )
//   .pipe(distinctUntilChanged((a, b) => a.name === b.name)).subscribe(observer)


forkJoin([
  of("Hello").pipe(delay(1000)),
  of("World").pipe(delay(3000)),
  interval(1000).pipe(take(3))
]).pipe(map(([x, y, z]) => {
    console.log("x = ", x)
    console.log("y = ", y)
    console.log("z = ", z)
  }
))


// combineLatest(
//   of("Hello").pipe(delay(1000)),
//   of("World").pipe(delay(3000)),
//   interval(1000).pipe(take(6))
// ).subscribe(observer)

// combineLatest(of(1, 2, 3), of(4,5,6), of(7,8,9)).subscribe(observer)

const age$ = of(29, 28, 30);
const name$ = of('Chau', 'Trung', 'Tiep');
const isAdmin$ = of(true, false, true);

zip(age$, name$, isAdmin$).pipe(
  map(([age, name, isAdmin]) => ({ age, name, isAdmin }))
)
// output:
// { age: 29, name: 'Chau', isAdmin: true }
// { age: 28, name: 'Trung', isAdmin: false }
// { age: 30, name: 'Tiep', isAdmin: true }

// dùng với projectFunction
zip(age$, name$, isAdmin$)


const withLatestFrom$ = interval(1000).pipe(map(x => `We need value ${x}`))

// fromEvent(document, "click").pipe(withLatestFrom(withLatestFrom$)).subscribe(observer)
const cached = [4, 5];

// of(1, 2, 3, 4, 5)
//   .pipe(
//     map((n) => {
//       if (cached.includes(n)) {
//         throw new Error('Duplicated: ' + n);
//       }
//       return n;
//     }),
//     catchError((err, caught) => of(err) ),
//     // retryWhen((error) => error),
//   )
//   .subscribe(observer);



// of().pipe(
//   delay(3000),
//   throwIfEmpty(() => "ABC")
// ).subscribe(observer)



const observable = interval(500).pipe(take(5));

const observerA = {
  next: (val: any) => console.log(`Observer A: ${val}`),
  error: (err: any) => console.log(`Observer A Error: ${err}`),
  complete: () => console.log(`Observer A complete`),
};

// observable.subscribe(observerA);

const observerB = {
  next: (val: any) => console.log(`Observer B: ${val}`),
  error: (err: any) => console.log(`Observer B Error: ${err}`),
  complete: () => console.log(`Observer B complete`),
};


function x(x: any, arg1: (PointerEvent: any) => void) {
  throw new Error('Function not implemented.');
}
// setTimeout(() => {
//   observable.subscribe(observerB);
// }, 1000);