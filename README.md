# MyCommunity

Welcome to MyCommunity, a platform where individuals from all walks of life come together to support, uplift, and connect with one another. Our mission is to foster a sense of belonging, promote meaningful relationships, and celebrate the power of community.

Join us in creating a supportive and inclusive space where everyone can thrive, share, and grow together.

## Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Git

### Commit naming

Should use [Conventional Commits](https://www.conventionalcommits.org/en/) format. It provides guidelines to create a better commit history log, making easier to have automated tasks around it (e.g. automated changelogs).

Include type: feat, fix, chore, docs, build, cl, docs, refactor, style
Format: `<type>[optional scope]: <description>`
Example: `git commit -m "feat(reports): add reports to the home page`

**feat:** For new functionality

**fix** For a fix to existing functionality

**chore:** For a change that does not create new functionality but is needed

**build:** Changes that affect the build system or external dependencies

**ci:** Changes to CI configuration files and scripts

**docs:** Documentation only changes

**refactor:** A code change that contains refactor

**style:** Changes that do not affect the meaning of the code

### Branch naming

Include type: feature, refactor, bugfix, hotfix, release
Include corresponding ticket id if necessary
Format: `{type}/{2-3 word summary}/{ticket id}_`
Example: `git checkout -b feature/reports/MC-244`

### Tag naming

https://semver.org/

## Design

## UI/UX

Mobile first approach
Main layout using grid

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
