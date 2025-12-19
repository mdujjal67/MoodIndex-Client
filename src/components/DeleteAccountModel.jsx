import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../Contexts/AuthContext';
import { useNavigate } from 'react-router';
import { auth } from '../Firebase/firebase.config';

const DeleteAccountModal = () => {
  const { deleteAccount, user, setUser, setLoading: setGlobalLoading } = useContext(AuthContext);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ⭐️ LOGIC FIX: Check the entire provider list
  const providers =
    auth.currentUser?.providerData?.map(p => p.providerId) || [];

  const isEmailUser = providers.includes('password');
  const isGoogleUser = providers.includes('google.com');


  const handleDelete = async () => {
    // Stop if it's an email user and they haven't typed a password
    if (isEmailUser && !password) {
      toast.error("Please enter your password to confirm.");
      return;
    }

    setLoading(true);
    if (setGlobalLoading) setGlobalLoading(true);

    try {
      await deleteAccount(password);

      const userEmail = user?.email;
      if (userEmail) {
        await fetch(`http://localhost:9000/users/${userEmail}`, { method: 'DELETE' });
      }

      toast.success('Account deleted');
      navigate('/');
    } catch (error) {
      if (setGlobalLoading) setGlobalLoading(false);
      setLoading(false);
      toast.error(error.message || "Failed to delete account");
    }
  };

  return (
    <div className="modal-box">
      <h3 className="font-bold text-lg text-red-600">Delete Account</h3>
      <p className="py-2 text-gray-500">This action cannot be undone.hgglkglf</p>
      <p className="py-2 text-orange-500">Email-Password based user can not delete account within 1 month of registration</p>

      {/* ⭐️ THE FIX: Forced display logic */}
      {/* ⭐️ FIX: If they have a password, show the field. Period. */}
      {isEmailUser && (
        <div className="form-control w-full mt-4">
          <label className="label">
            <span className="label-text">Confirm Password</span>
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="input input-bordered w-full" // Added classes for visibility
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      )}

      {/* Show the Google message ONLY if they don't have a password */}
      {!isEmailUser && isGoogleUser && (
        <div className="bg-blue-50 p-4 rounded-lg mt-4">
          <p className="text-sm text-blue-800 font-medium">
            Logged in via Google. A verification popup will appear.
          </p>
        </div>
      )}


      <div className="modal-action">
        <button
          className="btn btn-error w-full text-white"
          onClick={handleDelete}
          disabled={loading}
        >
          {loading ? "Processing..." : "Delete Permanently"}
        </button>
      </div>
    </div>
  );
};

export default DeleteAccountModal;