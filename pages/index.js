import path from 'path';
import Head from 'next/head';
import Link from 'next/link';
import React, { useState } from 'react';
import {formateRulesToObject} from '../src/ruleHandler';
import Search from '../components/Search';

/**
*This is a one page application. 
*Application downloads The Magic (text file) rules in build time from a given environment path.
*After that the rules are converted to JS objects and used for showing the content in a more human friendly way.
*
*In this project I used Next.js because of the server-side loading. 
*I was able to fetch the file once in build time instead many times from client-side (what just react does not have). 
*/


//TODO: set to some congif file
const rulePath = process.env.RULE_PATH || null;
const ruleTestPath = process.env.RULE_PATH_TEST || null;

const placeholderForRules = "";


/**
*This is why I used Next.JS. Just to get my hands on this function which is called in server-side.
*The text file is fetched from given .env path (in this case https://media.wizards.com/2021/downloads/MagicCompRules%2020210419.txt).
*After the .txt file is fetched it will be converted to JS object.
*/
export async function getStaticProps(context) {


	const res = await fetch(rulePath)
	let data = formateRulesToObject(await res.text())

	if (!data) {
		return {
			redirect: {
				destination: '/status',
				permanent: false,
			},
		}
	}

	return {
		props: {data},
	}
}

/**
*This is the main component which will visualize all and set needed logic and actions for elements. 
*/
export default function Home({ data }) {
	
	const [rules, setRule] = useState(placeholderForRules)
	const [chapter, setChapter] = useState("")
	const [filteredRules, setFilteredRules] = useState("")
	const [noticeBoard, setNoticeBoard] = useState("noNoticeBoard")
	
	const activateNoticeBoard = (activate) =>{
	
		if(activate){
			setNoticeBoard("noticeBoard");
			return;
		}
		setNoticeBoard("noNoticeBoard");
	}
	
	
	/**
	* This function handels the click events which are called when clicking the chapters.
	* Example if you click "100. General" it will open everything containing the 
	*
	*When you click or search the object it will print the rules to page or “noticeBoard” and if you click the “noticeBoard” it will disappear. 
	*/
	const handleClick = (e, obj) => {
		
		if(obj === null){
			setRule(placeholderForRules);
			setChapter("");
			activateNoticeBoard(false);
			return;
		}
		
		if(chapter !== obj.chapter){
			
			let displayRules = obj.rules.map((rule) => {
				
				return(
				
					<div>
						<p>{rule}</p>
					</div>
				)
				
			})

			setRule(displayRules);	
			setChapter(obj.chapter);
			activateNoticeBoard(true);
		}else{
			setRule(placeholderForRules);
			setChapter("");
			activateNoticeBoard(false);
		}
	};
	
	/**
	*This function finds all of the searched words that are in the rules.
	*Rules will appear when you start to type.
	*
	*When you click or search the object it will print the rules to page or “noticeBoard” and if you click the “noticeBoard” it will disappear. 
	*/
	//FIX: it does not set all of the searched strings to uppercase
	//TODO: replace string with element which can be used with highlighting the search word
	const handleSearch = (search) =>{
		
		console.log(search);
		let displayRules = "";	
			if(!search || search == ""){
				displayRules = placeholderForRules;
				activateNoticeBoard(false);
			}else{
					displayRules = data.map((obj) => {return <div key={obj.chapter}> 
					{obj.rules.map((rule, index) => {
						
						
						let compareRule = rule;
						const ruleLowerCase = compareRule.toLowerCase();
						let compare = search;
						let highlightText = compare;
						if(ruleLowerCase.includes(compare.toLowerCase())){
							return(
								<p key={obj.chapter+index}>{rule.replace(compare, highlightText.toUpperCase())}</p>
							)
						}
					})
					}</div>
				});
				activateNoticeBoard(true);
			}
		
		
		setRule(displayRules);
	};
	
	/**
	*Render everything here.
	*/
  return (
    <div className="container">
      <Head>
        <title>Magic: The Gathering</title>
        <link rel="icon" href="/assets/fire_64.gif" />
      </Head>

      <main>

		<p className="title">
          Magic: The Gathering Comprehensive Rules (April 22, 2021)
        </p>
	  
		
		<div className={noticeBoard} onClick={(e) => handleClick(e,null)}>{rules}</div>
		
		
		<div className="ruleContainer">
		{
		  data.map(obj => {
			
			return <div key={obj.chapter} >
			<button className="ruleLink" onClick={(e) => handleClick(e,obj)}>{obj.name}</button>
			</div>})
		  
		}
		</div>
		<Search  className="searchBar" handleSearch={handleSearch}/>
		
		<div className="fire">
		</div>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
		
		.highlight{
		  
			background-color:red;
		}
		
		.rule{
			padding: 10px;
		}
		.noNoticeBoard{
			display:none;
		}
		.noticeBoard{
			color:black;
			border: 2px solid black;
			background-color: #caa659;
			overflow-y:auto;
			position: fixed;
			top:30px;
			width: 80%;
			max-height: 50%;
			box-shadow: 0 8px 8px -4px black;
			padding:5px;
			
		}
		.noticeBoard::-webkit-scrollbar {
			display: none;
		}
		
		.noticeBoard {
			-ms-overflow-style: none;  /* IE and Edge */
			scrollbar-width: none;  /* Firefox */
		}
		
		.ruleContainer{
			
			margin-bottom: 60px;
			text-align: center;
		}
		
		.ruleLink{
			margin: 10px;
			text-align: center;
			color:white;
			background-color: transparent;
			border: none;
			font-size: large;
			font-family: "ＭＳ Ｐゴシック";
			
		}
		.fire{
			background-image: url("../assets/fire_64.gif");
			background-repeat: repeat-x;

			position: fixed;
			bottom: 0;
			height: 60px;
			width: 100%;
			
			color:green:
		}
		.searchBar{
			
			border: 2px solid black;
			background-color: #caa659;
			
			position: fixed;
			bottom: 50px;
		}
		

        a {
          color: inherit;
          text-decoration: none;
        }

        .title{
			
          text-align: center;
		  padding:20px;
		  font-size: large;
		  font-weight: bold;
        }

        @media (max-width: 600px) {
   
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: "ＭＳ Ｐゴシック";
			color: white;
			background-image: url("../assets/brick_32_color.jpg");
			
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
