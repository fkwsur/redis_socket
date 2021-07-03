module.exports = (sequelize, DataTypes) => {
	const Roomlist = sequelize.define(
		'roomlist',
		{
			idx : {
				type: DataTypes.INTEGER,
				primaryKey : true,
				autoIncrement : true,
				allowNull : false
			},
			roomname : {
				type : DataTypes.STRING,
				unique : true,
				allowNull : false
			}
		},
		{
			freezeTableName : true,
			timestamps : false,
			comment : '룸리스트 테이블'
		}
	);
	return Roomlist;
}