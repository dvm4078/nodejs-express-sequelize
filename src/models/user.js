const BetTypeStatuses = {
  active: 'active',
  pending: 'pending',
};

module.exports = (sequelize, DataTypes) => {
  const BetType = sequelize.define(
    'BetType',
    {
      betName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      betType: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      status: {
        type: DataTypes.ENUM,
        values: [BetTypeStatuses.active, BetTypeStatuses.pending],
        default: BetTypeStatuses.active,
        allowNull: true,
      },
    },
    { tableName: 'results' }
  );
  // eslint-disable-next-line no-unused-vars
  BetType.associate = function (models) {
    // associations can be defined here
  };

  return BetType;
};
