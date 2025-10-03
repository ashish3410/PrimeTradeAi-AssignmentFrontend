import React, { useEffect, useState } from "react";
import axios from "axios";
export default function ProfileModal({ onClose }) {
    const isDevelopment = import.meta.env.MODE === 'development';
    const mybaseUrl = isDevelopment ? import.meta.env.VITE_API_BASE_URL_LOCAL : import.meta.env.VITE_API_BASE_URL_DEPLOY;
    const [user, setUser] = useState({})
    const token = localStorage.getItem('token')
    let getprofileurl=mybaseUrl+'auth/profile'
    console.log(getprofileurl);
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get(getprofileurl, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(res.data);
                console.log(res.data); // ✅ correct
            } catch (err) {
                console.error(err.response?.data || err.message);
            }
        };

        if (token) {
            fetchProfile();
        }
    }, [token]);

    return (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-96 rounded-2xl shadow-lg p-6 relative animate-fadeIn">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-black"
                >
                    ✕
                </button>

                {/* Profile details */}
                <div className="flex flex-col items-center">
                    <img
                        src="https://i.pravatar.cc/150?img=32"
                        alt="profile"
                        className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-md"
                    />
                    <h2 className="text-xl font-semibold mt-3">{`${user?.first_name} ${user?.last_name}`}</h2>
                    <p className="text-gray-500">Full Stack Developer</p>
                </div>

                <div className="mt-5 space-y-2 text-gray-700">
                    <p><strong>Email:</strong> {user?.email}</p>
                    <p><strong>Location:</strong> Kanpur, India</p>
                    <p><strong>Skills:</strong> React, Django, JS, Python</p>
                </div>
            </div>
        </div>
    );
}
