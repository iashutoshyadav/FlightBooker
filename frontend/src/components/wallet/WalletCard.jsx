import PropTypes from 'prop-types';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import Card from '../common/Card';

const WalletCard = ({ balance, recentTransactions = [] }) => {
  const totalSpent = recentTransactions
    .filter(t => t.type === 'DEBIT')
    .reduce((sum, t) => sum + Math.abs(parseFloat(t.amount)), 0);

  const totalAdded = recentTransactions
    .filter(t => t.type === 'CREDIT')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  return (
    <Card className="bg-gradient-to-br from-primary-600 to-primary-700 text-white">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-white bg-opacity-20 p-3 rounded-xl">
            <Wallet className="w-8 h-8" />
          </div>
          <div>
            <p className="text-primary-100 text-sm">Wallet Balance</p>
            <h2 className="text-4xl font-bold">{formatCurrency(balance)}</h2>
          </div>
        </div>
      </div>

      {recentTransactions.length > 0 && (
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-primary-500">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <TrendingDown className="w-4 h-4 text-red-300" />
              <span className="text-primary-100 text-sm">Total Spent</span>
            </div>
            <p className="text-xl font-semibold">{formatCurrency(totalSpent)}</p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-green-300" />
              <span className="text-primary-100 text-sm">Total Added</span>
            </div>
            <p className="text-xl font-semibold">{formatCurrency(totalAdded)}</p>
          </div>
        </div>
      )}
    </Card>
  );
};

WalletCard.propTypes = {
  balance: PropTypes.number.isRequired,
  recentTransactions: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    })
  ),
};

export default WalletCard;