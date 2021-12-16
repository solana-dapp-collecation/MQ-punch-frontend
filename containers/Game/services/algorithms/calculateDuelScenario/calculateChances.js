import duelEconomics from '../../constants/duelEconomics';
import duelParameters from '../../constants/duelParameters';


export const calculateChancesOfOffensiveMoves = (boxerStats) => {
  let randomMultiplier;
  randomMultiplier = 1.0 + duelParameters.chanceOfMoveRandomBooster * (-1.0 + 2.0 * Math.random());
  const bruteForceAttackCoefficient = (boxerStats.strength * 2.0 + boxerStats.endurance * 1.0) * randomMultiplier;
  randomMultiplier = 1.0 + duelParameters.chanceOfMoveRandomBooster * (-1.0 + 2.0 * Math.random());
  const deceptiveAttackCoefficient = (boxerStats.endurance * 2.0 + boxerStats.agility * 1.0) * randomMultiplier;
  randomMultiplier = 1.0 + duelParameters.chanceOfMoveRandomBooster * (-1.0 + 2.0 * Math.random());
  const counterAttackCoefficient = (boxerStats.agility * 2.0 + boxerStats.strength * 1.0) * randomMultiplier;

  const sumOfCoefficients = bruteForceAttackCoefficient + deceptiveAttackCoefficient + counterAttackCoefficient;

  return {
    chanceOfBruteForceAttack: bruteForceAttackCoefficient / sumOfCoefficients,
    chanceOfDeceptiveAttack: deceptiveAttackCoefficient / sumOfCoefficients,
    chanceOfCounterAttack: counterAttackCoefficient / sumOfCoefficients,
  };
};

export const calculateChancesOfDefensiveMoves = (boxerStats) => {
  let randomMultiplier;
  randomMultiplier = 1.0 + duelParameters.chanceOfMoveRandomBooster * (-1.0 + 2.0 * Math.random());
  const blockCoefficient = (boxerStats.strength * 3.0 + boxerStats.endurance * 2.0 + boxerStats.agility * 1.0) * randomMultiplier;
  randomMultiplier = 1.0 + duelParameters.chanceOfMoveRandomBooster * (-1.0 + 2.0 * Math.random());
  const dodgeCoefficient = (boxerStats.agility * 3.0 + boxerStats.endurance * 2.0 + boxerStats.strength * 1.0) * randomMultiplier;

  const sumOfCoefficients = blockCoefficient + dodgeCoefficient;

  return {
    chanceOfBlock: blockCoefficient / sumOfCoefficients,
    chanceOfDodge: dodgeCoefficient / sumOfCoefficients,
  };
};

export const calculateChancesToWin = (leftBoxerStats, rightBoxerStats) => {
  let randomMultiplier;

  let sumOfLeftBoxerStats = 0.0;
  randomMultiplier = 1.0 + duelEconomics.physiqueRandomBooster * (-1.0 + 2.0 * Math.random());
  sumOfLeftBoxerStats += (leftBoxerStats.strength + leftBoxerStats.agility + leftBoxerStats.endurance) * randomMultiplier;
  sumOfLeftBoxerStats += leftBoxerStats.winrate * duelEconomics.winrateWeight;
  sumOfLeftBoxerStats += leftBoxerStats.rookie * duelEconomics.rookieWeight;
  sumOfLeftBoxerStats += leftBoxerStats.streaming * duelEconomics.streamingWeight;

  let sumOfRightBoxerStats = 0.0;
  randomMultiplier = 1.0 + duelEconomics.physiqueRandomBooster * (-1.0 + 2.0 * Math.random());
  sumOfRightBoxerStats += (rightBoxerStats.strength + rightBoxerStats.agility + rightBoxerStats.endurance) * randomMultiplier;
  sumOfRightBoxerStats += rightBoxerStats.winrate * duelEconomics.winrateWeight;
  sumOfRightBoxerStats += rightBoxerStats.rookie * duelEconomics.rookieWeight;
  sumOfRightBoxerStats += rightBoxerStats.streaming * duelEconomics.streamingWeight;

  const sumOfStats = sumOfLeftBoxerStats + sumOfRightBoxerStats;

  return {
    chanceForLeftBoxerToWin: sumOfLeftBoxerStats / sumOfStats,
    chanceForRightBoxerToWin: sumOfRightBoxerStats / sumOfStats,
  };
};