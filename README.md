## A simple spy method decorator

### What it does?
It logs into browser console information about function execution which is listed below

### Installation
`npm install --save-dev ngx-spy`

### How to use it
Simply import the function into your component and decorate the target function with it. Like so:
	```
		import {Spy} from 'ngx-spy';
		@Component({
			...
		})
		class Example{
			@Spy()
			yourMethodHere(){
				...do something here
			}
		}
	```

### Additional notes
This decorator is available only in development mode. If you forget to remove it for production it will just execute the function and throw an error message without logging any information about execution.


### What information it provides
1. Arguments with which function was called
2. Number of function calls
3. Current execution time in milliseconds
4. Average execution time in milliseconds
5. Difference between current and previous execution time in milliseconds
