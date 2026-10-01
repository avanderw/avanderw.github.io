# The N+1 Query Problem, and How to Actually Fix It

One query fetches a list. Then one more query, per row, fetches what goes with it. It runs fine on your laptop and falls over in production. Here's why, and how to avoid it in every major ORM.

## What it is

An N+1 query problem happens when your app runs one query to fetch a list of records, then loops over that list and fires a separate query for each row's related data. Fetch 100 posts, then ask for each post's author one at a time, and you've run 101 queries where one would do.

It's one of the most common performance bugs in database-backed apps, and it's almost always accidental. The usual cause is an ORM feature called **lazy loading**: related data is fetched only when you touch it, not when you first query the record.

## A classic example

Say you're rendering a list of 100 blog posts, each with its author's name.

**Query 1 — the list:**

```sql
SELECT * FROM posts;
-- returns 100 rows
```

**Then, inside the loop — 100 more queries:**

```sql
SELECT * FROM authors WHERE id = 1;
SELECT * FROM authors WHERE id = 2;
SELECT * FROM authors WHERE id = 3;
-- ...repeated for every post
```

**Total: 101 database round-trips** to render one page. A single join does the same job in one query:

```sql
SELECT posts.*, authors.name AS author_name
FROM posts
JOIN authors ON authors.id = posts.author_id;
```

## Why it's hard to catch

N+1 queries hide where most people test: in development, against a small seed database. A handful of extra queries at a few milliseconds each is nothing. Nobody notices.

In production, against real data volumes, the same code turns into thousands of round-trips per request. Each one pays the full cost of a network round-trip to the database, and the database spends CPU re-planning a query it's already seen a thousand times. Connection pools, usually sized for tens of concurrent queries rather than thousands, saturate, and unrelated requests start queuing behind them.

The slowdown doesn't scale with your code; it scales with the number of rows in the outer query. That's why it tends to show up suddenly, under load, well after the code shipped, which is exactly when it's most expensive to find.

## When an N+1 sits on a hot path

A **hot path** is code that handles a large share of requests or has especially tight latency requirements. A dashboard loaded on every visit is a typical example. An N+1 query on a hot path does not grow exponentially: it runs one query for the list plus one query per row, on every request. High traffic multiplies that per-request cost across the service.

For example, if 1,000 dashboard requests each fetch 50 posts and then fetch each author's details separately, the database handles 51,000 query executions: 1,000 list queries plus 50,000 author queries. If each request instead uses one join, that is 1,000 query executions; with a separate batched query for authors, it is 2,000. These counts assume there is no query or application-level caching between requests.

That extra work can exhaust connection pools, increase database CPU use, and add latency for unrelated requests. When prioritising fixes, look at both query counts per request and how often the endpoint runs; an N+1 on a frequently used, latency-sensitive path deserves attention before the same pattern on a rarely used admin screen.

## How to catch it before it ships

You don't have to find N+1 queries by reading code. Every major ecosystem has tooling that shows you the query count directly:

- **Django** — the Django Debug Toolbar lists every SQL statement a request issued, with duplicates flagged.
- **Rails** — the `bullet` gem watches for this exact pattern and warns in logs or the browser console.
- **Hibernate / JPA** — turn on `hibernate.generate_statistics`, or just log SQL (`spring.jpa.show-sql=true`) and count statements per request.
- **Any stack** — an APM tool (Datadog, New Relic, Sentry) will flag a request that issues an unusually high number of similar queries.
- **Any stack, no tooling** — log every query with a request-scoped counter and alert past a threshold, say 20 queries per request, in CI or staging.

## Fixing it: two strategies

Every fix replaces "fetch related data one row at a time" with "fetch it in bulk." There are two standard ways to do that, and most ORMs support both.

| Strategy | How it works | Best for |
|---|---|---|
| **Eager loading (JOIN)** | Fetch the main records and their related records in one query, using a SQL join. | One-to-one or many-to-one relationships (post → author) |
| **Batch loading (IN clause)** | Run the first query, collect the foreign keys, then run one more query with `WHERE id IN (...)` to fetch everything related at once. | One-to-many relationships (post → comments), or when a join would duplicate rows |

Here's each strategy in the ORMs you're most likely to be using.

### Django ORM — `select_related` · `prefetch_related`

```python
# Eager load (JOIN) — for ForeignKey / OneToOne
posts = Post.objects.select_related("author")

# Batch load (IN clause) — for reverse FK / ManyToMany
posts = Post.objects.prefetch_related("comments")
```

### Ruby on Rails · ActiveRecord — `includes`

```ruby
# Rails picks JOIN vs. a separate batched query
# depending on the query shape
posts = Post.includes(:author)

# Force a join explicitly when you need to
# filter on the association
posts = Post.eager_load(:author).where(authors: { active: true })
```

### Java · Hibernate / JPA — `JOIN FETCH` · `@BatchSize`

```sql
-- JPQL eager load
SELECT p FROM Post p JOIN FETCH p.author
```

```java
// Or batch lazy-loaded associations transparently
@BatchSize(size = 25)
@OneToMany(mappedBy = "post")
private List<Comment> comments;
```

### Prisma (Node / TypeScript) — `include`

```typescript
const posts = await prisma.post.findMany({
  include: { author: true, comments: true },
});
```

### GraphQL resolvers (any language) — DataLoader

GraphQL resolvers run independently per field, which makes them especially prone to N+1: a naive `author` resolver fires once per post. DataLoader batches and deduplicates those calls within a single tick:

```javascript
const authorLoader = new DataLoader(async (ids) => {
  const authors = await db.author.findMany({ where: { id: { in: ids } } });
  return ids.map(id => authors.find(a => a.id === id));
});

// Each call queues; DataLoader fires one batched query
const author = await authorLoader.load(post.authorId);
```

## Don't over-correct

Eager loading everything, everywhere, trades one problem for another. A join that pulls in a `has_many` association you don't need inflates every row's result set and wastes memory and bandwidth. The fix for N+1 is fetching what you need in bulk, not fetching everything by default. Load associations where you'll actually use them, and let the query match the page.

## The Takeaway

The pattern is the same in every language: a database call inside a loop over your own results is one query too many. If you're issuing a query for each row of a result set you already have, pull that query outside the loop and run it once, in bulk, for every row you need.