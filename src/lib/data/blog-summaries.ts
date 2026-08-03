import type { BlogSummary } from '../types.js';

export const blogSummaries: Record<string, BlogSummary> = {
	'ai-writing-authorship-and-what-we-should-value-now': {
		whatIsDiscussed: 'How AI-assisted writing changes authorship, incentives, and what readers should value when text is machine-assisted.',
		whyItMatters: 'Visibility and volume can outrun verification, so readers need stronger signals than polish alone to judge trustworthiness.',
		keyTakeaway: 'Use AI for drafting, but keep accountability, source checking, and final judgment with the human author.'
	},
	'files-are-all-you-need': {
		whatIsDiscussed: 'File-based Unix-style workflows for LLM pipelines and long-running automation, with files acting as the main coordination boundary.',
		whyItMatters: 'Clear file boundaries improve reliability, auditability, and governance because state is visible instead of implicit.',
		keyTakeaway: 'Prefer simple file interfaces over hidden process state when you need robust orchestration.'
	},
	'cell-c-spectrum-and-litigation': {
		whatIsDiscussed: 'Claims around Cell C\'s spectrum position, virtual network model, and the litigation context around those claims.',
		whyItMatters: 'Telecom strategy changes quickly when legal and regulatory facts are fuzzy, so the evidence matters as much as the story.',
		keyTakeaway: 'Keep the marketing narrative separate from what can actually be verified in public records.'
	},
	'confidence-in-ai-and-humans': {
		whatIsDiscussed: 'Confidence calibration in AI models and human decision-making, and how both can appear more certain than they really are.',
		whyItMatters: 'Unjustified certainty creates bad decisions whether it comes from a model, a manager, or a team culture.',
		keyTakeaway: 'Reward calibrated confidence and explicit uncertainty instead of performative certainty.'
	},
	'vertical-slices-vs-horizontal-layers': {
		whatIsDiscussed: 'A comparison of vertical slice delivery and layered architecture, with attention to how work flows through a system.',
		whyItMatters: 'Architecture choices shape coupling, delivery speed, and ownership, so the wrong structure makes change harder than it needs to be.',
		keyTakeaway: 'Choose the structure that fits the actual flow of work, not the one your team inherited.'
	},
	'push-vs-pull-deployment-models': {
		whatIsDiscussed: 'Push and pull deployment patterns for releasing software, and how they differ in control and reconciliation.',
		whyItMatters: 'Deployment direction changes security boundaries, failure handling, and scaling behavior across distributed systems.',
		keyTakeaway: 'Pull models often reduce coupling, especially when you want agents or nodes to reconcile on their own schedule.'
	},
	'compile-time-errors-with-ai': {
		whatIsDiscussed: 'Compile-time-first verification for agent-generated code, with compilers used as the primary gate before execution.',
		whyItMatters: 'Earlier failures are cheaper and easier for agents to repair than runtime defects, and they produce more deterministic feedback.',
		keyTakeaway: 'Use compile-time gates first, then add runtime containment for whatever cannot be proven statically.'
	},
	'git-branching-strategies': {
		whatIsDiscussed: 'Major Git branching models and the trade-offs they create for integration and release management.',
		whyItMatters: 'Branch strategy shapes integration friction, release cadence, and coordination overhead across the team.',
		keyTakeaway: 'Pick a branching model that matches your delivery risk, team size, and tolerance for merge complexity.'
	},
	'virtual-pet-evolution': {
		whatIsDiscussed: 'The evolution of virtual pets from simple digital toys to AI-driven companions that respond more like living systems.',
		whyItMatters: 'The category shows how personalization and interaction deepen product value and keep users engaged over time.',
		keyTakeaway: 'Virtual pets are a useful lens on how consumer products become more emotionally and behaviorally adaptive.'
	},
	'parse-dont-validate': {
		whatIsDiscussed: 'Parsing untrusted input into domain types that encode business rules instead of leaving the system in a loose, general state.',
		whyItMatters: 'Stronger types reduce repeated checks, make refactoring safer, and move business logic to one obvious boundary.',
		keyTakeaway: 'Parse once at the boundary, then work with trusted domain types inside the system.'
	},
	'automation-vs-human-intervention-analysis': {
		whatIsDiscussed: 'Where automation should replace or augment human intervention across operational workflows.',
		whyItMatters: 'Over-automation and under-automation both create operational risk, just in different ways and at different costs.',
		keyTakeaway: 'Automate stable paths, keep humans for exceptions, ambiguity, and judgment calls.'
	},
	'algorithmic-arbitrage': {
		whatIsDiscussed: 'How algorithmic leverage changes the economics of global software work and the value of automation.',
		whyItMatters: 'The value shifts from labor arbitrage to systems that compound automated output, so the old cost model stops explaining the business.',
		keyTakeaway: 'Invest in leverage and workflow ownership, not just cheaper execution.'
	},
	'corporate-project-naming': {
		whatIsDiscussed: 'How project names influence perception, alignment, and organizational culture before the work is even delivered.',
		whyItMatters: 'Names shape expectations and can either clarify intent or create confusion that spreads through the organization.',
		keyTakeaway: 'Treat naming as a strategic communication decision, not an afterthought.'
	},
	'leadership-paradox-of-agency': {
		whatIsDiscussed: 'The tension between hiring autonomous people and then constraining them with process, approval layers, or vague control.',
		whyItMatters: 'Suppressing agency undermines the talent leaders claim to want and usually lowers the quality of decisions they get.',
		keyTakeaway: 'If autonomy matters, design for real decision-making power and back it with clear boundaries.'
	},
	'ai-doom-narrative': {
		whatIsDiscussed: 'The tension between profit motives and precaution in AI doom narratives, and how those stories are framed.',
		whyItMatters: 'Fear can be used either to justify real safety work or to attract attention, funding, and authority.',
		keyTakeaway: 'Separate genuine risk analysis from opportunistic rhetoric and incentives.'
	},
	'global-ai-race': {
		whatIsDiscussed: 'The geopolitical and game-theoretic competition for AGI, compute, and industrial advantage across the US, China, and the wider market.',
		whyItMatters: 'Race dynamics push actors toward mutual defection, supply-chain weaponization, and safety pressure, which raises the cost of slowing down.',
		keyTakeaway: 'Absent verifiable cooperation, speed incentives dominate restraint and everyone optimizes for winning first.'
	},
	'distributed-rate-limits': {
		whatIsDiscussed: 'Distributed rate limiting patterns such as centralized buckets, queues, and log-based coordination, with each scheme solving a different coordination problem.',
		whyItMatters: 'Consistent throttling is critical for fairness, protection, and predictable throughput, especially when multiple services can emit traffic at once.',
		keyTakeaway: 'Choose the coordination mechanism that matches your failure mode, latency tolerance, and operational complexity.'
	},
	'contract-first': {
		whatIsDiscussed: 'Contract-first development versus code-first implementation, with the contract treated as the primary design artifact.',
		whyItMatters: 'Explicit schemas and interfaces reduce ambiguity, especially in AI-assisted work where implementation details can drift quickly.',
		keyTakeaway: 'Define the contract before implementation so the system has a stable target to build against.'
	},
	'hexagonal-architecture': {
		whatIsDiscussed: 'Hexagonal architecture and its ports-and-adapters boundary between the domain and the outside world.',
		whyItMatters: 'Isolating the domain from infrastructure makes systems easier to test, change, and reason about over time.',
		keyTakeaway: 'Keep the core independent and let adapters absorb external complexity and integration concerns.'
	},
	'wardley-doctrine': {
		whatIsDiscussed: 'The Wardley Doctrine as a strategy lens for system evolution and competitive positioning.',
		whyItMatters: 'Component maturity changes what you should build, buy, standardize, or ignore, so strategy has to move with the landscape.',
		keyTakeaway: 'Strategy should follow component evolution, not static roadmaps or org charts.'
	},
	'wardley-mapping': {
		whatIsDiscussed: 'Wardley mapping as a way to visualize landscape, movement, dependency, and how parts of a system mature.',
		whyItMatters: 'Seeing commodity-to-custom evolution clarifies where to invest, differentiate, or standardize instead of guessing from first principles.',
		keyTakeaway: 'Map your environment before choosing a strategy so you can see which parts are still evolving.'
	},
	'story-of-money': {
		whatIsDiscussed: 'The history of money and how it evolves with social and institutional trust over time.',
		whyItMatters: 'Money is a coordination technology, not just a medium of exchange, so its design shapes behavior and power.',
		keyTakeaway: 'Monetary systems change when trust, scale, and institutions change, not just when the currency changes.'
	},
	'xy-problem': {
		whatIsDiscussed: 'The XY Problem and how teams can end up solving the wrong problem with the wrong solution.',
		whyItMatters: 'Hidden requirements waste delivery effort, distort decision-making, and make the eventual fix look more complicated than it is.',
		keyTakeaway: 'Ask about the underlying need before committing to a fix or designing a workaround.'
	},
	'hook-model': {
		whatIsDiscussed: 'The Hook Model for habit formation and engagement, including the recurring loops that keep users coming back.',
		whyItMatters: 'Recurring loops drive retention, but they also raise ethical design concerns when the loop is stronger than the value.',
		keyTakeaway: 'Build useful habit loops that serve the user, not manipulative ones that only serve the product.'
	},
	'toulmin-model': {
		whatIsDiscussed: 'The Toulmin model as a structure for argumentation and decision-making, with claims, evidence, and warrants separated explicitly.',
		whyItMatters: 'Clearer claims, evidence, and warrants improve reasoning quality and make weak assumptions easier to spot.',
		keyTakeaway: 'Make the reasoning chain explicit so other people can test the logic instead of guessing at it.'
	},
	'empathy-maps': {
		whatIsDiscussed: 'Empathy maps as a method for understanding customer perspectives through what people say, think, feel, and do.',
		whyItMatters: 'Better insight into lived context improves product decisions because you stop designing against a caricature of the user.',
		keyTakeaway: 'Design from observed human context, not from assumptions that sound plausible in the room.'
	},
	'strategy-on-a-page': {
		whatIsDiscussed: 'Using a one-page strategy artifact to force clarity, alignment, and a smaller set of real choices.',
		whyItMatters: 'Concise strategy surfaces trade-offs, priorities, and constraints that often disappear in longer slide decks or docs.',
		keyTakeaway: 'If it cannot fit on one page, it is probably not yet sharp enough to guide action.'
	},
	'amazon-six-pager': {
		whatIsDiscussed: 'Amazon\'s six-page narrative memo format and the working-backwards style it reinforces.',
		whyItMatters: 'Narrative documents force evidence, logic, and decision-quality thinking instead of shallow presentation polish.',
		keyTakeaway: 'Write the argument first; the format will expose weak reasoning and missing evidence quickly.'
	},
	'laws-of-software': {
		whatIsDiscussed: 'A curated collection of software laws and aphorisms about design, scaling, and delivery across different system sizes.',
		whyItMatters: 'These heuristics compress experience into reusable guidance for real systems, especially when formal rules are too rigid.',
		keyTakeaway: 'Use the laws as lenses for judgment, not as literal rules to apply blindly.'
	}
};