import { isDevMode } from '@angular/core';
export type Speed = 'slower' | 'faster';

export function Spy(){
	let lastArgs,callTimes=0,
	avgExecutionTime,totalExecTime=0,
	currentExecTime=0,originalFn,
	lastExecTime=0;

	return function(target,key,descriptor){
		originalFn = descriptor.value.bind(target);
		let targetName = target.constructor.name;
		if(isDevMode()){
			descriptor.value = function(...args){
				lastArgs = args;
				let start = performance.now();
				originalFn(lastArgs);
				let end = performance.now();
				currentExecTime = end-start;
				totalExecTime +=currentExecTime;
				callTimes++;
				avgExecutionTime = totalExecTime/callTimes;
				console.group();
			      console.info('Last arguments: ',[...lastArgs]);
			      console.info('Function "%s" of class "%s" was called %i times',key,targetName,callTimes);
			      console.info('Current execution time is ',currentExecTime,' ms');
			      console.info('Average execution time is ',avgExecutionTime,' ms');
			      if(callTimes>1){
			      	let diff = lastExecTime - currentExecTime;
			      	let speed:Speed = diff > 0 ? 'slower' : 'faster';
			      	diff = Math.abs(diff);
			      	let color:string = speed == 'slower' ? '#b71c1c' : '#33691e';
			      	console.info('%cIt is %ims %s than previous time',
			      		`color:#ffffff;background:${color}`,diff,speed);
			      }
    			console.groupEnd();
    			lastExecTime = currentExecTime;
			}
		}else{
			console.error(`You are using Spy decorator in production. Perhaps you forgot to remove it. Please remove it 
				from function "${key}" on class "${targetName} or function will not be executed."`);
		}
		return descriptor;
	}
}