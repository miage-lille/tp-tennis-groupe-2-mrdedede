import { Player, playerOne, playerTwo } from './player';

export type Point =
  | Love
  | Fifteen
  | Thirty
  | Forty

export type Love = {
  kind: 'LOVE';
};

export type Fifteen = {
  kind: 'FIFTEEN';
};

export type Thirty = {
  kind: 'THIRTY';
};

export type Forty = {
  kind: 'FORTY';
  fortyData: FortyData;
};

export function stringToPoint(kind: string, player?: Player, point?: Point): Point {
  switch(kind) {
    case 'LOVE':
      return love()
    case 'FIFTEEN':
      return fifteen()
    case 'THIRTY':
      return thirty()
    case 'FORTY':
      if(player !== undefined && point !== undefined) {
        return forty(player, point)
      }
      break;
    default:
      return love()
  }
  return love()
}

export const point = (): Point => ( love() )

export const love = (): Love => ({
  kind: 'LOVE',
});

export const fifteen = (): Fifteen => ({
  kind: 'FIFTEEN',
});

export const thirty = (): Thirty => ({
  kind: 'THIRTY',
});

export const forty = (player: Player, point: Point): Forty => ({
  kind: 'FORTY',
  fortyData: fd(player, point)
});

export type PointsData = {
    playerOne: Point;
    playerTwo: Point;
}

export type Points = {
  kind: 'POINTS';
  pointsData: PointsData;
};

export type FortyData = {
  player: Player;
  otherPoint: Point;
};
export const fd = (player: Player, otherPoint: Point): FortyData => ({ player: player, otherPoint: otherPoint });

// Exerice 0: Write all type constructors of Points, Deuce, Forty and Advantage types.
export const points = (
  playerOnePoints: Point,
  playerTwoPoints: Point
): Points => ({
  kind: 'POINTS',
  pointsData: {
    playerOne: playerOnePoints,
    playerTwo: playerTwoPoints,
  },
});

export type Deuce = {
  kind: 'DEUCE';
}

export const deuce = (): Deuce => ({
  kind: 'DEUCE'
})

export type Advantage = {
  kind: 'ADVANTAGE';
  player: Player;
}

export const advantage = (player: Player): Advantage => ({
  kind: 'ADVANTAGE',
  player: player
})

export type Game = {
  kind: 'GAME';
  player: Player; // Player has won
};

export const game = (winner: Player): Game => ({
  kind: 'GAME',
  player: winner,
});

export type Score = Points | Forty | Deuce | Advantage | Game;

// Examples

const s1: PointsData = { playerOne: love(), playerTwo: love() };
const s2: PointsData = { playerOne: fifteen(), playerTwo: love() };
const s3: PointsData = { playerOne: thirty(), playerTwo: love() };
const s4: PointsData = { playerOne: forty(playerOne(), point()), playerTwo: love() };
const anotherScore: Score = forty(playerTwo(), thirty());
const startScore: Score = points(love(), love());