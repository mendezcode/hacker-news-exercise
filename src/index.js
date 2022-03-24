/* index.js */

import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

const noop = () => false;

function Main() {
	return (
		<HN_Main>
			<HN_Header>
				<HN_Navigation pages={ getNavigationPages() } />
			</HN_Header>
			<HN_Stories stories={ getStoriesData() } />
		</HN_Main>
	);
}

function HN_Main( { children } ) {
	return (
		<div className="hn-main">
			{ children }
		</div>
	);
}

function HN_Header( { children, pages } ) {
	return (
		<div className="hn-header">
			<div className="hn-logo">
				<a href="/" onClick={ (e) => onPageClick( e, '/' ) }>Hacker News</a>
			</div>
			{ children }
		</div>
	);
}

function HN_Navigation( { pages } ) {
	return (
		<ul className="hn-navigation">
			{ pages.map( ( page ) => (
				<li key={page} className="hn-nav-item">
					<a href={`/${ page }`} onClick={ ( e ) => onPageClick( e, page ) }>{ page }</a>
				</li>
			) ) }
		</ul>
	);
}

function HN_Stories( { stories } ) {
	return (
		<ol className="hn-stories">
			{ stories.map( ( story, i ) => (
				<HN_Story_Item story={ story } />
			) ) }
		</ol>
	);
}

function HN_Story_Item( { story } ) {
	const [hidden, setHidden] = useState( story.hidden );
	const [points, setPoints] = useState( story.points );
	const [upvoted, setUpvoted] = useState( story.upvoted );
	const [flagged, setFlagged] = useState( story.flagged );
	const [pocket_saved, setPocketSaved] = useState( story.pocket_saved );
	const [instapaper_saved, setInstapaperSaved] = useState( story.instapaper_saved );

	// Don't render item if it's hidden.
	if ( hidden ) {
		return [];
	}

	return (
		<li key={ story.id } className="hn-story-item" data-number={ story.id }>
			<div className="hn-story-item-wrapper">
				<button className={ [ 'hn-upvote-btn', upvoted ? 'upvoted' : '' ].join( ' ' ) } onClick={ () => {
					if ( upvoted ) {
						setPoints( points - 1 );
						setUpvoted( false );
					} else {
						setPoints( points + 1 );
						setUpvoted( true );
					}
				} }>&#9650;</button>
				<div className="story-item-topline">
					<a className="story-item-link" href={story.url} onClick={ ( e ) => onStoryClick( e, story.url ) }>{ story.title }</a>
					<span className="story-item-website">({ story.website })</span>
				</div>
				<ul className="story-item-meta">
					<li>
						{ points } points
						by <a href={ `/author/${ story.author }` } onClick={ (e) => onStoryClick( e, story.author ) }>{ story.author }</a>
						{ story.time_delta }
						&nbsp;| <a className={ [ 'story-action', 'story-flag', flagged ? 'flagged' : '' ].join( ' ' ) } onClick={ () => setFlagged( ! flagged ) }>{ flagged ? 'flagged' : 'flag' }</a>
						&nbsp;| <a className="story-action story-hide" onClick={ () => setHidden( true ) }>hide</a>
						&nbsp;| <a className="story-link story-comments" onClick={ (e) => alert( 'story:comments' ) }>{ story.comment_count } { 1 === story.comment_count? 'comment' : 'comments' }</a>
						&nbsp;| <a className={ [ 'story-action', 'story-instapaper', instapaper_saved ? 'saved' : '' ].join( ' ' ) } onClick={ () => setInstapaperSaved( ! instapaper_saved ) }>instapaper</a>
						&nbsp;| <a className={ [ 'story-action', 'story-save-to-pocket', pocket_saved ? 'saved' : '' ].join( ' ' ) } onClick={ () => setPocketSaved( ! pocket_saved ) }>{ pocket_saved ? 'saved to pocket' : 'save to pocket' }</a>
					</li>
				</ul>
			</div>
		</li>
	);
}

function onPageClick( e, page ) {
	e.preventDefault();
	alert( `goto /${ page.replace( /^\//, '' ) }` );
}

function onStoryClick( e, link ) {
	e.preventDefault();
	alert( link );
}

function getNavigationPages() {
	return ['new', 'threads', 'comments', 'show', 'ask', 'jobs', 'submit'];
}

