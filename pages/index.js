import path from 'path';
import Head from 'next/head';
import Link from 'next/link';
import React, { useState } from 'react';
import {formateRulesToJson} from '../src/ruleHandler';
//import styled from 'styled-components';

const rulePath = process.env.RULE_PATH || null;
const ruleTestPath = process.env.RULE_PATH_TEST || null;

const placeholderForRules = "Rules appear here";
//import {getStaticProps} from './ruleHandler'

export async function getStaticProps(context) {
	
	//const createdPath = path.join(process.cwd(),"test",ruleTestPath);
	const createdPath = rulePath;
	console.log("Called! "+createdPath);
	
  const res = await fetch(createdPath)
  let data = formateRulesToJson(await res.text())
  
  
	//for logging
	/*
	if(false){
  	let key = Object.keys(data)[3];
	console.log(key)
	console.log(data[key])
	
	console.log("last:")
	let idx = Object.keys(data).length-1;//0;
	key = Object.keys(data)[idx];
	console.log(key)
	console.log(data[key])
	
	}
	*/
  if (!data) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {data},
  }
}



function showResults(arr){
	
	
}



function Search({handleSearch}){
	
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

export default function Home({ data }) {
	
	const [rules, setRule] = useState(placeholderForRules)
	const [chapter, setChapter] = useState("")
	const [query, setQuery] = useState("")
	const [filteredRules, setFilteredRules] = useState("")
	/*
	let testItem = [
		{
			chapter: "100.",
			rules:[{key:"100.1", rule:"asdasda"},{key:"100.1", rule:"asdasda"}]
		},
		{
			chapter: "101.",
			rules:[{key:"101.1", rule:"wer"},{key:"101.2", rule:"bfds"}]
		}
	];
	*/
	const handleClick = (e, obj) => {
		
		console.log(obj.chapter);
		console.log(chapter);
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
		}else{
			setRule(placeholderForRules);
			setChapter("");
		}
	};
	
	const handleSearch = (search) =>{
		
		//setQuery(search);
		console.log(search);
		let displayRules = "";	
			if(!search || search == ""){
				displayRules = placeholderForRules;
			}else{
				//console.log(o.chapter)
					displayRules = data.map((obj) => {return <div key={obj.chapter}> {obj.rules.map((rule, index) => {
					const ruleLowerCase = rule.toLowerCase();
					if(ruleLowerCase.includes(search)){
						//console.log("match!");
						return(
								<p key={obj.chapter+index}>{rule}</p>
							)
						}
					})}</div>
				});
			}
		
		setRule(displayRules);
		
		/*
		let resultArray = [];
		
		
		data.map((o) => {
				//console.log(o.chapter)
				for(let rule in o.rules){
					
					if(search.includes(rule)){
						resultArray.push(rule)
					}
				}
				
			});
		*/
	};
	
	/*
	const MyButton = React.forwardRef(({ click, href }, ref) => {
		return (
		<a href={href} onClick={click} ref={ref}>
			Click Me
		</a>
		)
	})
	*/
	
	
	//const items = Object.keys(data).map(key => <p key={key} >{data[key]}</p>);
	
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
	 
	  
		<div>
		{/*
			data.map((item) => {
			return <p key={item.chapter}> {item.chapter}</p>;
			})
		*/}
		</div>
		
		<div>{rules}</div>
		
		
		
		{
		  //Object.keys(data).map(.... for key-pairs
		  data.map(obj => {
			
			return <Link key={obj.chapter} href="/" >
			<a className="ruleLink" onClick={(e) => handleClick(e,obj)}>{obj.name}</a>
			</Link>})
		  
		}
		<Search  className="searchBar" handleSearch={handleSearch}/>
		
	  {/*
		<h1 className="title">
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>

        <div className="grid">
          <a href="https://nextjs.org/docs" className="card">
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className="card">
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className="card"
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className="card"
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
		
		*/}
		<div className="fire">
		</div>
      </main>

      <footer>
      </footer>

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
		
		.ruleLink{
			margin: 10px;
			text-align: center;
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
		
        footer {
			height: 80px;
        }


        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
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
