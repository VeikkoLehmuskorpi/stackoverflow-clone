export interface UniqueConstraintErr {
  property: String;
  constraints: {
    unique: String;
  };
}

export const parseFieldFromUniqConstrErr = (uniqConstrStr: String): String => {
  return uniqConstrStr.split(/[()]/)[1];
};

export const generateUniqConstrErr = (
  uniqConstrStr: String
): UniqueConstraintErr[] => {
  const field = parseFieldFromUniqConstrErr(uniqConstrStr);
  return [
    { property: field, constraints: { unique: `${field} is already taken` } },
  ];
};
