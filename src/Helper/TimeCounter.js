export function CountDatesDistance(date2) {
  var date1 = new Date();

  var Time = date1.getTime() - date2.getTime();
  var Seconds = Math.ceil(Time / (1000));
  var Minutes = Math.floor(Time / (1000 * 60));
  var Hours = Math.floor(Time / (1000 * 3600));
  var Days = Math.floor(Time / (1000 * 3600 * 24));

  return { Time, Seconds, Minutes, Hours, Days };
}