const parseTimeDuration = (durationTimeToParse: string): string => {
  //PT4M33S

  const durationTimeToParseLeng: number = durationTimeToParse.length;

  let workingSectionChar: string = "";
  let passedSeconds: string = "";
  let passedMinutes: string = "";
  let passedHours: string = "";
  for (let i = durationTimeToParseLeng - 1; i > 0; i--) {
    const currentChar: string = durationTimeToParse.charAt(i);
    if (currentChar === "T") break;

    if (workingSectionChar === "") {
      workingSectionChar = currentChar;
      continue;
    } else if (workingSectionChar !== currentChar && isNaN(+currentChar)) {
      workingSectionChar = currentChar;
      continue;
    }

    if (workingSectionChar === "S") passedSeconds = currentChar + passedSeconds;
    if (workingSectionChar === "M") passedMinutes = currentChar + passedMinutes;
    if (workingSectionChar === "H") passedHours = currentChar + passedHours;
  }

  passedSeconds.length < 2 && passedSeconds.length >= 1
    ? (passedSeconds = 0 + passedSeconds)
    : (passedSeconds = "00");

  passedMinutes.length < 2 && passedMinutes.length >= 1
    ? (passedMinutes = 0 + passedMinutes)
    : (passedMinutes = "00");

  passedHours.length < 2 && passedHours.length >= 1
    ? (passedHours = 0 + passedHours)
    : (passedHours = "00");

  return passedHours + ":" + passedMinutes + ":" + passedSeconds;
};

export { parseTimeDuration };
