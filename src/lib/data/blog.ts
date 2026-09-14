import type { BlogPost } from '../types.js';

export const blogPosts: BlogPost[] = [
	{
		title: 'Zero-Knowledge Proofs: Proving Without Revealing',
		url: '/blog/zero-knowledge-proofs',
		slug: 'zero-knowledge-proofs',
		summary: {
			whatIsDiscussed: 'How zero-knowledge proofs verify a claim without exposing the private information used to make it.',
			whyItMatters: 'They can reduce unnecessary data collection and make expensive computation easier for others to verify.',
			keyTakeaway: 'Prove the minimum fact a verifier needs, and use zero knowledge only when simpler security controls are not enough.'
		},
		description: 'A plain-language introduction to zero-knowledge proofs, with practical examples for logins, identity checks, Signal, rollups, and zkVMs.',
		year: 2026,
		date: '2026-09-14',
		readingMinutes: 7,
		markdownPath: '/blog/20260914T133715_zero-knowledge-proofs.md',
	},
	{
		title: "Nielsen's 10 Usability Heuristics",
		url: '/blog/nielsens-10-usability-heuristics',
		slug: 'nielsens-10-usability-heuristics',
		summary: {
			whatIsDiscussed: 'Nielsen\'s ten rules for checking whether an interface is clear, predictable, forgiving, and easy to use.',
			whyItMatters: 'Usability problems are cheaper to fix early, before they become engineering work, support costs, or barriers to completing important tasks.',
			keyTakeaway: 'Use heuristic reviews early, prioritise the most serious problems, and combine expert findings with user testing.'
		},
		description: 'A plain-language guide to Nielsen\'s ten usability heuristics, including how to run an evaluation, score problems, and apply the principles to enterprise, spatial, and AI systems.',
		year: 2026,
		date: '2026-09-14',
		readingMinutes: 34,
		markdownPath: '/blog/20260914T120922_nielsen-usability-heuristics.md',
	},
	{
		title: 'The Ladder of Inference',
		url: '/blog/ladder-of-inference',
		slug: 'ladder-of-inference',
		summary: {
			whatIsDiscussed: 'How people move from observable facts to interpretations, assumptions, beliefs, and actions.',
			whyItMatters: 'Unexamined assumptions can turn small misunderstandings into poor decisions and lasting conflict.',
			keyTakeaway: 'Separate facts from interpretations, explain your reasoning, and look for evidence that could change your mind.'
		},
		description: 'A practical guide to the Ladder of Inference, showing how we jump from facts to conclusions and how to slow down for better decisions and clearer conversations.',
		year: 2026,
		date: '2026-09-14',
		readingMinutes: 8,
		markdownPath: '/blog/20260914T105928_ladder-of-inference.md',
	},
	{
		title: 'Nelson Rules for Statistical Process Control',
		url: '/blog/nelson-rules-for-statistical-process-control',
		slug: 'nelson-rules-for-statistical-process-control',
		summary: {
			whatIsDiscussed: 'The eight Nelson rules for spotting unusual shifts, trends, and patterns in statistical process control charts.',
			whyItMatters: 'Using every rule at once can create false alarms and cause operators to ignore signals that deserve attention.',
			keyTakeaway: 'Choose a small, risk-based set of trusted rules and treat each signal as the start of an investigation.'
		},
		description: 'A plain-language guide to the eight Nelson rules, including their practical uses, limitations, false-alarm risks, and response workflows.',
		year: 2026,
		date: '2026-09-14',
		readingMinutes: 8,
		markdownPath: '/blog/20260914T111759_nelson-rules-in-process-control.md',
	},
	{
		title: 'AI Writing, Authorship, and What We Should Value Now',
		url: '/blog/ai-writing-authorship-and-what-we-should-value-now',
		slug: 'ai-writing-authorship-and-what-we-should-value-now',
		summary: {
			whatIsDiscussed: 'How AI-assisted writing changes authorship, incentives, and what readers should value when text is machine-assisted.',
			whyItMatters: 'Visibility and volume can outrun verification, so readers need stronger signals than polish alone to judge trustworthiness.',
			keyTakeaway: 'Use AI for drafting, but keep accountability, source checking, and final judgment with the human author.'
		},
		description: 'A practical critique of AI-assisted writing, focused on how visibility incentives are driving content proliferation and why verification now matters more than fluency.',
		year: 2026,
		date: '2026-07-27',
		readingMinutes: 5,
		markdownPath: '/blog/20260727T154216_ai-authorship-ande-epistemology.md',
	},
	{
		title: 'From "Everything Is a File" to "Files Are All You Need"',
		url: '/blog/files-are-all-you-need',
		slug: 'files-are-all-you-need',
		summary: {
			whatIsDiscussed: 'File-based Unix-style workflows for LLM pipelines and long-running automation, with files acting as the main coordination boundary.',
			whyItMatters: 'Clear file boundaries improve reliability, auditability, and governance because state is visible instead of implicit.',
			keyTakeaway: 'Prefer simple file interfaces over hidden process state when you need robust orchestration.'
		},
		description: 'How Unix design principles can improve reliability, governance, and scalability in long-running LLM workflows.',
		year: 2026,
		date: '2026-07-24',
		readingMinutes: 18,
		markdownPath: '/blog/20260724T135123_file-Based-LLM-pipeline-research.md',
	},
	{
		title: "Cell C's Spectrum and Litigation: What's True and What's Not",
		url: '/blog/cell-c-spectrum-and-litigation',
		slug: 'cell-c-spectrum-and-litigation',
		summary: {
			whatIsDiscussed: "Claims around Cell C's spectrum position, virtual network model, and the litigation context around those claims.",
			whyItMatters: 'Telecom strategy changes quickly when legal and regulatory facts are fuzzy, so the evidence matters as much as the story.',
			keyTakeaway: 'Keep the marketing narrative separate from what can actually be verified in public records.'
		},
		description: 'An analysis of Cell C\'s spectrum ownership, virtualized network model, and active litigation in South Africa\'s telecom sector.',
		year: 2026,
		date: '2026-07-24',
		readingMinutes: 17,
		markdownPath: '/blog/20260724T104959_cellc-spectrum-claim-analysis.md',
	},
	{
		title: 'Confidence, Competence, and Calibration in AI and Human Systems',
		url: '/blog/confidence-in-ai-and-humans',
		slug: 'confidence-in-ai-and-humans',
		summary: {
			whatIsDiscussed: 'Confidence calibration in AI models and human decision-making, and how both can appear more certain than they really are.',
			whyItMatters: 'Unjustified certainty creates bad decisions whether it comes from a model, a manager, or a team culture.',
			keyTakeaway: 'Reward calibrated confidence and explicit uncertainty instead of performative certainty.'
		},
		description: 'A comparative analysis of confidence calibration in AI models and human corporate hierarchies, exploring how unearned certainty drives systemic failure in both.',
		year: 2026,
		date: '2026-06-30',
		readingMinutes: 18,
		markdownPath: '/blog/20260630T131532_confidence-in-AI-and-humans.md',
	},
	{
		title: 'Vertical Slices vs Layered Architecture',
		url: '/blog/vertical-slices-vs-horizontal-layers',
		slug: 'vertical-slices-vs-horizontal-layers',
		summary: {
			whatIsDiscussed: 'A comparison of vertical slice delivery and layered architecture, with attention to how work flows through a system.',
			whyItMatters: 'Architecture choices shape coupling, delivery speed, and ownership, so the wrong structure makes change harder than it needs to be.',
			keyTakeaway: 'Choose the structure that fits the actual flow of work, not the one your team inherited.'
		},
		description: 'A practical comparison of vertical slice and layered architectures, including trade-offs in coupling, delivery speed, and long-term maintainability.',
		year: 2026,
		date: '2026-06-01',
		readingMinutes: 18,
		markdownPath: '/blog/20260601T104324_vertical-slices-vs-horizontal-layers.md',
	},
	{
		title: 'Push vs. Pull Deployment Models',
		url: '/blog/push-vs-pull-deployment-models',
		slug: 'push-vs-pull-deployment-models',
		summary: {
			whatIsDiscussed: 'Push and pull deployment patterns for releasing software, and how they differ in control and reconciliation.',
			whyItMatters: 'Deployment direction changes security boundaries, failure handling, and scaling behavior across distributed systems.',
			keyTakeaway: 'Pull models often reduce coupling, especially when you want agents or nodes to reconcile on their own schedule.'
		},
		description: 'An analysis of push-based and pull-based deployment models, with a focus on security boundaries, reconciliation, and operational scaling.',
		year: 2026,
		date: '2026-06-01',
		readingMinutes: 11,
		markdownPath: '/blog/20260601T102731_push-vs-pull-deployment-models.md',
	},
	{
		title: 'Compile-Time First for Agentic Engineering',
		url: '/blog/compile-time-errors-with-ai',
		slug: 'compile-time-errors-with-ai',
		summary: {
			whatIsDiscussed: 'Compile-time-first verification for agent-generated code, with compilers used as the primary gate before execution.',
			whyItMatters: 'Earlier failures are cheaper and easier for agents to repair than runtime defects, and they produce more deterministic feedback.',
			keyTakeaway: 'Use compile-time gates first, then add runtime containment for whatever cannot be proven statically.'
		},
		description: 'Why compile-time guarantees should be the primary quality control for agent-generated code, with runtime checks handling residual risk.',
		year: 2026,
		date: '2026-06-01',
		readingMinutes: 8,
		markdownPath: '/blog/20260601T101623_compile-time-errors-with-ai.md',
	},
	{
		title: 'Git Branching Strategies',
		url: '/blog/git-branching-strategies',
		slug: 'git-branching-strategies',
		summary: {
			whatIsDiscussed: 'Major Git branching models and the trade-offs they create for integration and release management.',
			whyItMatters: 'Branch strategy shapes integration friction, release cadence, and coordination overhead across the team.',
			keyTakeaway: 'Pick a branching model that matches your delivery risk, team size, and tolerance for merge complexity.'
		},
		description: 'An exploration of various Git branching strategies, including their advantages and disadvantages.',
		year: 2026,
		date: '2026-05-27',
		readingMinutes: 5,
		markdownPath: '/blog/20260527T112010_git-branching.md',
	},
	{
		title: 'Virtual pet evolution',
		url: '/blog/virtual-pet-evolution',
		slug: 'virtual-pet-evolution',
		summary: {
			whatIsDiscussed: 'The evolution of virtual pets from simple digital toys to AI-driven companions that respond more like living systems.',
			whyItMatters: 'The category shows how personalization and interaction deepen product value and keep users engaged over time.',
			keyTakeaway: 'Virtual pets are a useful lens on how consumer products become more emotionally and behaviorally adaptive.'
		},
		description: 'An exploration of the evolution of virtual pets, from early digital companions to modern AI-driven entities.',
		year: 2026,
		date: '2026-05-14',
		readingMinutes: 7,
		markdownPath: '/blog/20260514T152200_virtual-pet-evolution.md',
	},
	{
		title: "Parse Don't Validate",
		url: '/blog/parse-dont-validate',
		slug: 'parse-dont-validate',
		summary: {
			whatIsDiscussed: 'Parsing untrusted input into domain types that encode business rules instead of leaving the system in a loose, general state.',
			whyItMatters: 'Stronger types reduce repeated checks, make refactoring safer, and move business logic to one obvious boundary.',
			keyTakeaway: 'Parse once at the boundary, then work with trusted domain types inside the system.'
		},
		description: 'An exploration of the "Parse Don\'t Validate" principle in software development, examining its benefits and applications.',
		year: 2026,
		date: '2026-05-12',
		readingMinutes: 3,
		markdownPath: '/blog/20260512T104049_parse-dont-validate.md',
	},
	{
		title: 'Automation vs Human Intervention Analysis',
		url: '/blog/automation-vs-human-intervention-analysis',
		slug: 'automation-vs-human-intervention-analysis',
		summary: {
			whatIsDiscussed: 'Where automation should replace or augment human intervention across operational workflows.',
			whyItMatters: 'Over-automation and under-automation both create operational risk, just in different ways and at different costs.',
			keyTakeaway: 'Automate stable paths, keep humans for exceptions, ambiguity, and judgment calls.'
		},
		description: 'An analysis of the balance between automation and human intervention in various domains.',
		year: 2026,
		date: '2026-04-24',
		readingMinutes: 20,
		markdownPath: '/blog/20260424T102912_automation-vs-human-intervention-analysis.md',
	},
	{
		title: 'The Algorithmic Arbitrage',
		url: '/blog/algorithmic-arbitrage',
		slug: 'algorithmic-arbitrage',
		summary: {
			whatIsDiscussed: 'How algorithmic leverage changes the economics of global software work and the value of automation.',
			whyItMatters: 'The value shifts from labor arbitrage to systems that compound automated output, so the old cost model stops explaining the business.',
			keyTakeaway: 'Invest in leverage and workflow ownership, not just cheaper execution.'
		},
		description: 'An exploration of algorithmic arbitrage, examining the structural shift in global software development.',
		year: 2026,
		date: '2026-04-20',
		readingMinutes: 18,
		markdownPath: '/blog/20260420T134900_AI-Rent-Seeking-IT-Costs.md'
	},
	{
		title: 'Corporate Project Naming',
		url: '/blog/corporate-project-naming',
		slug: 'corporate-project-naming',
		summary: {
			whatIsDiscussed: 'How project names influence perception, alignment, and organizational culture before the work is even delivered.',
			whyItMatters: 'Names shape expectations and can either clarify intent or create confusion that spreads through the organization.',
			keyTakeaway: 'Treat naming as a strategic communication decision, not an afterthought.'
		},
		description: 'An exploration of the art and science of corporate project naming, examining the impact of names on project success and organizational culture.',
		year: 2026,
		date: '2026-04-20',
		readingMinutes: 19,
		markdownPath: "/blog/20260420T134300_Corporate-Project-Naming.md",
	},
	{
		title: 'Leadership Paradox of Agency',
		url: '/blog/leadership-paradox-of-agency',
		slug: 'leadership-paradox-of-agency',
		summary: {
			whatIsDiscussed: 'The tension between hiring autonomous people and then constraining them with process, approval layers, or vague control.',
			whyItMatters: 'Suppressing agency undermines the talent leaders claim to want and usually lowers the quality of decisions they get.',
			keyTakeaway: 'If autonomy matters, design for real decision-making power and back it with clear boundaries.'
		},
		markdownPath: '/blog/20260316T094038_Leadership-Paradox_Hiring-Autonomy-Suppressing-Talent.md',
		description: 'An exploration of the leadership paradox of agency, examining the balance between individual initiative and organizational control.',
		year: 2026,
		date: '2026-03-16',
		readingMinutes: 6,
	},
	{
		title: 'AI Doom Narrative - Profit or Precaution?',
		url: '/blog/ai-doom-narrative',
		slug: 'ai-doom-narrative',
		summary: {
			whatIsDiscussed: 'The tension between profit motives and precaution in AI doom narratives, and how those stories are framed.',
			whyItMatters: 'Fear can be used either to justify real safety work or to attract attention, funding, and authority.',
			keyTakeaway: 'Separate genuine risk analysis from opportunistic rhetoric and incentives.'
		},
		markdownPath: '/blog/20260313T155648_AI-Doom-Narrative_Profit-or-Precaution.md',
		description: 'An exploration of the AI doom narrative, examining the balance between profit-driven motives and precautionary measures in AI development.',
		year: 2026,
		date: '2026-03-13',
		readingMinutes: 19,
	},
	{
		title: 'The Global AI Race',
		url: '/blog/global-ai-race',
		slug: 'global-ai-race',
		summary: {
			whatIsDiscussed: 'The geopolitical and game-theoretic competition for AGI, compute, and industrial advantage across the US, China, and the wider market.',
			whyItMatters: 'Race dynamics push actors toward mutual defection, supply-chain weaponization, and safety pressure, which raises the cost of slowing down.',
			keyTakeaway: 'Absent verifiable cooperation, speed incentives dominate restraint and everyone optimizes for winning first.'
		},
		markdownPath: '/blog/20260313T132326_ai-race_ game-theory.md',
		description: 'An in-depth analysis of the global AI race, exploring the competitive landscape, technological advancements, and strategic implications.',
		year: 2026,
		date: '2026-03-13',
		readingMinutes: 17,
	},
	{
		title: 'Distributed Rate Limits',
		url: '/blog/distributed-rate-limits',
		slug: 'distributed-rate-limits',
		summary: {
			whatIsDiscussed: 'Distributed rate limiting patterns such as centralized buckets, queues, and log-based coordination, with each scheme solving a different coordination problem.',
			whyItMatters: 'Consistent throttling is critical for fairness, protection, and predictable throughput, especially when multiple services can emit traffic at once.',
			keyTakeaway: 'Choose the coordination mechanism that matches your failure mode, latency tolerance, and operational complexity.'
		},
		markdownPath: '/blog/20260130T145647_distrubuted-rate-limits.md',
		description: 'Strategies for managing rate limits across distributed architectures, including centralized token buckets, egress queues, and Kafka-based solutions.',
		year: 2026,
		date: '2026-01-30',
		readingMinutes: 5,
	},
	{
		title: 'Contract-First Development',
		url: '/blog/contract-first',
		slug: 'contract-first',
		summary: {
			whatIsDiscussed: 'Contract-first development versus code-first implementation, with the contract treated as the primary design artifact.',
			whyItMatters: 'Explicit schemas and interfaces reduce ambiguity, especially in AI-assisted work where implementation details can drift quickly.',
			keyTakeaway: 'Define the contract before implementation so the system has a stable target to build against.'
		},
		markdownPath: '/blog/20260129T124315_code-contract-first.md',
		description: 'A comprehensive analysis of Contract-First versus Code-First paradigms in AI-driven software architecture.',
		year: 2026,
		date: '2026-01-29',
		readingMinutes: 8,
	},
	{
		title: 'Hexagonal Architecture',
		url: '/blog/hexagonal-architecture',
		slug: 'hexagonal-architecture',
		summary: {
			whatIsDiscussed: 'Hexagonal architecture and its ports-and-adapters boundary between the domain and the outside world.',
			whyItMatters: 'Isolating the domain from infrastructure makes systems easier to test, change, and reason about over time.',
			keyTakeaway: 'Keep the core independent and let adapters absorb external complexity and integration concerns.'
		},
		markdownPath: '/blog/20251204T091429_hexagonal-architecture_d3083256.md',
		description: 'An exploration of Hexagonal Architecture and its benefits in software design.',
		year: 2025,
		date: '2025-12-04',
		readingMinutes: 18,
	},
	{
		title: 'The Wardley Doctrine',
		url: '/blog/wardley-doctrine',
		slug: 'wardley-doctrine',
		summary: {
			whatIsDiscussed: 'The Wardley Doctrine as a strategy lens for system evolution and competitive positioning.',
			whyItMatters: 'Component maturity changes what you should build, buy, standardize, or ignore, so strategy has to move with the landscape.',
			keyTakeaway: 'Strategy should follow component evolution, not static roadmaps or org charts.'
		},
		markdownPath: '/blog/20251203T141812_the-wardley-doctrine_5b62a2ff.md',
		description: 'An in-depth look at the principles and applications of the Wardley Doctrine.',
		year: 2025,
		date: '2025-12-03',
		readingMinutes: 14,
	},
	{
		title: 'Wardley Mapping',
		url: '/blog/wardley-mapping',
		slug: 'wardley-mapping',
		summary: {
			whatIsDiscussed: 'Wardley mapping as a way to visualize landscape, movement, dependency, and how parts of a system mature.',
			whyItMatters: 'Seeing commodity-to-custom evolution clarifies where to invest, differentiate, or standardize instead of guessing from first principles.',
			keyTakeaway: 'Map your environment before choosing a strategy so you can see which parts are still evolving.'
		},
		markdownPath: '/blog/20251203T134726_understanding-wardley-mapping_9b296090.md',
		description: 'Understanding Wardley Mapping and its applications in strategic planning.',
		year: 2025,
		date: '2025-12-03',
		readingMinutes: 24,
	},
	{
		title: 'The Story of Money',
		url: '/blog/story-of-money',
		slug: 'story-of-money',
		summary: {
			whatIsDiscussed: 'The history of money and how it evolves with social and institutional trust over time.',
			whyItMatters: 'Money is a coordination technology, not just a medium of exchange, so its design shapes behavior and power.',
			keyTakeaway: 'Monetary systems change when trust, scale, and institutions change, not just when the currency changes.'
		},
		markdownPath: '/blog/20251021T160138_story-of-money-claude_f84f77f3.md',
		description: 'An exploration of the history and evolution of money.',
		year: 2025,
		date: '2025-10-21',
		readingMinutes: 22,
	},
	{
		title: "The XY Problem",
		url: "/blog/xy-problem",
		slug: "xy-problem",
		summary: {
			whatIsDiscussed: 'The XY Problem and how teams can end up solving the wrong problem with the wrong solution.',
			whyItMatters: 'Hidden requirements waste delivery effort, distort decision-making, and make the eventual fix look more complicated than it is.',
			keyTakeaway: 'Ask about the underlying need before committing to a fix or designing a workaround.'
		},
		markdownPath: '/blog/20251017T095616_the-xy-problem-a-critical-analysis-of-its-relevance-to-business-delivery_cc8df569.md',
		description: "A critical analysis of the XY Problem and its relevance to business delivery.",
		year: 2025,
		date: '2025-10-17',
		readingMinutes: 7,
	},
	{
		title: 'The Hook Model',
		url: '/blog/hook-model',
		slug: 'hook-model',
		summary: {
			whatIsDiscussed: 'The Hook Model for habit formation and engagement, including the recurring loops that keep users coming back.',
			whyItMatters: 'Recurring loops drive retention, but they also raise ethical design concerns when the loop is stronger than the value.',
			keyTakeaway: 'Build useful habit loops that serve the user, not manipulative ones that only serve the product.'
		},
		markdownPath: '/blog/20250918T100917_the-hook-model-a-strategic-framework-for-building-habit-forming-products-and-client-engagement_b967f5c2.md',
		description: 'A strategic framework for building habit-forming products and client engagement.',
		year: 2025,
		date: '2025-09-18',
		readingMinutes: 14,
	},
	{
		title: 'The Toulmin Model',
		url: '/blog/toulmin-model',
		slug: 'toulmin-model',
		summary: {
			whatIsDiscussed: 'The Toulmin model as a structure for argumentation and decision-making, with claims, evidence, and warrants separated explicitly.',
			whyItMatters: 'Clearer claims, evidence, and warrants improve reasoning quality and make weak assumptions easier to spot.',
			keyTakeaway: 'Make the reasoning chain explicit so other people can test the logic instead of guessing at it.'
		},
		markdownPath: '/blog/20250918T100326_the-toulmin-model-a-framework-for-robust-argumentation-and-decision-making_13f85676.md',
		description: 'A framework for robust argumentation and decision-making in strategic discussions.',
		year: 2025,
		date: '2025-09-18',
		readingMinutes: 13,
	},
	{
		title: 'Empathy Maps',
		url: '/blog/empathy-maps',
		slug: 'empathy-maps',
		summary: {
			whatIsDiscussed: 'Empathy maps as a method for understanding customer perspectives through what people say, think, feel, and do.',
			whyItMatters: 'Better insight into lived context improves product decisions because you stop designing against a caricature of the user.',
			keyTakeaway: 'Design from observed human context, not from assumptions that sound plausible in the room.'
		},
		markdownPath: '/blog/20250917T160713_empathy-maps-understanding-your-customer-through-their-eyes_cb46b520.md',
		description: 'Understanding your customer through their eyes with structured empathy mapping.',
		year: 2025,
		date: '2025-09-17',
		readingMinutes: 15,
	},
	{
		title: 'Strategy on a Page',
		url: '/blog/strategy-on-a-page',
		slug: 'strategy-on-a-page',
		summary: {
			whatIsDiscussed: 'Using a one-page strategy artifact to force clarity, alignment, and a smaller set of real choices.',
			whyItMatters: 'Concise strategy surfaces trade-offs, priorities, and constraints that often disappear in longer slide decks or docs.',
			keyTakeaway: 'If it cannot fit on one page, it is probably not yet sharp enough to guide action.'
		},
		markdownPath: '/blog/20250917T155759_strategy-on-a-page-a-working-backwards-approach-to-strategic-clarity_432d80ed.md',
		description: 'A working backwards approach to strategic clarity and organizational alignment.',
		year: 2025,
		date: '2025-09-17',
		readingMinutes: 12,
	},
	{
		title: 'Amazon Six Pager',
		url: '/blog/amazon-six-pager',
		slug: 'amazon-six-pager',
		summary: {
			whatIsDiscussed: "Amazon's six-page narrative memo format and the working-backwards style it reinforces.",
			whyItMatters: 'Narrative documents force evidence, logic, and decision-quality thinking instead of shallow presentation polish.',
			keyTakeaway: 'Write the argument first; the format will expose weak reasoning and missing evidence quickly.'
		},
		markdownPath: '/blog/20250917T155029_the-amazon-6-pager-working-backwards-narrative-a-complete-guide_c573ddf6.md',
		description: 'Understanding Amazon\'s six-page narrative memo process for effective communication.',
		year: 2025,
		date: '2025-09-17',
		readingMinutes: 11,
	},
	{
		title: 'Laws of Software',
		url: '/blog/laws-of-software',
		slug: 'laws-of-software',
		summary: {
			whatIsDiscussed: 'A curated collection of software laws and aphorisms about design, scaling, and delivery across different system sizes.',
			whyItMatters: 'These heuristics compress experience into reusable guidance for real systems, especially when formal rules are too rigid.',
			keyTakeaway: 'Use the laws as lenses for judgment, not as literal rules to apply blindly.'
		},
		htmlComponent: 'LawsOfSoftware',
		description: 'Collection of laws, principles, and aphorisms that are widely recognized.',
		year: 2025,
		date: '2025-09-17',
		readingMinutes: 3,
	},
];