function getStoriesData() {
	return [
		{
			id: 1,
			title: "Why I'm Suing the US Government",
			url: 'https://bunniestudios.com/why-im-suing-the-us-government',
			website: 'bunniestudios.com',
			points: 1346,
			author: 'ivank',
			time_delta: '11 hours ago',
			flagged: false,
			hidden: false,
			comment_count: 257,
			pocket_saved: false,
			instapaper_saved: false,
			upvoted: false,
		},
		{
			id: 2,
			title: "Zenzizenizenzic",
			url: 'wikipedia.org/zenzizenizenzic',
			website: 'wikipedia.org',
			points: 140,
			author: 'vinchuco',
			time_delta: '4 hours ago',
			flagged: false,
			hidden: false,
			comment_count: 6,
			pocket_saved: false,
			instapaper_saved: true,
			upvoted: true,
		},
		{
			id: 3,
			title: "A practical security guide for web developers",
			url: 'https://github.com/practical-web-security',
			website: 'github.com',
			points: 72,
			author: 'zlanwar',
			time_delta: '2 hours ago',
			flagged: false,
			hidden: false,
			comment_count: 6,
			pocket_saved: false,
			instapaper_saved: false,
			upvoted: false,
		},
		{
			id: 4,
			title: "I got arrested in Kazakshtan and represented myself in court",
			url: 'https://medium.com/arrested',
			website: 'medium.com',
			points: 370,
			author: 'drpp',
			time_delta: '7 hours ago',
			flagged: false,
			hidden: false,
			comment_count: 79,
			pocket_saved: false,
			instapaper_saved: false,
			upvoted: false,
		},
		{
			id: 5,
			title: "Sculpture of Housing Prices Ripping San Francisco Apart",
			url: 'https://dougmccune.com/housing',
			website: 'dougmccune.com',
			points: 254,
			author: 'dougmccune',
			time_delta: '7 hours ago',
			flagged: false,
			hidden: false,
			comment_count: 149,
			pocket_saved: true,
			instapaper_saved: false,
			upvoted: false,
		},
		{
			id: 6,
			title: "Practical Guide to Bare Metal C++",
			url: 'https://gitbooks.io/bare-metal-cpp',
			website: 'gitbooks.io',
			points: 175,
			author: 'adamnemecek',
			time_delta: '7 hours ago',
			flagged: true,
			hidden: false,
			comment_count: 31,
			pocket_saved: false,
			instapaper_saved: false,
			upvoted: false,
		},
		{
			id: 7,
			title: "Superformula",
			url: 'https://wikipedia.org/superformula',
			website: 'wikipedia.org',
			points: 77,
			author: 'GuiA',
			time_delta: '5 hours ago',
			flagged: false,
			hidden: false,
			comment_count: 17,
			pocket_saved: false,
			instapaper_saved: false,
			upvoted: true,
		},
		{
			id: 8,
			title: "Police asked 3D printing lab to recreate a dead man's fingers to unlock phone",
			url: 'https://fusion.net/police',
			website: 'fusion.net',
			points: 109,
			author: 'secfirstmd',
			time_delta: '7 hours ago',
			flagged: false,
			hidden: false,
			comment_count: 57,
			pocket_saved: false,
			instapaper_saved: false,
			upvoted: true,
		},
		{
			id: 9,
			title: "Edward Snowden's New Research Aims to Keep Smartphones from Betraying Owners",
			url: 'https://theintercept.net/snowden',
			website: 'theintercept.net',
			points: 190,
			author: 'secfirstmd',
			time_delta: '11 hours ago',
			flagged: false,
			hidden: false,
			comment_count: 69,
			pocket_saved: false,
			instapaper_saved: false,
			upvoted: false,
		},
		{
			id: 10,
			title: "Assessing IBM's POWER8, Part 1: A Low Level Look at Little Endian",
			url: 'https://anandtech.com/ibm-low-level-look-at-little-endian',
			website: 'anandtech.com',
			points: 24,
			author: 'tambourine_man',
			time_delta: '3 hours ago',
			flagged: false,
			hidden: false,
			comment_count: 1,
			pocket_saved: false,
			instapaper_saved: false,
			upvoted: true,
		},
	];
}

ReactDOM.render( <Main />, document.querySelector( '#root' ) );
