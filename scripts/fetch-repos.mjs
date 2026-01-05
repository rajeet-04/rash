/**
 * Fetch GitHub repositories and score them for portfolio display
 * Run with: node scripts/fetch-repos.mjs
 * 
 * Strategy: Pick top repos from each category for wider tech representation
 */

import { writeFileSync, readFileSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = join(__dirname, '..', 'public', 'repos.json');
const ENV_PATH = join(__dirname, '..', '.env.local');

// Try to load GH_PAT or GH_TOKEN from .env.local if not in environment
if (existsSync(ENV_PATH)) {
    const envContent = readFileSync(ENV_PATH, 'utf8');
    const lines = envContent.split('\n');
    lines.forEach(line => {
        const [key, ...valueParts] = line.split('=');
        if (key && valueParts.length > 0) {
            const value = valueParts.join('=').trim().replace(/^["']|["']$/g, '');
            if (!process.env[key.trim()]) {
                process.env[key.trim()] = value;
            }
        }
    });
}

const GH_TOKEN = process.env.GH_TOKEN || process.env.GH_PAT;
const GH_USERNAME = process.env.GH_USERNAME || 'rajeet-04';

// How many repos to pick from each category (for diversity)
const REPOS_PER_CATEGORY = 2;

// Category mapping based on language and topics
const CATEGORY_MAP = {
    'Kotlin': 'mobile',
    'Swift': 'mobile',
    'Java': 'mobile',
    'Python': 'ai',
    'Jupyter Notebook': 'ai',
    'TypeScript': 'web',
    'JavaScript': 'web',
    'HTML': 'web',
    'CSS': 'web',
    'C++': 'systems',
    'C': 'systems',
    'Rust': 'systems',
    'Go': 'backend',
};

// Category display order (priority)
const CATEGORY_ORDER = ['web', 'mobile', 'ai', 'fullstack', 'backend', 'systems', 'utility', 'research'];

// Pinned repos that should always appear (if they exist)
const PINNED_REPOS = [];

// Repos to exclude (forks, tests, etc.)
const EXCLUDED_REPOS = ['rajeet-04', '.github'];

async function fetchWithAuth(url) {
    const headers = {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Portfolio-Repo-Fetcher',
    };

    if (GH_TOKEN) {
        headers['Authorization'] = `Bearer ${GH_TOKEN}`;
    }

    const response = await fetch(url, { headers });

    if (!response.ok) {
        if (response.status === 403 && response.headers.get('x-ratelimit-remaining') === '0') {
            const resetTime = new Date(response.headers.get('x-ratelimit-reset') * 1000).toLocaleTimeString();
            throw new Error(`GitHub API rate limit exceeded. It will reset at ${resetTime}. Please provide a GH_PAT in .env.local for higher limits.`);
        }
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

async function getRepos() {
    // Fetch all repos (paginated)
    let allRepos = [];
    let page = 1;

    while (true) {
        const repos = await fetchWithAuth(
            `https://api.github.com/users/${GH_USERNAME}/repos?per_page=100&page=${page}&type=all`
        );

        if (repos.length === 0) break;
        allRepos = allRepos.concat(repos);
        page++;
    }

    console.log(`Found ${allRepos.length} repositories`);
    return allRepos;
}

async function getCommitCount(repo) {
    try {
        const contributors = await fetchWithAuth(
            `https://api.github.com/repos/${GH_USERNAME}/${repo.name}/contributors?per_page=1`
        );

        let totalCommits = 0;
        if (Array.isArray(contributors)) {
            totalCommits = contributors.reduce((sum, c) => sum + (c.contributions || 0), 0);
        }

        return totalCommits;
    } catch (error) {
        console.warn(`Could not fetch commits for ${repo.name}: ${error.message}`);
        return 0;
    }
}

function calculateRecencyBonus(lastUpdated) {
    const now = new Date();
    const updated = new Date(lastUpdated);
    const daysSinceUpdate = Math.floor((now - updated) / (1000 * 60 * 60 * 24));

    if (daysSinceUpdate < 30) return 10;
    if (daysSinceUpdate < 90) return 5;
    if (daysSinceUpdate < 180) return 0;
    if (daysSinceUpdate < 365) return -10;
    return -30;
}

function calculateScore(repo, commitCount) {
    const stars = repo.stargazers_count || 0;
    const forks = repo.forks_count || 0;
    const recencyBonus = calculateRecencyBonus(repo.pushed_at);
    const ownershipBonus = !repo.fork ? 7 : 0;

    // Score formula: stars(3x) + forks(2x) + commits(0.1x) + recency + ownership
    const score = (stars * 3) + (forks * 2) + (commitCount * 0.1) + recencyBonus + ownershipBonus;

    return score;
}

function shouldExclude(repo, commitCount) {
    // Exclude by name
    if (EXCLUDED_REPOS.includes(repo.name)) {
        return true;
    }

    // Exclude forks (unless they have significant modifications)
    if (repo.fork && commitCount < 10) {
        return true;
    }

    // Exclude repos with very few commits (abandoned/tests)
    if (commitCount < 3) {
        return true;
    }

    // Exclude old repos with low activity
    const daysSinceUpdate = Math.floor(
        (new Date() - new Date(repo.pushed_at)) / (1000 * 60 * 60 * 24)
    );

    if (daysSinceUpdate > 365 && commitCount < 10) {
        return true;
    }

    return false;
}

function inferCategory(repo) {
    // Check topics first
    const topics = repo.topics || [];
    if (topics.includes('android') || topics.includes('mobile') || topics.includes('ios')) {
        return 'mobile';
    }
    if (topics.includes('ai') || topics.includes('machine-learning') || topics.includes('ml') || topics.includes('deep-learning')) {
        return 'ai';
    }
    if (topics.includes('fullstack') || topics.includes('full-stack')) {
        return 'fullstack';
    }
    if (topics.includes('research') || topics.includes('analysis') || topics.includes('paper')) {
        return 'research';
    }
    if (topics.includes('utility') || topics.includes('tool') || topics.includes('cli')) {
        return 'utility';
    }
    if (topics.includes('backend') || topics.includes('api') || topics.includes('server')) {
        return 'backend';
    }

    // Fall back to language
    return CATEGORY_MAP[repo.language] || 'web';
}

function inferTechnologies(repo) {
    const techs = [];

    if (repo.language) {
        techs.push(repo.language);
    }

    // Add from topics
    const techTopics = (repo.topics || []).filter(t =>
        ['react', 'nextjs', 'flask', 'django', 'nodejs', 'typescript', 'tailwindcss',
            'firebase', 'supabase', 'postgresql', 'mongodb', 'redis', 'docker',
            'kotlin', 'android', 'ios', 'swift', 'flutter', 'python', 'tensorflow',
            'pytorch', 'vercel', 'aws', 'gcp', 'azure'].includes(t.toLowerCase())
    );

    techs.push(...techTopics.map(t => t.charAt(0).toUpperCase() + t.slice(1)));

    return [...new Set(techs)].slice(0, 6);
}

async function main() {
    try {
        const repos = await getRepos();

        // Process repos with commit counts
        const processedRepos = [];

        for (const repo of repos) {
            const commitCount = await getCommitCount(repo);

            if (shouldExclude(repo, commitCount)) {
                continue;
            }

            const score = calculateScore(repo, commitCount);
            const isPinned = PINNED_REPOS.includes(repo.name);

            processedRepos.push({
                id: repo.name,
                title: repo.name.replace(/-/g, ' ').replace(/_/g, ' ')
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' '),
                description: repo.description || `A ${repo.language || 'code'} project.`,
                category: inferCategory(repo),
                technologies: inferTechnologies(repo),
                liveUrl: repo.homepage || repo.html_url,
                codeUrl: repo.html_url,
                stars: repo.stargazers_count || 0,
                forks: repo.forks_count || 0,
                language: repo.language,
                lastUpdated: repo.pushed_at,
                isPublic: !repo.private,
                featured: isPinned,
                status: repo.archived ? 'Archived' : 'Active',
                _score: score,
                _commits: commitCount,
                _pinned: isPinned,
            });
        }

        // Sort by score within each category, then pick top N from each
        const reposByCategory = {};

        for (const repo of processedRepos) {
            if (!reposByCategory[repo.category]) {
                reposByCategory[repo.category] = [];
            }
            reposByCategory[repo.category].push(repo);
        }

        // Sort each category by score
        for (const category in reposByCategory) {
            reposByCategory[category].sort((a, b) => {
                if (a._pinned && !b._pinned) return -1;
                if (!a._pinned && b._pinned) return 1;
                return b._score - a._score;
            });
        }

        // Pick top repos from each category for diversity
        const selectedRepos = [];
        const seenIds = new Set();

        // First pass: pick REPOS_PER_CATEGORY from each category in order
        for (const category of CATEGORY_ORDER) {
            const categoryRepos = reposByCategory[category] || [];
            let count = 0;

            for (const repo of categoryRepos) {
                if (count >= REPOS_PER_CATEGORY) break;
                if (seenIds.has(repo.id)) continue;

                selectedRepos.push(repo);
                seenIds.add(repo.id);
                count++;
            }
        }

        // Second pass: add any remaining high-scoring repos not yet included
        const allSorted = [...processedRepos].sort((a, b) => b._score - a._score);
        for (const repo of allSorted) {
            if (seenIds.has(repo.id)) continue;
            selectedRepos.push(repo);
            seenIds.add(repo.id);
        }

        // Final sort by score for display
        selectedRepos.sort((a, b) => {
            if (a._pinned && !b._pinned) return -1;
            if (!a._pinned && b._pinned) return 1;
            return b._score - a._score;
        });

        // Clean up internal fields before saving
        const cleanRepos = selectedRepos.map(({ _score, _commits, _pinned, ...repo }) => repo);

        console.log('\nSelected repositories:');
        selectedRepos.forEach((repo, i) => {
            console.log(`${i + 1}. [${repo.category}] ${repo.title} (score: ${repo._score.toFixed(1)}, commits: ${repo._commits})`);
        });

        console.log('\nCategory breakdown:');
        const categoryCounts = {};
        for (const repo of selectedRepos) {
            categoryCounts[repo.category] = (categoryCounts[repo.category] || 0) + 1;
        }
        for (const [cat, count] of Object.entries(categoryCounts)) {
            console.log(`  ${cat}: ${count}`);
        }

        // Write to file
        writeFileSync(OUTPUT_PATH, JSON.stringify(cleanRepos, null, 2));
        console.log(`\nWrote ${cleanRepos.length} repos to ${OUTPUT_PATH}`);

    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

main();
