# RSM Blockchain Badges Platform

## Overview

The RSM Blockchain Badges Platform is a cutting-edge web application designed to incentivize and recognize professional development within the blockchain space. This platform leverages blockchain technology to issue, manage, and display digital badges that represent skills, achievements, and contributions in the field.

## Key Features

- **Blockchain-Based Badge Issuance**: Securely mint and distribute badges as non-fungible tokens (NFTs).
- **User Authentication**: Seamless wallet connection for secure user identification and badge ownership.
- **Badge Showcase**: Dynamic display of earned and collected badges with detailed information.
- **Leaderboard**: Real-time ranking system to foster healthy competition and engagement.
- **Challenge System**: Ongoing tasks and objectives to encourage continuous learning and participation.
- **Responsive Design**: Fully responsive interface ensuring a consistent experience across all devices.

## Technology Stack

- **Frontend**: React.js with Next.js for server-side rendering and optimal performance
- **Styling**: Tailwind CSS for utility-first styling and dark mode support
- **Blockchain Integration**: Thirdweb SDK for seamless Web3 functionality
- **State Management**: React Hooks and Context API for efficient state handling
- **Build Tool**: Vite for lightning-fast builds and hot module replacement

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- Git

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-org/rsm-blockchain-badges.git
   cd rsm-blockchain-badges
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   ```
   cp .env.example .env.local
   ```
   Edit `.env.local` with your specific configuration.

4. Start the development server:
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Development Workflow

- **Code Style**: We adhere to the Airbnb JavaScript Style Guide. ESLint and Prettier are configured for code consistency.
- **Branching Strategy**: We follow the Git Flow workflow. Create feature branches from `develop` and submit pull requests for review.
- **Testing**: Write unit tests for new features using Jest and React Testing Library. Ensure all tests pass before submitting PRs.
- **Documentation**: Update this README and inline code comments as necessary when adding new features or making significant changes.

## Deployment

Our CI/CD pipeline automatically deploys the `main` branch to our staging environment. Production deployments are manually triggered after QA approval.

For manual deployments:

1. Build the project:
   ```
   npm run build
   ```

2. Deploy the `dist` folder to your preferred hosting service (e.g., Netlify, Vercel, AWS S3).

## Contributing

We welcome contributions! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- RSM for their vision and support in promoting blockchain education
- The open-source community for the invaluable tools and libraries that make this project possible

## Contact

For any inquiries or support, please contact the development team at blockchain-badges@rsm.com.

## TODO

### High Priority
- [ ] Fix earned vs collected badge logic
  - [ ] Consider removing collection aspect (currently aesthetic only)
- [ ] Implement proper visualization for earned badges to appear permanent
- [ ] Implement leaderboard logic
- [ ] Connect recent badge awards to actual data source

### Medium Priority
- [ ] Add Alchemy badge for both day and night mode
  - Reference: [Alchemy Verified Badge](https://docs.alchemy.com/docs/alchemy-verified-badge)
- [ ] Improve mobile responsiveness
- [ ] Design and create badge contracts on Base mainnet
  - [ ] Brainstorm and finalize badge concepts
  - [ ] Design badge visuals
  - [ ] Develop and deploy smart contracts

### Low Priority
- [ ] Switch codebase to Base Mainnet
- [ ] Implement caching to optimize Alchemy compute units usage when fetching badges

### Ongoing
- [ ] Refactor and optimize code as needed
- [ ] Update documentation to reflect new changes and features