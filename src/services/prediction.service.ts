import * as brain from 'brain.js';

export class PredictionService {
  private network: brain.NeuralNetwork;

  constructor() {
    this.network = new brain.NeuralNetwork({
      hiddenLayers: [10],
    });
  }

  private normalize(data: number[]): number[] {
    const max = Math.max(...data);
    const min = Math.min(...data);
    return data.map(x => (x - min) / (max - min));
  }

  private denormalize(normalized: number, originalData: number[]): number {
    const max = Math.max(...originalData);
    const min = Math.min(...originalData);
    return normalized * (max - min) + min;
  }

  private prepareTrainingData(data: number[]): { input: number[], output: number[] }[] {
    const normalized = this.normalize(data);
    const trainingData = [];
    
    for (let i = 0; i < normalized.length - 5; i++) {
      trainingData.push({
        input: normalized.slice(i, i + 5),
        output: [normalized[i + 5]]
      });
    }
    
    return trainingData;
  }

  public train(data: number[]): void {
    const trainingData = this.prepareTrainingData(data);
    this.network.train(trainingData, {
      iterations: 2000,
      errorThresh: 0.005,
      log: true,
      logPeriod: 100
    });
  }

  public predict(data: number[], predictionCount: number = 12): number[] {
    const predictions: number[] = [];
    let input = this.normalize(data.slice(-5));
    
    for (let i = 0; i < predictionCount; i++) {
      const prediction = this.network.run(input);
      const denormalizedPrediction = this.denormalize(prediction[0], data);
      predictions.push(denormalizedPrediction);
      
      input = [...input.slice(1), prediction[0]];
    }
    
    return predictions;
  }
}