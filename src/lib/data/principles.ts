import type { PrincipleGroup } from '../types.js';

export const principleGroups: PrincipleGroup[] = [
	{
		title: 'Working with AI',
		description: 'Using agents and automation deliberately.',
		principles: [
			{
				id: 'use-code-for-everything-you-can',
				title: 'Use Code for Everything You Can',
				description:
					'Use deterministic tools for deterministic work. Spend tokens where language, judgement, or synthesis genuinely matter.'
			},
			{
				id: 'every-llm-session-builds-towards-the-next',
				title: 'Every LLM Session Builds Towards the Next',
				description:
					'Leave behind durable notes, code, or structure after every agent session. These artefacts make the next session cheaper and more effective.'
			},
			{
				id: 'give-the-llm-a-way-to-check-itself',
				title: 'Give the LLM a Way to Check Itself',
				description:
					'Check output mechanically whenever you can. Prompts are non-deterministic and will sometimes produce incorrect results.'
			},
			{
				id: 'import-ideas-not-implementations',
				title: 'Import Others\' Ideas, Not Their Implementations',
				description:
					'Distil useful ideas before adopting automation. Tools have little value when they are not understood or adapted to your needs.'
			},
			{
				id: 'agents-have-the-same-context-as-humans',
				title: 'Agents Must Have the Same Context as Humans',
				description:
					'Keep agents and people working from the same current source of truth. Shared context prevents each from acting on stale assumptions.'
			}
		]
	},
	{
		title: 'Working with Others',
		description: 'Building effective teams through trust, clarity, and respect.',
		principles: [
			{
				id: 'keep-teams-small',
				title: 'Keep Teams Small',
				description:
					'Keep teams small and work in independent pieces. This reduces coordination overhead while allowing small efforts to compound.'
			},
			{
				id: 'real-time-is-for-systems-not-people',
				title: 'Real-Time Is for Systems, Not People',
				description:
					'Resist manufactured urgency and default to considered response times. Systems need real-time behaviour; people need room to think.'
			},
			{
				id: 'let-go-and-trust-more',
				title: 'Let Go and Trust More',
				description:
					'Delegate outcomes and communicate asynchronously. Trust makes presence and meetings unnecessary proxies for progress.'
			},
			{
				id: 'play-the-ball-respect-the-players',
				title: 'Play the Ball, Respect the Players',
				description:
					'Focus on the work while treating people with respect. Build people along the way, never at their expense.'
			},
			{
				id: 'disagree-and-commit',
				title: 'Disagree and Commit',
				description:
					'Commit fully once a decision is made, even when you disagree. A team cannot execute a strategy that it continues to relitigate.'
			},
			{
				id: 'make-ownership-clear',
				title: 'Make Ownership Clear',
				description:
					'Give each decision and task a clear owner. Unowned work is easily delayed because everyone assumes someone else will act.'
			},
			{
				id: 'assume-positive-intent-address-reality',
				title: 'Assume Positive Intent, Address Reality',
				description:
					'Start from trust and address observable behaviour directly. This preserves respect without avoiding difficult conversations.'
			}
		]
	},
	{
		title: 'Working Well',
		description: 'Sustaining focus, learning, and purposeful progress.',
		principles: [
			{
				id: 'if-it-can-be-done-now-do-it',
				title: 'If It Can Be Done Now, Do It',
				description:
					'Do not delay work that can be completed now. Prompt action prevents small tasks from becoming persistent mental overhead.'
			},
			{
				id: 'get-enough-sleep',
				title: 'Get Enough Sleep',
				description:
					'Protect eight hours each for work, life, and sleep. Do not fund work by borrowing from health or life.'
			},
			{
				id: 'quality-hours',
				title: 'Quality Hours',
				description:
					'Protect uninterrupted time for demanding work. One focused hour is worth more than two fragmented half-hour sessions.'
			},
			{
				id: 'meet-your-needs',
				title: 'Meet Your Needs',
				description:
					'Meet genuine needs deliberately. Deferring them often costs more in workarounds, friction, and lost time.'
			},
			{
				id: 'do-not-let-a-good-crisis-go-to-waste',
				title: 'Do Not Let a Good Crisis Go to Waste',
				description:
					'Stabilise the immediate problem, learn from it, and change the system. This makes the same failure less likely to recur.'
			},
			{
				id: 'easy-work',
				title: 'Easy Work',
				description:
					'Respect the effort behind apparently easy work. Simplicity often reflects experience, care, and effort that deserve recognition.'
			},
			{
				id: 'lead-with-the-why',
				title: 'Lead with the Why',
				description:
					'Start with the outcome and the reason it matters. Once the why is clear, explore the many possible hows.'
			},
			{
				id: 'reduce-before-you-add',
				title: 'Reduce Before You Add',
				description:
					'Remove unnecessary process, tools, and dependencies before adding more. Simplicity lowers the cost of change.'
			},
			{
				id: 'measure-outcomes-not-activity',
				title: 'Measure Outcomes, Not Activity',
				description:
					'Judge work by the value it creates and the problems it resolves. Visible busyness is not progress.'
			}
		]
	}
];