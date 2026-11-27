"use client";

import React, { useState, useEffect } from "react";
import { Layers, Plus, Trash2, Edit, Save, X, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  type: string;
  description?: string | null;
  imageUrl?: string | null;
  displayOrder: number;
  isActive: boolean;
  _count?: {
    products: number;
  };
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // New category form
  const [newName, setNewName] = useState("");
  const [newType, setNewType] = useState<"BIKE" | "SPARE_PART" | "ACCESSORY" | "SERVICE">("BIKE");
  const [newDescription, setNewDescription] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80");
  const [newOrder, setNewOrder] = useState("0");

  // Edit category form
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editImg, setEditImg] = useState("");
  const [editOrder, setEditOrder] = useState("0");
  const [editActive, setEditActive] = useState(true);

  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/admin/categories");
      const data = await res.json();
      if (data.categories) setCategories(data.categories);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newName,
          type: newType,
          description: newDescription,
          imageUrl: newImageUrl,
          displayOrder: parseInt(newOrder) || 0,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create category");

      setMessage(`Category "${newName}" created successfully.`);
      setNewName("");
      setNewDescription("");
      setCreating(false);
      fetchCategories();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error creating category");
    }
  };

  const startEdit = (cat: CategoryItem) => {
    setEditingId(cat.id);
    setEditName(cat.name);
    setEditDesc(cat.description || "");
    setEditImg(cat.imageUrl || "");
    setEditOrder(String(cat.displayOrder));
    setEditActive(cat.isActive);
  };

  const handleSaveEdit = async (id: string) => {
    setError(null);
    setMessage(null);

    try {
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editName,
          description: editDesc,
          imageUrl: editImg,
          displayOrder: parseInt(editOrder) || 0,
          isActive: editActive,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update category");

      setMessage(`Category "${editName}" updated.`);
      setEditingId(null);
      fetchCategories();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error updating category");
    }
  };

  const handleDelete = async (cat: CategoryItem) => {
    if (!confirm(`Are you sure you want to delete category "${cat.name}"?`)) return;
    setError(null);
    setMessage(null);

    try {
      const res = await fetch(`/api/admin/categories/${cat.id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete category");

      setMessage(data.message || "Category deleted successfully.");
      fetchCategories();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error deleting category");
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-mono text-blaze-500 font-bold uppercase tracking-wider">
            Taxonomy & Hierarchy
          </span>
          <h1 className="text-2xl font-display font-bold text-white mt-0.5">
            Category Management
          </h1>
          <p className="text-xs text-charcoal-400 mt-1">
            Organize mountain bikes, spare parts, and accessories into responsive catalog sections.
          </p>
        </div>
        <button
          onClick={() => setCreating(!creating)}
          className="px-4 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-700 text-white font-bold text-xs uppercase tracking-wide flex items-center gap-1.5 transition-all shadow-glow-forest"
        >
          <Plus className="w-4 h-4" />
          <span>{creating ? "Cancel New Category" : "Add New Category"}</span>
        </button>
      </div>

      {message && (
        <div className="p-3.5 rounded-xl bg-forest-950/80 border border-forest-600/60 text-forest-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-forest-400 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {error && (
        <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-800/80 text-red-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* New Category Form Drawer */}
      {creating && (
        <div className="bg-charcoal-900 border border-charcoal-750 rounded-2xl p-6 shadow-card space-y-4 animate-fadeIn">
          <h3 className="text-sm font-display font-bold text-white border-b border-charcoal-800 pb-2">
            Create New Product Category
          </h3>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-charcoal-300 mb-1">
                  Category Name <span className="text-blaze-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Mullet Enduro Bikes"
                  className="w-full px-3 py-2 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white text-xs focus:outline-none focus:border-forest-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-charcoal-300 mb-1">
                  Section Type <span className="text-blaze-500">*</span>
                </label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white text-xs focus:outline-none focus:border-forest-500"
                >
                  <option value="BIKE">Complete Mountain Bikes</option>
                  <option value="SPARE_PART">Spare Parts & Components</option>
                  <option value="ACCESSORY">Accessories & Riding Gear</option>
                  <option value="SERVICE">Workshop Services</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-charcoal-300 mb-1">
                  Display Order
                </label>
                <input
                  type="number"
                  value={newOrder}
                  onChange={(e) => setNewOrder(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white text-xs font-mono focus:outline-none focus:border-forest-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-charcoal-300 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Short tagline for category cards"
                  className="w-full px-3 py-2 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white text-xs focus:outline-none focus:border-forest-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-charcoal-300 mb-1">
                  Header Image URL
                </label>
                <input
                  type="url"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-charcoal-800 border border-charcoal-700 text-white text-xs focus:outline-none focus:border-forest-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setCreating(false)}
                className="px-4 py-2 rounded-xl bg-charcoal-800 text-charcoal-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-blaze-600 hover:bg-blaze-500 text-white font-bold text-xs uppercase tracking-wide shadow-glow"
              >
                Save Category
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Categories Table */}
      <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl overflow-hidden shadow-card">
        {loading ? (
          <div className="p-12 text-center text-charcoal-400 flex items-center justify-center gap-2 text-xs">
            <Loader2 className="w-4 h-4 animate-spin text-forest-400" />
            <span>Loading categories...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-charcoal-800 bg-charcoal-950/60 text-[11px] font-mono uppercase text-charcoal-400">
                  <th className="py-3 px-4">Name / Slug</th>
                  <th className="py-3 px-4">Section Type</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4">Assigned Products</th>
                  <th className="py-3 px-4">Order</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-800/60 text-xs">
                {categories.map((cat) => {
                  const isEditing = editingId === cat.id;
                  const productCount = cat._count?.products ?? 0;

                  if (isEditing) {
                    return (
                      <tr key={cat.id} className="bg-charcoal-800/60">
                        <td className="py-3 px-4">
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="w-full px-2 py-1 rounded bg-charcoal-700 text-white text-xs border border-charcoal-600"
                          />
                        </td>
                        <td className="py-3 px-4 font-mono text-[11px] text-charcoal-400">
                          {cat.type}
                        </td>
                        <td className="py-3 px-4">
                          <input
                            type="text"
                            value={editDesc}
                            onChange={(e) => setEditDesc(e.target.value)}
                            className="w-full px-2 py-1 rounded bg-charcoal-700 text-white text-xs border border-charcoal-600"
                          />
                        </td>
                        <td className="py-3 px-4 font-mono">{productCount}</td>
                        <td className="py-3 px-4">
                          <input
                            type="number"
                            value={editOrder}
                            onChange={(e) => setEditOrder(e.target.value)}
                            className="w-16 px-2 py-1 rounded bg-charcoal-700 text-white text-xs font-mono border border-charcoal-600"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={editActive}
                              onChange={(e) => setEditActive(e.target.checked)}
                              className="rounded bg-charcoal-700 text-forest-500"
                            />
                            <span>Active</span>
                          </label>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleSaveEdit(cat.id)}
                              className="p-1.5 rounded bg-forest-800 hover:bg-forest-700 text-white"
                              title="Save"
                            >
                              <Save className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="p-1.5 rounded bg-charcoal-700 text-charcoal-300 hover:text-white"
                              title="Cancel"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  }

                  return (
                    <tr key={cat.id} className="hover:bg-charcoal-850/60 transition-colors">
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-white block">{cat.name}</span>
                        <span className="font-mono text-[11px] text-charcoal-400">/{cat.slug}</span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[11px] text-charcoal-300">
                        {cat.type}
                      </td>
                      <td className="py-3.5 px-4 text-charcoal-400 max-w-xs truncate">
                        {cat.description || "-"}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-mono px-2 py-0.5 rounded bg-charcoal-800 text-forest-300 text-xs">
                          {productCount} items
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-charcoal-400">
                        #{cat.displayOrder}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                            cat.isActive
                              ? "bg-forest-950 text-forest-300 border-forest-800"
                              : "bg-charcoal-800 text-charcoal-500 border-charcoal-700"
                          }`}
                        >
                          {cat.isActive ? "Active" : "Disabled"}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => startEdit(cat)}
                            className="p-1.5 rounded bg-charcoal-800 hover:bg-charcoal-750 text-charcoal-300 hover:text-white transition-colors"
                            title="Edit Category"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(cat)}
                            className="p-1.5 rounded bg-charcoal-800 hover:bg-red-950 text-charcoal-400 hover:text-red-300 transition-colors"
                            title="Delete Category"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
