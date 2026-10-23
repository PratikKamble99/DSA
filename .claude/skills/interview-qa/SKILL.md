---
name: interview-qa
description: Turn an interview question plus the user's own answer into a polished revision note saved as a .md file under interview-questions/<topic>/. Keeps the user's answer as the core, fixes mistakes, fills gaps, and adds a code example and likely follow-up questions. Use whenever the user gives a question and an answer (e.g. "Q: what is a Promise? A: ...", "here's my answer to ...", "write up this interview question"), asks to save or document an interview answer, or runs /interview-qa.
---

# Interview Q&A

The user is preparing for interviews. They give you a question and their own answer. Turn it into a note they can revise from and say out loud in an interview.

## Input

- The question and the user's answer, in any format (`Q:`/`A:`, two paragraphs, a pasted chat). If one of the two is missing, ask for it. Don't invent the user's answer: the point is to build on what they know.
- Several Q&A pairs at once: make one file per question.

## Steps

1. Read the user's answer carefully. Note what's correct, what's wrong, and what an interviewer would expect that is missing.
2. Pick the topic folder from the subject: `javascript`, `react`, `node`, `typescript`, `css`, `html`, `dsa`, `system-design`, `sql`, and so on. Reuse an existing folder under `interview-questions/` if one fits.
3. Pick a short file name from the main concept, Title-Case with hyphens: `Promise.md`, `Event-Loop.md`, `Closures.md`, `Debounce-vs-Throttle.md`.
4. If the file already exists, read it. If it covers the same question, update it in place; if it's a different question on the same concept, add a new `---`-separated section to the file instead of overwriting.
5. Write the note in the format below.
6. Reply in chat with the file path and a short list: what you fixed in their answer and what you added. This is how the user learns where their answer was weak, so be specific ("you said Promises are synchronous; they're not, the executor runs sync but `.then` callbacks run as microtasks").

## Output format

```markdown
# <Concept Name>

## Question
<The question, cleaned up but same meaning.>

## Short Answer
2 to 4 sentences the user could say first in an interview. Built from their answer, in plain words.

## Detailed Explanation
The user's answer, polished and completed. Keep their structure and points where they were right; fix what was wrong; add what was missing. Use bullets or short paragraphs. Explain any jargon in one line.

## Example
A small, runnable code example (or a concrete scenario for non-code topics) with the output shown in comments.

## Common Follow-up Questions
- **<follow-up question>**: 1 to 3 line answer.
(3 to 5 follow-ups an interviewer is likely to ask next.)

## Key Points to Remember
- 3 to 5 one-line bullets for quick revision.
```

Add sections only when they help, for example a comparison table for "X vs Y" questions, or a small diagram-in-text for flows like the event loop. Skip `## Example` only if a code example truly makes no sense.

## Rules

- The user's answer is the base. Polish it; don't throw it away. If it was fully correct, say so in the reply.
- Be accurate. Where you correct the user, add a `> Note:` line in Detailed Explanation saying what the common misconception is, so they remember it.
- Simple words, short sentences. It should sound like a confident candidate, not a textbook.
- Code examples: short, correct, and with the actual output. Match the language of the topic (JavaScript for JS questions, etc.).
