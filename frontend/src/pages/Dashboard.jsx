import { useEffect, useState } from "react";
import api from "../api/client";

const STAT_CONFIG = {
  total_rss_articles: {
    label: "Total RSS Articles",
    meta: "Fetched from feeds",
    icon: "ti-news",
    color: "teal",
  },
  pending_review: {
    label: "Pending Review",
    meta: "Awaiting approval",
    icon: "ti-clock",
    color: "amber",
  },
  rejected: {
    label: "Rejected",
    meta: "Declined content",
    icon: "ti-circle-x",
    color: "red",
  },
  posted: {
    label: "Posted",
    meta: "Live on site",
    icon: "ti-send",
    color: "blue",
  },
  social_posts: {
    label: "Social Posts",
    meta: "Across platforms",
    icon: "ti-brand-instagram",
    color: "orange",
  },
};

export default function Dashboard() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/analytics/summary")
      .then((res) => setData(res.data || {}))
      .catch(() => setData({}))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="dash-loading">
        <i className="ti ti-loader-2" />
        Loading dashboard…
      </div>
    );
  }

  const statKeys = Object.keys(STAT_CONFIG);

  return (
    <>
      {/* Scenic hero banner */}
      <div className="dash-hero">
        <img
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1600&q=80"
          alt="Travel scenery"
          className="dash-hero-img"
        />
        <div className="dash-hero-overlay">
          <p className="dash-hero-eyebrow">Travel Agent · Admin</p>

        <div className="dash-hero-tags">
          <span className="dash-hero-tag">
            <i className="ti ti-map-pin"></i> Amsterdam
          </span>

          <span className="dash-hero-tag">
            <i className="ti ti-map-pin"></i> Paris
          </span>

          <span className="dash-hero-tag">
            <i className="ti ti-map-pin"></i> European Routes
          </span>
        </div>

          <h1 className="dash-hero-title">Content Dashboard</h1>
          <p className="dash-hero-sub">
            Manage your travel content pipeline — from RSS to published posts.
          </p>
        </div>
      </div>

      {/* Stat cards lifted over the hero */}
      {Object.keys(data).length === 0 ? (
        <div className="card" style={{ margin: "24px" }}>
          <p>No dashboard data available.</p>
        </div>
      ) : (
        <>
          <div className="dash-stats">
            {statKeys.map((key) => {
              const cfg = STAT_CONFIG[key];
              const value = data[key] ?? 0;
              return (
                <div
                  key={key}
                  className={`dash-stat-card dash-stat-${cfg.color}`}
                >
                  <div className={`dash-stat-icon dash-stat-icon-${cfg.color}`}>
                    <i className={`ti ${cfg.icon}`} aria-hidden="true" />
                  </div>
                  <div className="dash-stat-label">{cfg.label}</div>
                  <div className="dash-stat-value">{value}</div>
                  <div className="dash-stat-meta">{cfg.meta}</div>
                </div>
              );
            })}
          </div>
          <div className="dashboard-section">
            <div className="dashboard-panel">
              <h3>Recent Activity</h3>

              <div className="activity-item">
                <i className="ti ti-rss"></i>
                <span>12 new RSS articles imported</span>
              </div>

              <div className="activity-item">
                <i className="ti ti-check"></i>
                <span>4 posts approved today</span>
              </div>

              <div className="activity-item">
                <i className="ti ti-brand-instagram"></i>
                <span>3 social posts published</span>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

