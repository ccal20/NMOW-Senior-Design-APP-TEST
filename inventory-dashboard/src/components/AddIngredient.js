import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddIngredient = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    ingredient_name: "",
    num_containers: "",
    units_per_container: "",
    unit: "Servings",
    expiration_date: "",
    storage_location: "",
    item_category: "",
    storage_type: "",
    container_type: "",
    brand: "",
    tefap: false,
  });

  const itemCategories = [
    "Vegetable",
    "Starch",
    "Fruit",
    "Canned Entree",
    "Sauce",
    "Misc",
    "Dessert",
    "Beans",
    "Snack",
    "Protein Entree",
    "Starch and Protein Entree",
  ];

  const storageTypes = ["Dry", "Fridge", "Freezer"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...formData,
        barcode: Date.now().toString(), // auto-generate barcode
        num_containers: parseInt(formData.num_containers, 10),
        units_per_container: parseFloat(formData.units_per_container),
        expiration_date: formData.expiration_date || null, // allow empty
      };

      await axios.post("http://127.0.0.1:8000/add", dataToSend);
      alert("Ingredient added successfully!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(`Error adding ingredient: ${error.response?.data?.detail || error.message}`);
    }
  };

  return (
    <div className="form-container bg-white shadow-md rounded-md p-6">
      <h2 className="text-xl font-bold mb-4">Add New Ingredient</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

        <input name="ingredient_name" placeholder="Ingredient Name" value={formData.ingredient_name} onChange={handleChange} required className="border p-2" />
        <input name="num_containers" type="number" placeholder="Quantity" value={formData.num_containers} onChange={handleChange} required className="border p-2" />
        <input name="units_per_container" type="number" placeholder="Units per Container" value={formData.units_per_container} onChange={handleChange} required className="border p-2" />
        <input name="unit" placeholder="Unit" value={formData.unit} onChange={handleChange} required className="border p-2" />
        <input name="expiration_date" type="date" placeholder="Expiration Date" value={formData.expiration_date} onChange={handleChange} className="border p-2" />
        <input name="storage_location" placeholder="Storage Location" value={formData.storage_location} onChange={handleChange} className="border p-2" />

        <select name="item_category" value={formData.item_category} onChange={handleChange} className="border p-2 col-span-2" required>
          <option value="">Select Item Category</option>
          {itemCategories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select name="storage_type" value={formData.storage_type} onChange={handleChange} className="border p-2 col-span-2" required>
          <option value="">Select Storage Type</option>
          {storageTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <input name="container_type" placeholder="Container Type" value={formData.container_type} onChange={handleChange} className="border p-2" />
        <input name="brand" placeholder="Brand" value={formData.brand} onChange={handleChange} className="border p-2" />

        <label className="flex items-center col-span-2">
          <input name="tefap" type="checkbox" checked={formData.tefap} onChange={handleChange} className="mr-2" />
          TEFAP
        </label>

        <div className="col-span-2 flex gap-4 mt-4">
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
          <button type="button" onClick={() => navigate("/")} className="bg-gray-300 text-black px-4 py-2 rounded">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddIngredient;
