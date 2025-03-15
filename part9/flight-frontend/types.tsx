export interface diary {
    id: number;
    date: string;
    weather: Weather;
    visibility: Visibility;
    comment: string;
}

export enum Weather {
    Sunny = 'sunny',
    Rainy = 'rainy',
    Cloudy = 'cloudy',
    Stormy = 'stormy',
    Windy = 'windy',
    Other = ''
  }
  
  export enum Visibility {
    Great = 'great',
    Good = 'good',
    Ok = 'ok',
    Poor = 'poor',
    Other = ''
  }