
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Chatbot from "../components/Chatbot";
import "./EditProfile.css";

function EditProfile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    phone: "",
    gender: "",
    age: "",
    bloodGroup: "",
    city: "",
    emergencyContact: "",
  });

  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  // PREFILL DATA
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      navigate("/login");
      return;
    }

    setFormData({
      phone: storedUser.phone || "",
      gender: storedUser.gender || "",
      age: storedUser.age || "",
      bloodGroup: storedUser.bloodGroup || "",
      city: storedUser.city || "",
      emergencyContact: storedUser.emergencyContact || "",
    });

    setPreview(storedUser.photo || "");
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      if (photo) {
        data.append("photo", photo);
      }

      const res = await fetch("http://localhost:5000/api/users/update", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message);
        return;
      }

      // save latest user
      localStorage.setItem("user", JSON.stringify(result.user));

      alert("Profile updated successfully");

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="edit-profile-container">
        <div className="edit-profile-card">
          <h2>
            Edit <span>Profile</span>
          </h2>

          <form className="edit-profile-form" onSubmit={handleSubmit}>
            <div className="profile-photo-upload">
              <img
                src={preview || require("../assets/user.png")}
                alt="Profile"
              />
              <label>
                Change Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhoto}
                  hidden
                />
              </label>
            </div>

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
            />

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
            />

            <input
              type="text"
              name="bloodGroup"
              placeholder="Blood Group"
              value={formData.bloodGroup}
              onChange={handleChange}
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
            />

            <input
              type="text"
              name="emergencyContact"
              placeholder="Emergency Contact"
              value={formData.emergencyContact}
              onChange={handleChange}
            />

            <button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Update Profile"}
            </button>
          </form>
        </div>
      </div>

      <Chatbot />
    </>
  );
}

export default EditProfile;
