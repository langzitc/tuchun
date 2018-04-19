function GetTreeLine (arr,value,key = 'id') {
	let map = new Map();
	let f = (arrs,index) => {
		for (let e of arrs) {
			map.set(index,e[key]);
			if(e[key] === value){
				break;
			}
			if(e.children&&e.children.length){
				f(e.children,index+1);
			}
		}		
	}
	f(arr,0);
	return [...map.values()];
}
export { GetTreeLine }
