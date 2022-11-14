const Ensure = require('../utils/ensure.uti');
const {
    ValidationException
} = require('../utils');
const FilterModel = require('../schemas/filter.model');


async function EnsureFilterIsValidToSave(filter) {
    Ensure.StringIsNotEmpty(filter.title, "title");
    Ensure.StringIsNotEmpty(filter.userId, "userId");
    const sameTitleFilter = await FilterModel.findOne({
        userId: filter.userId,
        title: filter.title
    });

    if (sameTitleFilter &&
        (!filter._id ||
            filter._id && !sameTitleFilter._id.equals(filter._id))) {
        throw new ValidationException({
            message: `${filter.title} đã tồn tại`
        });
    }

}


async function CreateFilter(requestUserId, filter) {
    filter.userId = requestUserId;

    await EnsureFilterIsValidToSave(filter);

    await FilterModel.create(filter);
}



async function UpdateFilter(requestUserId, filter) {
    const foundFilter = await FilterModel.findOne({
        _id: filter._id,
        userId: requestUserId
    });

    if (!foundFilter) {
        throw new ValidationException({
            message: 'Filter not found'
        });
    }

    await EnsureFilterIsValidToSave(filter);

    await FilterModel.findByIdAndUpdate(filter._id, {
        $set: {
            title: filter.title,
            rules: filter.rules
        }
    });
}


async function DeleteFilter(requestUserId, filterId) {
    const foundFilter = await FilterModel.findOne({
        _id: filterId,
        userId: requestUserId
    });

    if (!foundFilter) {
        return;
    }

    await foundFilter.remove();
}


async function GetFilters(requestUserId) {
    return await FilterModel
        .find({
            userId: requestUserId,
        })
        .sort({
            title: -1
        });
}

module.exports = {
    GetFilters,
    CreateFilter,
    UpdateFilter,
    DeleteFilter,
}