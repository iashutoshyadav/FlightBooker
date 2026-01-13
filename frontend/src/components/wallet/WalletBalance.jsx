import PropTypes from "prop-types";
import { Wallet } from "lucide-react";
import { formatCurrency } from "../../utils/formatters";

const WalletBalance = ({ balance, className = "" }) => {
  const numericBalance = Number(balance) || 0;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Wallet className="w-5 h-5 text-green-600" />
      <div>
        <p className="text-xs text-gray-600">Wallet Balance</p>
        <p className="text-lg font-bold text-green-700">
          {formatCurrency(numericBalance)}
        </p>
      </div>
    </div>
  );
};

WalletBalance.propTypes = {
  balance: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  className: PropTypes.string,
};

export default WalletBalance;
