---
name: explain-code
description: Read a code file (or every file in a folder) and write a beginner-friendly .md next to it that explains what the code does, the approach and intuition, a step-by-step dry run, and its time and space complexity. Use when the user says "explain this code", "document this solution", "write notes for this file", or runs /explain-code <path>.
---

# Explain Code

Turn a code file into a short, simple Markdown explanation that someone new to DSA can follow.

## Input

- `$ARGUMENTS` is a file path or a folder path.
- No argument: use the file open or selected in the IDE. If there is none, ask which file.
- A folder: handle each code file in it (skip `.md` files and files that already have an up-to-date `.md`).

## Steps

1. Read the whole file. Understand what problem it solves before writing anything.
2. If the file holds several functions or approaches (for example brute force and optimal), explain each one.
3. Work out time and space complexity from the actual loops, recursion, and data structures in the code, not from the problem name.
4. Write `<same-name>.md` in the same folder as the source file. For `arrays/two-sum.js`, write `arrays/two-sum.md`. If the file exists, overwrite it.
5. Reply with one line: the path of the `.md` file you wrote.

## Output format

```markdown
# <Problem / Topic Name>

## Problem
One or two sentences in plain words. Include a small example input and output.

## Idea (Intuition)
Explain the core trick the way you would explain it to a friend. No jargon without a one-line meaning.

## Approach
Numbered steps that match the code's logic.

## Dry Run
Walk through the small example step by step. Use a table when there is a loop or changing variables.

## Code Walkthrough
Short explanation of the key lines or blocks (quote only small snippets, not the whole file).

## Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(...) | one-line reason tied to the code (e.g. "one loop over n items, map lookups are O(1)") |
| Space | O(...) | one-line reason (e.g. "hash map stores up to n keys") |

## Edge Cases
Bullets: empty input, one element, duplicates, negatives, and so on, only the ones that matter here.

## Key Takeaway
One line: the pattern to remember (e.g. "use a hash map to trade space for time").
```

If there are several approaches, repeat Idea, Approach, and Complexity for each under `## Approach 1: <name>`, `## Approach 2: <name>`, and end with a small table comparing them.

## Rules

- Simple words, short sentences. Explain like the reader is learning the topic for the first time.
- Be accurate. If the code has a bug or a wrong complexity claim in its comments, say so in a `> Note:` line.
- Don't paste the whole source file into the `.md`.
- Don't change the source code.
