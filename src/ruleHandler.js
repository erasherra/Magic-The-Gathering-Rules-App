/**
*The “ruleHandler” is a utility program for converting the text to js object (obj) which contains chapter (string), name (string) and rules (array of strings). 
*/



let rules = {};
let obj = {
	
	chapter:null,
	name:null,
	rules:[]
	
};


//TODO: add some library which could potentially replace the whole hardcoded formating
export function formateRulesToObject(ruleInText){
	
	console.log('ruleInText', ruleInText.substring(0,20));
	
	ruleInText.split("\n").forEach(function(line, index, arr) {
		
		if (index === arr.length - 1 && line === "") { return; }
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
//TODO: add some other way to compare chapters and rules instead of the key length. Existing library or regex.
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

