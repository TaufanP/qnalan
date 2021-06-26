import moment from "moment";
import { UsersProps } from "../../config/types";
import { batchValue, majorValue } from "../../constants/defaultValue/local";

const ageSelection = (ages: UsersProps[], min: number, max: number) =>
  ages.filter((user) => {
    if (user.dob == undefined) return true;
    const [day, month, year] = user.dob.split("/");
    const userAge = moment().diff([year, month, day], "years");
    return min < userAge && userAge < max;
  });

const batchSelection = (batch: number[], prevData: UsersProps[]) =>
  batch.length == 0
    ? prevData
    : prevData.filter((user) => {
        if (user.batch == undefined) return false;
        const userBatch =
          batchValue[
            batchValue.findIndex((knownBatch) => knownBatch.label == user.batch)
          ];
        return (
          batch.findIndex((knownBatch) => knownBatch == userBatch.value) !== -1
        );
      });

const counterSetter = (
  min: number,
  max: number,
  gender: any[],
  batch: any[],
  major: any[],
  hobby: any[]
) => {
  const ageLength = min == 15 && max == 40 ? 0 : 1;
  const genderLength = gender.length == 0 ? 0 : 1;
  const batchLength = batch.length == 0 ? 0 : 1;
  const majorLength = major.length == 0 ? 0 : 1;
  const hobbyLength = hobby.length == 0 ? 0 : 1;
  const total =
    ageLength + genderLength + batchLength + majorLength + hobbyLength;
  return total;
};

const genderSelection = (gender: number[], prevData: UsersProps[]) =>
  gender.length == 0
    ? prevData
    : prevData.filter((user) => {
        if (user.gender == undefined || user.gender == 0) return false;
        return (
          gender.findIndex((knownGender) => knownGender == user.gender) !== -1
        );
      });

const hobbySelection = (hobby: number[], prevData: UsersProps[]) =>
  hobby.length == 0
    ? prevData
    : prevData.filter((user) => {
        if (user.hobbies == undefined) return false;
        const userHobbies = user.hobbies
          .filter((currentHobby) => currentHobby.isSelected)
          .map((currHobby) => currHobby.id);
        const isExist = userHobbies.filter((userHobby) =>
          hobby.includes(userHobby)
        );
        return isExist.length !== 0;
      });

const majorSelection = (major: number[], prevData: UsersProps[]) =>
  major.length == 0
    ? prevData
    : prevData.filter((user) => {
        if (user.major == undefined) return false;
        const userMajor = majorValue.findIndex(
          (knownMajor) => knownMajor == user.major
        );
        return major.findIndex((knownMajor) => knownMajor == userMajor) !== -1;
      });

export {
  ageSelection,
  batchSelection,
  counterSetter,
  genderSelection,
  hobbySelection,
  majorSelection,
};
