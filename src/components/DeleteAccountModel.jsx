import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../Contexts/AuthContext';

const DeleteAccountModal = () => {

  const { deleteUserAccount, user, logOut } = useContext(AuthContext);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!password) {
      toast.error('Password required');
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Delete Firebase account
      await deleteUserAccount(password);

      // 2️⃣ Delete MongoDB data
      await fetch(`http://localhost:9000/users/${user.email}`, {
        method: 'DELETE'
      });

      toast.success('Account permanently deleted');
      logOut();
      window.location.href = '/';

    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-box">
      <h3 className="font-bold text-xl text-red-600">
        Delete Account
      </h3>

      <p className="text-sm text-gray-500 mt-2">
        This action is irreversible. All data will be permanently removed.
      </p>

      <input
        type="password"
        placeholder="Confirm Password"
        className="input input-bordered w-full mt-4"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <div className="modal-action">
        <button
          className="btn btn-error w-full"
          onClick={handleDelete}
          disabled={loading}
        >
          {loading ? 'Deleting...' : 'Delete My Account'}
        </button>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
