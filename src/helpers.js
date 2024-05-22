export const convertTimestampToLocalDate = (timestamp) => {
  const milliseconds =
    (timestamp.seconds + timestamp.nanoseconds / 1000000000) * 1000;
  return new Date(milliseconds).toLocaleDateString("uk-UA");
};
