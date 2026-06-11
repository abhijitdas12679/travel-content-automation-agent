import { useEffect, useState } from "react";
import api from "../api/client";

export default function BrandSettings() {
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadBrand = async () => {
    try {
      const res = await api.get("/brand/");
      setForm(res.data || {});
    } catch (error) {
      console.error("Failed to load brand settings:", error);
      setForm({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBrand();
  }, []);

  const update = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const save = async () => {
    try {
      await api.put("/brand/", form);
      alert("Brand settings saved successfully");
    } catch (error) {
      console.error("Failed to save brand settings:", error);
      alert("Failed to save brand settings");
    }
  };

  if (loading) {
    return <p>Loading brand settings...</p>;
  }

  const fields = [
    "brand_name",
    "font_style",
    "primary_color",
    "secondary_color",
    "tone_of_voice",
    "cta_format",
    "social_style",
  ];

  return (
    <>
      <div className="dash-hero">
        <img
          className="dash-hero-img"
          src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1600&q=80"
          alt="Paris street scenery"
        />

        <div className="dash-hero-overlay">
          <p className="dash-hero-eyebrow">Travel Agent · Admin</p>

          <div className="dash-hero-tags">
            <span className="dash-hero-tag">
              <i className="ti ti-palette"></i>
              Brand Identity
            </span>

            <span className="dash-hero-tag">
              <i className="ti ti-wand"></i>
              Content Style
            </span>
          </div>

          <h1 className="dash-hero-title">Brand Settings</h1>

          <p className="dash-hero-sub">
            Define how your travel content looks, sounds, and feels across every
            channel.
          </p>
        </div>
      </div>

      <div className="brand-form-wrap">
        <div className="brand-form-card">
          <div className="brand-form-header">
            <i className="ti ti-adjustments-horizontal"></i>
            <span>Brand Configuration</span>
          </div>

          <div className="brand-formgrid">
            {fields.map((field) => (
              <div className="brand-field" key={field}>
              <div className="brand-label">
                {field.replaceAll("_", " ")}
              </div>

            {field === "primary_color" || field === "secondary_color" ? (
              <div className="brand-color-row">
                <input
                  type="color"
                  name={field}
                  value={form?.[field] || "#000000"}
                  onChange={update}
                  className="brand-color-swatch"
                />

                <span className="brand-color-hex">
                  {form?.[field] || "#000000"}
                </span>
              </div>
            ) : (
              <input
                className="brand-text-input"
                name={field}
                value={form?.[field] || ""}
                onChange={update}
                type="text"
              />
            )}
            </div>
          ))}
        </div>

        <div className="brand-form-footer">
          <button className="brand-save-btn" onClick={save}>
            <i className="ti ti-device-floppy"></i>
            Save Brand Settings
          </button>
        </div>
       </div>
      </div> 
    </>
  );
}