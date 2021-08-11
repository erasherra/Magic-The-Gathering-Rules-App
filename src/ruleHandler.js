
let rules = {};

let limit = 5000;


export function formateRulesToJson(ruleInText){
	
	console.log('ruleInText', ruleInText.substring(0,20));
	
	ruleInText.split("\n").forEach(function(line, index, arr) {
		
		if (index === arr.length - 1 && line === "" /*|| index > limit*/) { return; }
		if(line.match(/\S/)){
			let subString = line.substring(0,10)
			if(subString.match(/([0-9]+[.]+[0-9]+[a-g])|([0-9]+[.])/)){
				//console.log(index + " " + line);
				
				filterRules(line);
				
				
				//console.log();
			}
			
		}
		
		
	});
	
	let result = createObject(rules);
	
	return result;
	
}

function filterRules(line){
	let key = line.substring(0,10).split(" ")[0];
	
	
	//TODO replace with regex or filter
	
	if(!(key in rules)){
		rules[key] = line;
	}
	
	
	//TODO replace with regex or filter
	/*
	if(key.length < 3){
		console.log("Tittle")
		rules[]
	}else if(key.length <= 4){
		console.log("Chapter")
		
	}else{
		console.log("Rule")
		
	}
	*/
}

let obj = {
	
	chapter:null,
	name:null,
	rules:[]
	
};

function createObject(rules){
	
	let arr = [];
	let ruleArr = [];
	for (let key in rules) {
		//console.log(key, rules[key]);
		if(key.length < 3){
			continue;
		}
		
		if(key.length <= 4){
			obj = new Object();
			obj.chapter = key;
			obj.name = rules[key];
			obj.rules = [];
			arr.push(obj)
			
		}else{
			arr.map((o) => {
				//console.log(o.chapter)
				if(key.startsWith(o.chapter)){
					o.rules.push(rules[key])
				}
				
			});
			
		}
		
		
	}
	//console.log(arr[0])
	return arr;
}

