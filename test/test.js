var list = new Object();

var arr = [{id:1, name:'a', child:[]},
           {id:2, name:'b', child:[]},
           {id:3, name:'c', pid:1},
           {id:4, name:'d', pid:1},
           {id:5, name:'e', pid:2},
           {id:6, name:'f', pid:2}];
var nopids = new Object();
var haspids = new Object();

for(var i=0; i<arr.length; i++){
	if(arr[i].pid){
		haspids[arr[i].id] = arr[i];
	}else{
		nopids[arr[i].id] = arr[i];
	}
}
for(var j in haspids){
		nopids[haspids[j].pid].child.push(haspids[j]);
}
console.log(nopids);
