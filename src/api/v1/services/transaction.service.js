const Ensure = require('../utils/ensure.uti');
const { ValidationException } = require('../utils');
const TransactionModel = require('../schemas/transaction.model');



async function CreateTransactions(
        userId,
        transactions
    ) {
    
    let refNumbers = [];
    transactions.forEach(transaction => {
        transaction.userId = userId;
        refNumbers.push(transaction.refNumber);
    });

    const foundDupilicateRefNumbers = await FindTransactionsByRefNums(userId, refNumbers);
    if (foundDupilicateRefNumbers.length > 0) {
        throw new ValidationException({
            message: `${foundDupilicateRefNumbers.length} transactions đã tồn tại trong cơ sở dữ liệu. Hãy kiểm tra lại Ref Number`
        });
    }

    await TransactionModel.insertMany(transactions);
}


async function FindTransactionsByRefNums(userId, refNumbers) {
    const foundTransactions = await TransactionModel.find({
        userId: userId,
        refNumber:{
            "$in": refNumbers
        }
    }).select("-_id refNumber");

    return foundTransactions
    
}


async function GetTransactions(userId) {
    return await TransactionModel
    .find({
        userId: userId,
    })
    .sort({   
        date : -1 
    });
}



module.exports = {
    CreateTransactions,
    FindTransactionsByRefNums,
    GetTransactions
};