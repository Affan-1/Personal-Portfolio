import { useState, useEffect, useCallback } from 'react';

const CACHE_KEY = 'github_stats_cache';
const CACHE_TTL = 1000 * 60 * 30; // 30 minutes

function getCached() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { data, timestamp } = JSON.parse(raw);
    if (Date.now() - timestamp < CACHE_TTL) return data;
    localStorage.removeItem(CACHE_KEY);
    return null;
  } catch {
    return null;
  }
}

function setCache(data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
  } catch {}
}

export default function useGitHubStats(username) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);

    const cached = getCached();
    if (cached) {
      setData(cached);
      setLoading(false);
      return;
    }

    try {
      const [profileRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${username}`),
        fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`),
      ]);

      if (!profileRes.ok) throw new Error(`GitHub API error: ${profileRes.status}`);
      if (!reposRes.ok) throw new Error(`GitHub API error: ${reposRes.status}`);

      const profile = await profileRes.json();
      const repos = await reposRes.json();

      // Compute total stars
      const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);

      // Language breakdown
      const langMap = {};
      repos.forEach(r => {
        if (r.language) {
          langMap[r.language] = (langMap[r.language] || 0) + 1;
        }
      });
      const totalLangRepos = Object.values(langMap).reduce((a, b) => a + b, 0);
      const languages = Object.entries(langMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6)
        .map(([lang, count]) => ({
          lang,
          count,
          pct: Math.round((count / totalLangRepos) * 100),
        }));

      // Featured repos (most stars, non-fork)
      const featured = repos
        .filter(r => !r.fork && r.description)
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 4);

      const stats = {
        publicRepos: profile.public_repos,
        followers: profile.followers,
        totalStars,
        languages,
        featured,
        avatarUrl: profile.avatar_url,
        htmlUrl: profile.html_url,
      };

      setCache(stats);
      setData(stats);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => { fetchStats(); }, [fetchStats]);

  return { data, loading, error, retry: fetchStats };
}
