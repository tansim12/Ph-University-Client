export type TQueryParamAcademicSemester = {
  name: string;
  value: boolean | React.Key;
};

const gender = ["male", "female", "other"];
export const genderOptions = gender.map((item) => ({
  value: item,
  label: item.charAt(0).toUpperCase() + item.slice(1),
}));

const BloodGroup = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const bloodOptions = BloodGroup.map((item) => ({
  value: item,
  label: item,
}));
