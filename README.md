# Genetics Practice Engine 2.0

An open educational platform for undergraduate genetics.

## Vision

Genetics Practice Engine 2.0 is designed to become a high-quality, modular, adaptive practice platform for university genetics courses. Instead of relying on a static bank of questions, the engine generates thousands of unique questions organized around learning objectives and reasoning skills.

The long-term goal is to provide students with a place where they can practice genetics concepts repeatedly without encountering the same style of question over and over.

## Educational Philosophy

The engine is built around four principles:

- **Scientific accuracy** – Every question is reviewed for biological correctness.
- **Conceptual diversity** – Students practice many kinds of reasoning, not just numerical variation.
- **Self-contained questions** – Every problem states the assumptions needed to solve it.
- **Meaningful feedback** – Explanations teach the underlying genetics rather than simply revealing the answer.

## Project Structure

```
index.html
css/
js/
data/
topics/
```

Each topic is developed independently and contains:

- Learning objectives
- Reasoning families
- Parameterized question generators

## Planned Topics

- Monohybrid Inheritance
- Gametes & Meiosis
- Testcrosses
- Dihybrid Inheritance
- Linkage & Recombination
- Sex-linked Inheritance
- Pedigrees
- Chi-square Analysis
- Non-Mendelian Inheritance
- Epistasis & Gene Interaction

Future expansions may include:

- Population Genetics
- Hardy–Weinberg Equilibrium
- Molecular Genetics
- PCR
- DNA Sequencing
- CRISPR
- Evolution

## Development Roadmap

Engine 2.0 is being rebuilt in phases.

1. Modular architecture
2. Intelligent scheduler
3. Topic-by-topic reconstruction
4. Adaptive learning
5. Instructor toolkit

## Running Locally

Clone the repository and serve it using any local web server (GitHub Pages, Cloudflare Pages, Live Server, Python HTTP server, etc.). Do not open `index.html` directly using the `file://` protocol because the project uses JavaScript modules.

## License

Educational use encouraged.

---

Developed by **Andrés Posso-Terranova** with assistance from ChatGPT.
