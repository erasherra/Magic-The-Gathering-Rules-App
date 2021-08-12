
let rules = {};

let limit = 5000;


export function formateRulesToObject(ruleInText){
	
	console.log('ruleInText', ruleInText.substring(0,20));
	
	ruleInText.split("\n").forEach(function(line, index, arr) {
		
		if (index === arr.length - 1 && line === "" /*|| index > limit*/) { return; }
		if(line.match(/\S/)){
			let subString = line.substring(0,10)
			if(subString.match(/([0-9]+[.]+[0-9]+[a-g])|([0-9]+[.])/)){
				
				filterRules(line);
			}
			
		}
		
		
	});
	
	let result = createObject(rules);
	
	return result;
	
}

function filterRules(line){
	let key = line.substring(0,10).split(" ")[0];
	
	if(!(key in rules)){
		rules[key] = line;
	}
	
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
				if(key.startsWith(o.chapter)){
					o.rules.push(rules[key])
				}
				
			});
			
		}
		
	}
	return arr;
}

