# CLAUDE_CHECKER.md

# Project Development Guidelines

These guidelines define the engineering standards that MUST be followed for every implementation, modification, refactor, or bug fix within this project.

Completion of a task does **not** mean the implementation is finished. Every change must undergo a full quality review before being considered complete.

---

# Primary Objective

Build software that is:

- Clean
- Maintainable
- Readable
- Secure
- Efficient
- Consistent
- Scalable

Every decision should prioritize long-term maintainability over short-term convenience.

---

# Mandatory Self-Review

Before completing any task, perform a complete review of every modified file.

Ask yourself:

- Is every line necessary?
- Is there duplicated logic?
- Can this implementation be simpler?
- Can readability be improved?
- Is there unnecessary complexity?
- Does this introduce technical debt?

Never assume the first implementation is the best implementation.

---

# Code Simplicity

Every line of code must justify its existence.

If the exact same behavior can be achieved with:

- fewer lines
- less complexity
- fewer conditions
- fewer abstractions

while maintaining readability and maintainability,

then refactor.

Reducing code is encouraged only when:

- functionality remains identical
- readability improves or stays the same
- maintainability improves
- performance does not regress

Never shorten code simply to reduce line count.

Code golfing is prohibited.

---

# Duplicate Logic

Always check for:

- repeated functions
- repeated components
- repeated calculations
- repeated conditional logic
- repeated styling
- repeated constants
- repeated configuration

Before creating new code, determine whether existing code can be reused.

Avoid duplication whenever practical.

---

# Abstractions

Do not introduce abstractions without a clear reason.

Avoid creating:

- components used only once without future benefit
- helper functions with minimal value
- unnecessary wrappers
- deeply nested structures
- excessive configuration
- generic utilities that solve only one case

Every abstraction should reduce complexity rather than increase it.

---

# Readability

Code should explain itself.

Prefer:

- descriptive names
- predictable structure
- small focused functions
- consistent formatting

Avoid:

- clever shortcuts
- confusing nesting
- unnecessary indirection
- overly compact logic

Someone unfamiliar with the project should be able to understand the implementation without excessive effort.

---

# Comments

Write comments only when they explain:

- why something exists
- important assumptions
- architectural decisions
- tradeoffs
- edge cases

Do not comment obvious code.

Good code minimizes the need for comments.

---

# Consistency

Maintain consistency across the project.

Follow existing conventions for:

- naming
- formatting
- organization
- file structure
- spacing
- component patterns
- architectural decisions

Do not introduce a new style unless there is a compelling technical reason.

---

# Performance

Every implementation should be reviewed for unnecessary work.

Look for:

- redundant computations
- unnecessary rendering
- unnecessary event listeners
- repeated processing
- avoidable allocations
- excessive DOM complexity

Optimize where meaningful, but never sacrifice readability for micro-optimizations.

---

# Security

Assume all external input is untrusted.

Always validate and safely handle:

- user input
- API responses
- query parameters
- URLs
- uploaded content
- clipboard operations
- browser storage

Never expose sensitive information.

Never hardcode secrets.

Avoid introducing unnecessary attack surfaces.

---

# Error Handling

Every feature should fail gracefully.

Avoid silent failures.

Provide meaningful handling for:

- invalid input
- unavailable resources
- unexpected responses
- asynchronous failures

Do not leave users or developers without useful feedback.

---

# Accessibility

Ensure interfaces remain accessible.

Review:

- semantic structure
- keyboard navigation
- focus behavior
- labels
- readable hierarchy
- interaction clarity

Accessibility should never be considered optional.

---

# Maintainability

Assume another developer will extend this project months later.

Write code that is easy to:

- understand
- modify
- debug
- extend
- test

Prefer clarity over cleverness.

---

# Scalability

Implement solutions that accommodate future growth.

Avoid solutions that require large rewrites when:

- additional features
- new sections
- expanded functionality
- increased complexity

are introduced later.

---

# Refactoring Policy

Every completed task must include a final optimization review.

Treat your own implementation as if it were written by someone else.

Re-evaluate:

- Can anything be simplified?
- Can duplicate logic be removed?
- Can unnecessary code be eliminated?
- Can naming improve?
- Can structure improve?
- Can readability improve?
- Can maintainability improve?

If the answer is yes, refactor before marking the task complete.

---

# Completion Checklist

Before considering any implementation complete, verify:

- [ ] Functionality is correct.
- [ ] Visual output remains unchanged unless intentionally modified.
- [ ] No unnecessary code has been introduced.
- [ ] No duplicate logic exists.
- [ ] No unnecessary abstractions exist.
- [ ] Naming is clear and consistent.
- [ ] Code is readable.
- [ ] Error handling is appropriate.
- [ ] Security considerations have been reviewed.
- [ ] Accessibility has not regressed.
- [ ] Performance has not regressed.
- [ ] Project conventions have been followed.
- [ ] A complete optimization pass has been performed.

---

# Golden Rules

1. Never optimize at the expense of readability.

2. Never add complexity without measurable value.

3. Never duplicate logic when reuse is practical.

4. Never assume the first solution is the best solution.

5. Every implementation must undergo a second-pass review before completion.

6. Every line of code should have a clear purpose.

7. Code should be written for humans first and machines second.

8. Maintain consistency throughout the entire project.

9. Prioritize long-term maintainability over short-term convenience.

10. The goal is not to write less code. The goal is to write only the code that is necessary.