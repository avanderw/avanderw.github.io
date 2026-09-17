# What Extreme Ownership Taught Me About Getting Things Done

I recently read *Extreme Ownership* by Jocko Willink and Leif Babin, and while it's framed around their experiences as Navy SEALs, most of it translates directly to how teams function anywhere — including in tech and banking, where I spend my days. Here's what stuck with me, and where I've seen it play out in my own work.

## Ownership Is Structural

The book's central argument is simple to state and hard to live by: a leader owns everything in their world. Not "everything within my job description" — everything. If a plan fails, it's not because the team didn't execute; it's because the leader didn't communicate clearly enough, didn't train the team well enough, or didn't check that the plan was actually understood. There's no room for "well, I told them what to do." If they didn't do it, that's still on you.

That idea sounds almost unreasonable at first. But the more I sat with it, the more I recognized how often the opposite plays out at work: ownership gets diffused until it's genuinely unclear who's responsible for anything.

A good example of this is Amazon's practice of single-threaded ownership — a single person or small team owns a given outcome end-to-end, rather than that responsibility being spread across multiple people or teams. When more than one person "owns" something, you don't get more accountability, you get less. When something breaks, who decides to act? Is it decision by committee — which can go either way, sometimes producing a better call because more perspectives were involved, but just as often stalling because no one wants to move first? I see the same pattern in software architecture: package code by layer instead of by feature, and a bug in one feature might touch three layers owned by three different teams, so nobody clearly owns the fix. Package by feature, and there's no ambiguity. It's a small structural decision with the same effect Willink describes — it forces clarity about who's accountable, which forces faster, better decisions.

## Keep It Simple

One practice I lean on heavily, which the book's "Simple" principle validated for me, is aligning a team around a single client-value-adding statement — one sentence, not two — before making a decision or solutioning anything. That sentence becomes the north star. It simplifies the lead's job enormously, because every option can be measured against one thing instead of five.

It does frustrate the people who want more detail, and I understand why — detail feels like rigor. But in my experience, the clarity you get from forcing a single sentence is worth more than the comfort of a fuller spec, especially once a team is under pressure and needs to make fast calls without checking back in.

## Prioritize and Execute

This is the principle I feel most strongly about, and it connects directly to [my approach to Getting Things Done](/blog/getting-things-done) and [my own principles](/principles). The idea, stripped down: when everything feels urgent, identify the single highest-priority problem, solve it completely, and only then move to the next one in the chain. Not partially address three things — fully close one, then advance.

It sounds obvious on paper. In practice, it's one of the hardest disciplines to hold onto, because the pull toward "just quickly also handle this other thing" is constant. But partial progress on multiple fronts usually just means multiple unfinished things, and unfinished things compound.

## Agility and Consistency

The book's closing idea, the "dichotomy of leadership," is about balancing opposing forces — and the balance I think about most is agility versus strategic consistency. Agility is genuinely valuable tactically: it lets you solve the problem in front of you quickly, adapt to what you're actually seeing on the ground. But when that same instinct for agility gets applied at the strategic level, the consequences compound differently. Tactical moves start quietly pulling strategy into directions you never intended, decision by decision, none of them wrong in isolation.

I think this is a big part of where technical debt actually comes from. It's rarely one bad decision — it's a series of locally-reasonable tactical moves that, without a consistent strategic anchor, drift the system somewhere nobody chose deliberately. Agility is essential, but a strategy that's too agile stops being a strategy — it just sows confusion, because nobody can tell what's actually stable and what's up for renegotiation this week.

## Clarity Is the Throughline

What ties all of this together for me is that clarity — of ownership, of purpose, of priority, of strategic direction — isn't a soft leadership nicety. It's the thing that makes fast, good decisions possible at all. Every one of these ideas, from Willink's book and from what I've picked up running teams myself, is really the same lesson from a different angle: ambiguity is expensive, and most of leadership is the work of removing it.