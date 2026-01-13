import PropTypes from 'prop-types';
import { ArrowDownCircle, ArrowUpCircle, Calendar } from 'lucide-react';
import { formatCurrency, formatDateTime } from '../../utils/formatters';
import Card from '../common/Card';

const TransactionHistory = ({ transactions }) => {
  if (transactions.length === 0) {
    return (
      <Card>
        <div className="text-center py-8">
          <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-600">No transactions yet</p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <h3 className="text-xl font-bold text-gray-900 mb-4">Transaction History</h3>
      <div className="space-y-3">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-lg ${
                  transaction.type === 'CREDIT'
                    ? 'bg-green-100'
                    : 'bg-red-100'
                }`}
              >
                {transaction.type === 'CREDIT' ? (
                  <ArrowUpCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <ArrowDownCircle className="w-5 h-5 text-red-600" />
                )}
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {transaction.description}
                </p>
                <p className="text-sm text-gray-500">
                  {formatDateTime(transaction.createdAt)}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p
                className={`text-lg font-bold ${
                  transaction.type === 'CREDIT'
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {transaction.type === 'CREDIT' ? '+' : '-'}
                {formatCurrency(Math.abs(transaction.amount))}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

TransactionHistory.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TransactionHistory;