import React, { useContext, useState, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaCamera, FaUser } from 'react-icons/fa';
import { AuthContext } from '../Contexts/AuthContext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const UpdateProfileForm = ({ user, currentDbName }) => {
    const {
        updateUserName,
        updateUserPhotoURL,
        user: currentUser,
        logOut,
        setUser,
        deleteAccount,
        reAuthenticateUser,
        setLoading: setAuthLoading
    } = useContext(AuthContext);

    const [name, setName] = useState(user?.displayName || currentDbName || '');
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    // Access your ImgBB key from .env
    const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

    const handleFileUpload = async (file) => {
        if (!file || !currentUser) return;

        setUploading(true);

        // Prepare data for ImgBB
        const formData = new FormData();
        formData.append('image', file);

        try {
            // 1. Upload to ImgBB
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();

            if (data.success) {
                const photoURL = data.data.display_url;

                // 2. Update Firebase Authentication
                await updateUserPhotoURL(photoURL);

                // 3. Update local context state immediately
                setUser({ ...currentUser, photoURL });

                // 4. Update MongoDB
                await fetch(`http://localhost:9000/users/${currentUser.email}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ photoURL }),
                });

                toast.success('Profile picture updated!');
            } else {
                throw new Error("ImgBB upload failed");
            }
        } catch (err) {
            console.error(err);
            toast.error('Failed to upload profile picture.');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || name === currentUser.displayName) {
            toast.error("No changes detected.");
            return;
        }

        setLoading(true);
        try {
            await updateUserName(name);
            const response = await fetch(`http://localhost:9000/users/${currentUser.email}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name }),
            });

            if (!response.ok) throw new Error("DB update failed");

            setUser(prev => ({ ...prev, displayName: name }));
            toast.success("Profile updated successfully!");

            setTimeout(() => {
                document.getElementById('update_modal')?.close();
            }, 300);

        } catch (err) {
            toast.error("Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        // 1. Logic Check: Identify user type and account age
        const isGoogleUser = currentUser?.providerData.some(p => p.providerId === 'google.com');
        const creationTime = new Date(currentUser?.metadata?.creationTime).getTime();
        const oneMonthInMs = 30 * 24 * 60 * 60 * 1000; 
        const currentTime = new Date().getTime();
        const accountAge = currentTime - creationTime;

        // 2. Restriction: Prevent deletion if Email user and account is < 1 month old
        if (!isGoogleUser && accountAge < oneMonthInMs) {
            Swal.fire({
                title: "Deletion Restricted",
                text: "For security reasons, email-based accounts can only be deleted after 1 month of usage.",
                icon: "info",
                target: document.getElementById('update_modal') || 'body',
                customClass: { container: 'z-[99999]' },
            });
            return; 
        }

        // 3. Confirmation Modal (with your requested orange warning)
        const { isConfirmed } = await Swal.fire({
            title: "Delete your account?",
            text:"This action can't be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Delete",
            target: document.getElementById('update_modal') || 'body',
            customClass: {
                container: 'z-[99999]'
            },
        });

        if (!isConfirmed) return;

        const performDeletion = async () => {
            setLoading(true);
            try {
                const userEmail = currentUser.email;
                await deleteAccount();
                await fetch(`http://localhost:9000/users/${userEmail}`, { method: 'DELETE' });

                document.getElementById('update_modal')?.close();
                setUser(null);
                if (setAuthLoading) setAuthLoading(false);
                await logOut();
                navigate('/login', { replace: true });
            } catch (err) {
                if (err.code === 'auth/requires-recent-login') {
                    handleRecentLoginError();
                } else {
                    toast.error("Deletion failed.");
                }
            } finally {
                setLoading(false);
            }
        };

        const handleRecentLoginError = async () => {
            const { value: password } = await Swal.fire({
                title: "Confirm Password",
                text: "For security, please enter your password.",
                input: "password",
                inputPlaceholder: "Enter password",
                showCancelButton: true,
                target: document.getElementById('update_modal') || 'body',
                customClass: { container: 'z-[99999]' },
            });

            if (password) {
                try {
                    setLoading(true);
                    await reAuthenticateUser(password);
                    await performDeletion();
                } catch (reAuthErr) {
                    toast.error("Verification failed.");
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        performDeletion();
    };

    return (
        <div>
            <Toaster position="top-center" />
            <div className="modal-box p-6 bg-white rounded-xl shadow-xl relative">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById('update_modal')?.close()}>✕</button>
                <h3 className="text-2xl font-bold text-indigo-700 mb-4 text-center">Update Profile</h3>

                <div className="relative w-28 h-28 rounded-full mx-auto mb-4 cursor-pointer group" onClick={() => !uploading && fileInputRef.current.click()}>
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])} disabled={uploading} />
                    {currentUser?.photoURL ? (
                        <img src={currentUser.photoURL} alt="Profile" className={`rounded-full w-full h-full object-cover ${uploading ? 'opacity-50' : 'opacity-100'}`} />
                    ) : (
                        <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center"><FaUser className="text-5xl text-indigo-300" /></div>
                    )}
                    <div className={`absolute inset-0 rounded-full flex items-center justify-center transition-all duration-300 text-white ${uploading ? 'bg-gray-700 opacity-80' : 'bg-indigo-600 opacity-0 group-hover:opacity-60'}`}>
                        {uploading ? 'Uploading...' : <FaCamera className="text-2xl" />}
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="input input-bordered w-full" disabled={loading} />
                    <button type="submit" className="btn w-full border-none bg-[#00396a] hover:bg-gray-400 text-white rounded-lg" disabled={loading || uploading}>
                        {loading || uploading ? 'Updating...' : 'Save Changes'}
                    </button>
                    <button type="button" onClick={handleDeleteAccount} className="btn w-full border-none bg-red-500 hover:bg-gray-400 text-white rounded-lg mt-2" disabled={loading || uploading}>
                        Delete Account
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfileForm;