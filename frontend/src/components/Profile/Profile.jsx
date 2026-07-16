import React, {
  useContext,
  useState,
} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import { FaUserCircle } from "react-icons/fa";

const Profile = () => {

  const { user } =
    useContext(Context);

  const [name, setName] =
    useState(user?.name || "");

  const [email, setEmail] =
    useState(user?.email || "");

  const [phone, setPhone] =
    useState(user?.phone || "");
    const [avatar, setAvatar] = useState("");
const [avatarPreview, setAvatarPreview] = useState("");

  const updateProfile =
    async (e) => {

      e.preventDefault();

      try {

        const { data } =
          await axios.put(
            "https://hirehub-job-portal-6ed0.onrender.com/api/v1/user/update-profile",
            {
              name,
              email,
              phone,
            },
            {
              withCredentials: true,
            }
          );

        toast.success(
          data.message
        );

      } catch (error) {

        toast.error(
          error.response?.data
            ?.message
        );
      }
    };
    const handleAvatar = (e) => {
  const file = e.target.files[0];

  const reader = new FileReader();

  reader.onload = () => {
    setAvatarPreview(reader.result);
    setAvatar(file);
  };

  reader.readAsDataURL(file);
};

  return (
    <section className="profile page">
      <div className="container">
          {avatarPreview && (
  <img
    src={avatarPreview}
    alt="Profile"
    className="profile-avatar"
  />
)}
     <h1 className="profile-title">
      
  <FaUserCircle />
  My Profile
</h1>

        <form
          onSubmit={
            updateProfile
          }
        >

          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            placeholder="Name"
          />
          
  <input
  type="file"
  accept="image/*"
  onChange={handleAvatar}
/>
          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            placeholder="Email"
          />

          <input
            type="number"
            value={phone}
            onChange={(e) =>
              setPhone(
                e.target.value
              )
            }
            placeholder="Phone"
          />

          <p>
            Role:
            {" "}
            {user?.role}
          </p>

          <button
            type="submit"
          >
            Update Profile
          </button>

        </form>

      </div>
    </section>
  );
};

export default Profile;