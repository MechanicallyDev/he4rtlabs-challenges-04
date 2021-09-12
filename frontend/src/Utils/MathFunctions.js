export function Clamp(min, max, value) {
  if (value > max) {
    return max
  } else if (value < min) {
    return min
  } else {
    return value
  }
}

export function Lerp(min, max, percentage) {
  return Math.round(min + (max - min) * (percentage / 100))
}

export function PercentageToHEX(percentage) {
  const percentageClamped = Clamp(0, 100, percentage)
  return Math.round(percentageClamped * (255 / 100)).toString(16)
}
