/**
*Search object contains the styleing and the elements. Also some functionality for calling functions.
*/
let search = function Search({handleSearch}){
	
	const searchBar = {
		border: '2px solid black',
		backgroundColor: '#caa659',
		position: 'fixed',
		bottom: '50px',
		padding: '5px',
	};
	
	const input = {
		border: '2px solid black',
		backgroundColor: 'white',
	};
	
	async function onChange(e){
		handleSearch(e.target.value);
	}
	
	return(
		<div style={searchBar}>
			<input style={input} type="text" onChange={onChange} placeholder="Search"/>
		</div>
	);
	
}

module.exports = search;