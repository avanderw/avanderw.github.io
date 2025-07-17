export interface Law {
	id: string;
	title: string;
	quote: string;
	author: string;
	year: number | null;
	sourceUrl: string;
	detailUrl?: string; // Optional URL for detailed page
}

export const laws: Law[] = [
	{
		id: 'atwood',
		title: "Atwood's Law",
		quote: "Any application that can be written in JavaScript, will eventually be written in JavaScript.",
		author: "Jeff Atwood",
		year: 2009,
		sourceUrl: "https://blog.codinghorror.com/all-programming-is-web-programming/",
		detailUrl: "atwood/index.html"
	},
	{
		id: 'brooks',
		title: "Brooks's Law",
		quote: "Adding [human resources] to a late software project makes it later.",
		author: "Fred Brooks",
		year: 1975,
		sourceUrl: "https://www.goodreads.com/book/show/13629.The_Mythical_Man_Month"
	},
	{
		id: 'boring-technology',
		title: "Choose Boring Technology",
		quote: "Consider how you would solve your immediate problem without adding anything new.",
		author: "Dan McKinley",
		year: 2015,
		sourceUrl: "https://mcfunley.com/choose-boring-technology"
	},
	{
		id: 'conway',
		title: "Conway's Law",
		quote: "Any organization that designs a system (defined broadly) will produce a design whose structure is a copy of the organization's communication structure.",
		author: "Melvin Conway",
		year: 1968,
		sourceUrl: "https://www.melconway.com/Home/Conways_Law.html",
		detailUrl: "conway/index.html"
	},
	{
		id: 'cunningham',
		title: "Cunningham's Law",
		quote: "The best way to get the right answer on the internet is not to ask a question; it's to post the wrong answer.",
		author: "Ward Cunningham",
		year: 1980,
		sourceUrl: "https://archive.nytimes.com/schott.blogs.nytimes.com/2010/05/28/weekend-competition-schotts-law/"
	},
	{
		id: 'doerr',
		title: "Doerr's Law",
		quote: "We need teams of missionaries, not teams of mercenaries.",
		author: "John Doerr",
		year: 2015,
		sourceUrl: "https://www.svpg.com/missionaries-vs-mercenaries/"
	},
	{
		id: 'fitts',
		title: "Fitt's Law",
		quote: "The time to acquire a target is a function of the distance to and the size of the target.",
		author: "Paul Fitts",
		year: 1954,
		sourceUrl: "https://doi.apa.org/doiLanding?doi=10.1037%2Fh0055392"
	},
	{
		id: 'gall',
		title: "Gall's Law",
		quote: "A complex system that works has evolved from a simple system that worked. A complex system built from scratch won't work.",
		author: "John Gall",
		year: 1975,
		sourceUrl: "https://www.goodreads.com/book/show/583785.The_Systems_Bible"
	},
	{
		id: 'goodhart',
		title: "Goodhart's Law",
		quote: "When a measure becomes a target, it ceases to be a good measure.",
		author: "Charles Goodhart",
		year: 1975,
		sourceUrl: "https://link.springer.com/chapter/10.1007/978-1-349-17295-5_4"
	},
	{
		id: 'greenspun',
		title: "Greenspun's tenth rule",
		quote: "Any sufficiently complicated C or Fortran program contains an ad hoc, informally-specified, bug-ridden, slow implementation of half of Common Lisp.",
		author: "Philip Greenspun",
		year: null,
		sourceUrl: "https://philip.greenspun.com/research/"
	},
	{
		id: 'hofstadter',
		title: "Hofstadter's Law",
		quote: "It always takes longer than you expect, even when you take into account Hofstadter's Law.",
		author: "Douglas Hofstadter",
		year: 1979,
		sourceUrl: "https://www.goodreads.com/book/show/24113.G_del_Escher_Bach"
	},
	{
		id: 'hyrum',
		title: "Hyrum's Law",
		quote: "With a sufficient number of users of an API, it does not matter what you promise in the contract: all observable behaviors of your system will be depended on by somebody.",
		author: "Hyrum Wright",
		year: 2012,
		sourceUrl: "https://www.hyrumslaw.com/"
	},
	{
		id: 'kerckhoffs',
		title: "Kerchkhoff's principle",
		quote: "In cryptography, a system should be secure even if everything about the system, except for a small piece of information - the key - is public knowledge.",
		author: "Auguste Kerckhoffs",
		year: 1883,
		sourceUrl: "https://www.arcsi.fr/doc/cryptomilitaire.pdf"
	},
	{
		id: 'kernighan',
		title: "Kernighan's Law",
		quote: "Everyone knows that debugging is twice as hard as writing a program in the first place. So if you're as clever as you can be when you write it, how will you ever debug it?",
		author: "Brian Kernighan",
		year: 1974,
		sourceUrl: "https://www.goodreads.com/book/show/454039.The_Elements_of_Programming_Style"
	},
	{
		id: 'knuth',
		title: "Knuth's optimization principle",
		quote: "Premature optimization is the root of all evil.",
		author: "Donald Knuth",
		year: 1974,
		sourceUrl: "https://dl.acm.org/doi/10.1145/356635.356640"
	},
	{
		id: 'leaky-abstractions',
		title: "Law of Leaky Abstractions",
		quote: "All non-trivial abstractions, to some degree, are leaky.",
		author: "Joel Spolsky",
		year: 2002,
		sourceUrl: "https://www.joelonsoftware.com/2002/11/11/the-law-of-leaky-abstractions/"
	},
	{
		id: 'linus',
		title: "Linus's Law",
		quote: "Given enough eyeballs, all bugs are shallow.",
		author: "Linus Torvalds",
		year: 1999,
		sourceUrl: "https://www.goodreads.com/book/show/134825.The_Cathedral_the_Bazaar"
	},
	{
		id: 'lovelace',
		title: "Lady Lovelace's Objection",
		quote: "The Analytical Engine has no pretensions to originate anything. It can do whatever we know how to order it to perform.",
		author: "Ada Lovelace",
		year: 1842,
		sourceUrl: "http://history-computer.com/Library/Sketch%20of%20Engine.pdf"
	},
	{
		id: 'moore',
		title: "Moore's Law",
		quote: "The complexity for minimum component costs has increased at a rate of roughly a factor of two per year. Certainly over the short term this rate can be expected to continue, if not to increase. Over the longer term, the rate of increase is a bit more uncertain, although there is no reason to believe it will not remain nearly constant for at least 10 years.",
		author: "Gordon Moore",
		year: 1965,
		sourceUrl: "https://newsroom.intel.com/wp-content/uploads/sites/11/2018/05/moores-law-electronics.pdf"
	},
	{
		id: 'norvig',
		title: "Norvig's Law",
		quote: "Any technology that surpasses 50% penetration will never double again.",
		author: "Peter Norvig",
		year: 1999,
		sourceUrl: "https://norvig.com/norvigs-law.html"
	},
	{
		id: 'parkinson',
		title: "Parkinson's Law",
		quote: "Work expands so as to fill the time available for its completion.",
		author: "Cyril Parkinson",
		year: 1955,
		sourceUrl: "https://www.economist.com/news/1955/11/19/parkinsons-law"
	},
	{
		id: 'peter',
		title: "Peter Principle",
		quote: "People in a hierarchy tend to rise to \"a level of respective incompetence.\"",
		author: "Laurence J. Peter",
		year: 1969,
		sourceUrl: "https://www.goodreads.com/book/show/6124265"
	},
	{
		id: 'postel',
		title: "Postel's Law",
		quote: "Be conservative in what you send, liberal in what you accept.",
		author: "Jon Postel",
		year: 1980,
		sourceUrl: "https://tools.ietf.org/html/rfc760"
	},
	{
		id: 'shirky',
		title: "Shirky principle",
		quote: "Institutions will try to preserve the problem to which they are the solution.",
		author: "Clay Shirky",
		year: 2010,
		sourceUrl: "https://www.goodreads.com/book/show/7614793-cognitive-surplus"
	},
	{
		id: 'wirth',
		title: "Wirth's Law",
		quote: "Software gets slower faster than hardware gets faster.",
		author: "Niklaus Wirth",
		year: 1995,
		sourceUrl: "https://www.computer.org/csdl/magazine/co/1995/02/r2064/13rRUwInv7E"
	},
	{
		id: 'zawinski',
		title: "Zawinski's Law",
		quote: "Every program attempts to expand until it can read mail. Those programs which cannot so expand are replaced by ones which can.",
		author: "James Zawinski",
		year: 1995,
		sourceUrl: "https://www.jwz.org/hacks/"
	}
];
