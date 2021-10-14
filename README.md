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
