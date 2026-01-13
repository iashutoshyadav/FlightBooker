import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from '../store/slices/authSlice';
import { User, Mail, Calendar, Wallet as WalletIcon } from 'lucide-react';
import { formatDate } from '../utils/formatters';
import Card from '../components/common/Card';
import WalletCard from '../components/wallet/WalletCard';
import TransactionHistory from '../components/wallet/TransactionHistory';
import Loader from '../components/common/Loader';
import userService from '../services/userService';

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const [transactions, setTransactions] = useState([]);
  const [loadingTransactions, setLoadingTransactions] = useState(false);

  useEffect(() => {
    dispatch(fetchProfile());
    loadTransactions();
  }, [dispatch]);

  const loadTransactions = async () => {
    try {
      setLoadingTransactions(true);
      const response = await userService.getTransactions();
      if (response.success) {
        setTransactions(response.data.transactions);
      }
    } catch (error) {
      console.error('Failed to load transactions:', error);
    } finally {
      setLoadingTransactions(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account and view transaction history</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Info */}
          <div className="lg:col-span-1">
            <Card>
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-primary-100 rounded-full mb-4">
                  <User className="w-12 h-12 text-primary-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm font-medium text-gray-900">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Member Since</p>
                    <p className="text-sm font-medium text-gray-900">
                      {formatDate(user.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <WalletIcon className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Account Status</p>
                    <p className="text-sm font-medium text-green-600">Active</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Wallet & Transactions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Wallet Card */}
            <WalletCard
              balance={user.walletBalance}
              recentTransactions={transactions.slice(0, 10)}
            />

            {/* Transaction History */}
            {loadingTransactions ? (
              <Card>
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-primary-600"></div>
                </div>
              </Card>
            ) : (
              <TransactionHistory transactions={transactions} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;