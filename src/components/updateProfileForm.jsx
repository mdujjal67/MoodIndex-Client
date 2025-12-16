import React, { useContext, useState, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaCamera, FaUser } from 'react-icons/fa';
import { AuthContext } from '../Contexts/AuthContext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const mockUploadImage = async (file, userUid) => {
    await new Promise((res) => setTimeout(res, 1500));
    return `https://picsum.photos/seed/${userUid}${Date.now()}/200/200`;
};

const UpdateProfileForm = ({ user, currentDbName }) => {
    const {
        updateUserName,
        updateUserPhotoURL,
        user: currentUser,
        logOut,
        setUser,
        deleteAccount,
        reAuthenticateUser,
        setLoading: setAuthLoading // Destructure setLoading from context to control skeleton
    } = useContext(AuthContext);

    const [name, setName] = useState(user?.displayName || currentDbName || '');
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const handleFileUpload = async (file) => {
        if (!file || !currentUser) return;
        setUploading(true);
        try {
            const photoURL = await mockUploadImage(file, currentUser.uid);
            await updateUserPhotoURL(photoURL);

            setUser({ ...currentUser, photoURL });

            const response = await fetch(`http://localhost:9000/users/${currentUser.email}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ photoURL }),
            });

            const data = await response.json();
            if (data.modifiedCount > 0) toast.success('Profile picture updated!');
            else toast.success('Profile picture updated!');
        } catch (err) {
            toast.error('Failed to upload profile picture.');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (name && name !== currentUser.displayName) {
                await updateUserName(name);
                setUser({ ...currentUser, displayName: name });

                const response = await fetch(`http://localhost:9000/users/${currentUser.email}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name }),
                });

                const data = await response.json();
                if (data.modifiedCount > 0) toast.success('Your Profile updated successfully!');
                else toast.info('Name is already up to date.');
            }
        } catch (err) {
            toast.error('Failed to update name.');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        const { isConfirmed } = await Swal.fire({
            title: "Do you want to delete your account? It will remove all your data",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Delete",
            target: document.getElementById('update_modal') || 'body',
            customClass: { container: 'z-[99999]' },
        });

        if (!isConfirmed) return;

        // Define the logic to execute upon confirmation
        const performDeletion = async () => {
            setLoading(true);
            try {
                const userEmail = currentUser.email;

                // 1. Delete from Firebase
                await deleteAccount();

                // 2. Delete from MongoDB
                await fetch(`http://localhost:9000/users/${userEmail}`, { method: 'DELETE' });

                // ⭐️ THE FIX: Stop the skeleton loading by clearing context state
                document.getElementById('update_modal')?.close();
                setUser(null);
                if (setAuthLoading) setAuthLoading(false); // Force context loading to false

                await logOut();

                Swal.fire("Deleted!", "Your account is Deleted!.", "success");
                navigate('/login', { replace: true });
            } catch (err) {
                console.error(err);
                if (err.code === 'auth/requires-recent-login') {
                    handleRecentLoginError();
                    Swal.fire({
                        icon: "error",
                        title: "Oops...Try again after re-login",
                        text: "Something went wrong!",
                    });
                } else {
                    toast.error("Deletion failed. Please try again.");
                }
            } finally {
                setLoading(false);
            }
        };

        const handleRecentLoginError = async () => {
            const { value: password } = await Swal.fire({
                title: "Confirm Password",
                text: "For security, please enter your password to continue deletion.",
                input: "password",
                inputPlaceholder: "Enter your password",
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
                    toast.error("Incorrect password. Verification failed.");
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        // Start the process
        performDeletion();
    };

    const openFileSelection = () => {
        if (!uploading && fileInputRef.current) fileInputRef.current.click();
    };

    return (
        <div className="modal-box p-6 bg-white rounded-xl shadow-xl relative">
            <Toaster position="top-right" reverseOrder={false} />

            <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => document.getElementById('update_modal')?.close()}
            >
                ✕
            </button>

            <h3 className="text-2xl font-bold text-indigo-700 mb-4 text-center">
                Update Profile
            </h3>

            <div
                className="relative w-28 h-28 rounded-full mx-auto mb-4 cursor-pointer group"
                onClick={openFileSelection}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])}
                    disabled={uploading}
                />

                {currentUser?.photoURL ? (
                    <img
                        src={currentUser.photoURL}
                        alt="Profile"
                        className={`rounded-full w-full h-full object-cover transition-opacity duration-300 ${uploading ? 'opacity-50' : 'opacity-100'
                            }`}
                    />
                ) : (
                    <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                        <FaUser className="text-5xl text-indigo-300" />
                    </div>
                )}

                <div
                    className={`absolute inset-0 rounded-full flex items-center justify-center transition-all duration-300 text-white ${uploading ? 'bg-gray-700 opacity-80' : 'bg-indigo-600 opacity-0 group-hover:opacity-60'
                        }`}
                >
                    {uploading ? 'Uploading...' : <FaCamera className="text-2xl" />}
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    className="input input-bordered w-full"
                    disabled={loading}
                />
                <button
                    type="submit"
                    className="btn w-full bg-indigo-600 text-white hover:bg-indigo-700"
                    disabled={loading || uploading}
                >
                    {loading || uploading ? 'Updating...' : 'Save Changes'}
                </button>

                <button
                    type="button"
                    onClick={handleDeleteAccount}
                    className="btn w-full bg-red-600 text-white hover:bg-red-700 mt-2"
                    disabled={loading || uploading}
                >
                    {loading ? 'Processing...' : 'Delete Account'}
                </button>
            </form>
        </div>
    );
};

export default UpdateProfileForm;