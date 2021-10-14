# RxJS Recipes
This repository demonstrates some recipes and options for using RxJS features for common problems in Angular Apps.

Start the app with `npm start` and play around with it on `localhost:4200`. Open the console to see more info.

## Avoiding Memory Leaks
A memory leak in  in an Angular App can occur if Subscriptions to RxJS Obersvables are not cleaned upd properly (unsubscribed) once they are no longer needed, e.g. when the component is destroyed. Take a look at [the MemoryLeakComponent](src/app/components/memory-leak/memory-leak.component.ts) to see this and all possible solutions in action.

### Manual unsubscribe
You can save a reference to the subscription and manually unsubscribe once you no longer need it, e.g. when a component is destroyed. This is quite some work and can be easy to forget.

### Automatic unsubscribe on Destroy
A more automatic way of the manual usubscribe is to use `takeUntil`. This will end a stream once the observable you specify emits. You can then use a `Subject` that only emits once the component is destroyed and thus ends all Subscriptions it is connected to with `takeUntil`.

### Automatic unsubscribe after the first value
If you are only interested in the first emission anyways and don't want to listen for later values you can use `take(1)` to complete the stream after the first emission. 

### Use the async pipe
The solution that requires the least Typescript code is using the `async` pipe in the template. This will automatically subscribe and unsubscribe to the given observable. 

## RxJS Operators for common data and event handling tasks
There are many reoccuring tasks in FE Applications like sharing and caching fetched data or reloading data after an event that can be handled with Observables and RxJS Operators (inside a chain of funtions added to the Observable with `.pipe`). Checkout the [UserService](src/app/services/user.service.ts) for some examples.

### Cache results to avoid duplicate network calls
This can be achieved by using the `shareReplay` operator which will save the latest emitted value of a stream and give it to later subscribers directly without triggering logic that came before it (e.g. a network call).

### Giving a stream a default value
You can use `startWith` to give an Observable stream a starting value. Combined with `shareReplay` this will behave like a `BehaviorSubject`.

### Force a refresh
How can you force refresh an Observable like
```typescript
this.http.get(...)
  .pipe(shareReplay(1))
```
which will cache values for later subscribers? 

This is not done with a simple operator but requires a little refactoring. Translated to RxJS "refreshing" means listen to another Observable (refresh requests over time) and trigger the original action every time a new value is emitted (a refresh is requested). 

To achieve a refreshable (but still cached Observable) we can write something like this:
```typescript
export class MyService {
  private refreshRequest = new Subject<void>();
  data$ = this.refreshRequest.pipe(
    //get data
    ...
  )

  onRefreshButtonPressed() {
    this.refreshRequest.next();
  }
```
