import Remark from "../models/remark";


export const createRemark = async (payload: any) => {
    try {
        const { userId, filmId, note, rate } = payload;
        const data = await Remark.create({
            userId,
            filmId,
            note,
            rate
        });
        return data;
    } catch (error) {
        throw error
    }
}

export const getRemark = async (userId: string, filmId: string) => {
    try {
        const data = await Remark.findOne({
            userId: userId, filmId: filmId,
        });
        return data
    } catch (error) {
        throw error
    }
}