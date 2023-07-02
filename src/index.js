import { of, from,fromEvent,interval } from "rxjs";  
import { map, mergeMap, exhaustMap, concatMap,switchMap , filter, take, scan ,reduce,tap } from "rxjs/operators";
import { ajax } from 'rxjs/ajax'


// 'https://jsonplaceholder.typicode.com/todos/1'
// const observable = fromEvent(
//     document,'keydown'
//     ).pipe(
//         filter((event)=>event.code  === 'Space'? console.log("space"):false),
//     )
const button = document.querySelector('#btn')
const observable =  fromEvent(
    button,'click'
).pipe(
    exhaustMap(
        () => {
return ajax.getJSON( 'https://jsonplaceholder.typicode.com/todos/1' ).pipe(
                take(5),  
                tap({
                    complete(){
                        console.log("Inner observable completed!")
                    }
                }),
            )

            // return ajax.getJSON(
            //     'https://jsonplaceholder.typicode.com/todos/1'
            // )
        }
    )
)

// const observable = interval(500).pipe(
// take(5),
// tap({
//     next(val) {
//         console.log(val) 
//     }
// }),
// reduce(
//     (acc,val) => acc + val,0
// )
// )


// const numbersWithSymbols = observable.pipe(
//     map((value) => {
//        temp =  `$${value}`
//         console.log(temp)
//     })
// )
// )

// console.log(numbersWithSymbols)
const subscription = observable.subscribe(
{
    next(value){
        console.log(value)
    },
    complete() {
        console.log("complete")
    }
})

