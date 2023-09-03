export interface ExampleHybridObserver {
    next: (val: any) => void | string,
    error: (err: any) => void,
    complete: () => void
}
